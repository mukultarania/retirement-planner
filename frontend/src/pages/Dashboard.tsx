// pages/Dashboard.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import AddTransactionForm from "../components/forms/AddTransactionForm";
import TransactionTable from "../components/tables/TransactionTable";

import {
	parseTransactions,
	validateTransactions,
	filterTransactions,
} from "../api/transactions.api";

import { getIndexReturns, getNpsReturns } from "../api/returns.api";

import AISuggestion from "../components/ai/AISuggestion";

export default function Dashboard() {
	const { user, logout } = useAuth();
	const nav = useNavigate();
	const [transactions, setTransactions] = useState<any[]>([]);
	const [returns, setReturns] = useState<any>(null);
	const [wage, setWage] = useState<string>("50000");
	const [age, setAge] = useState<number>(27);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const wageNum = Number(wage) || 0;
	const ageInt = Math.round(Number(age)) || 0;

	const addTx = (tx: any) => setTransactions((p) => [...p, tx]);

	const calculate = async () => {
		setLoading(true);
		setError(null);
		try {
			// 1️⃣ Parse
			const parsed = await parseTransactions(transactions);
			// 2️⃣ Validate
			const validated = await validateTransactions({
				wage: wageNum,
				transactions: parsed.data?.data,
			});

			// 3️⃣ Temporal Filter
			const filtered = await filterTransactions({
				wage: wageNum,
				transactions: validated.data?.valid,
				q: [],
				p: [],
				k: [
					{
						start: "2023-01-01 00:00:00",
						end: "2023-12-31 23:59:59",
					},
				],
			});

			const payload = {
				age: ageInt,
				wage: wageNum,
				inflation: 5.5,
				transactions: filtered.data?.valid ?? [],
				q: [],
				p: [],
				k: [
					{
						start: "2023-01-01 00:00:00",
						end: "2023-12-31 23:59:59",
					},
				],
			};

			// 4️⃣ Returns APIs
			const index = await getIndexReturns(payload);
			const nps = await getNpsReturns(payload);

			const indexSavings = index.data?.savingsByDates ?? [];
			const npsSavings = nps.data?.savingsByDates ?? [];
			const firstIndex = indexSavings[0];
			const firstNps = npsSavings[0];

			setReturns({
				indexProfit: firstIndex?.profits ?? 0,
				npsProfit: firstNps?.profits ?? 0,
				taxBenefit: firstNps?.taxBenefit ?? 0,
				raw: { index: index.data, nps: nps.data },
			});
		} catch (e: unknown) {
			const message =
				e instanceof Error ? e.message : "Calculation failed";
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						Retirement Planner
					</h1>
					{user && (
						<p className="text-sm text-gray-600 mt-1">
							Logged in as <span className="font-medium">{user}</span>
						</p>
					)}
				</div>
				{user && (
					<button
						type="button"
						onClick={() => {
							logout();
							nav("/");
						}}
						className="text-sm text-gray-600 hover:text-gray-900 underline"
					>
						Logout
					</button>
				)}
			</div>
			<div className="flex items-center gap-4">
				<label
					htmlFor="age"
					className="text-sm font-medium text-gray-700"
				>
					Age
				</label>
				<input
					id="age"
					type="number"
					min={1}
					max={120}
					step={1}
					value={age === 0 ? "" : age}
					onChange={(e) => {
						const v = parseInt(e.target.value, 10);
						setAge(Number.isNaN(v) ? 0 : Math.max(0, Math.min(120, v)));
					}}
					className="border border-gray-300 rounded px-3 py-2 w-40"
					placeholder="27"
				/>
			</div>
			<div className="flex items-center gap-4">
				<label
					htmlFor="wage"
					className="text-sm font-medium text-gray-700"
				>
					Monthly wage (₹)
				</label>
				<input
					id="wage"
					type="number"
					min={0}
					step={1000}
					value={wage}
					onChange={(e) => setWage(e.target.value)}
					className="border border-gray-300 rounded px-3 py-2 w-40"
					placeholder="50000"
				/>
			</div>

			<AddTransactionForm onAdd={addTx} />

			<TransactionTable data={transactions} />

			<button
				onClick={calculate}
				disabled={loading}
				className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
			>
				{loading ? "Calculating…" : "Calculate Retirement Profit"}
			</button>

			{error && (
				<p className="text-red-600" role="alert">
					{error}
				</p>
			)}

			{returns && (
				<>
					<div className="grid grid-cols-3 gap-6">
						<Card
							title="Index Profit"
							value={returns.indexProfit}
						/>
						<Card title="NPS Profit" value={returns.npsProfit} />
						<Card title="Tax Benefit" value={returns.taxBenefit} />
					</div>

					<AISuggestion data={returns.raw} />
				</>
			)}
		</div>
	);
}

function Card({ title, value }: any) {
	return (
		<div className="bg-white p-4 rounded shadow">
			<h3 className="text-sm text-gray-500">{title}</h3>
			<p className="text-2xl font-bold">₹{value}</p>
		</div>
	);
}
