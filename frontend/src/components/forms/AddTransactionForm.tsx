import { useState } from "react";

/** Convert datetime-local value "YYYY-MM-DDTHH:mm" to backend format "YYYY-MM-DD HH:mm:ss" */
function toBackendDate(value: string): string {
	if (!value) return "";
	const [datePart, timePart] = value.split("T");
	return `${datePart} ${timePart || "00:00"}:00`;
}

export default function AddTransactionForm({ onAdd }: { onAdd: (tx: { date: string; amount: number }) => void }) {
	const [date, setDate] = useState("");
	const [amount, setAmount] = useState<string>("");

	const handleAdd = () => {
		const num = Number(amount) || 0;
		const dateStr = toBackendDate(date);
		if (dateStr) onAdd({ date: dateStr, amount: num });
		setDate("");
		setAmount("");
	};

	return (
		<div className="bg-white p-4 rounded shadow">
			<input
				type="datetime-local"
				value={date}
				onChange={(e) => setDate(e.target.value)}
				className="border p-2 mr-2"
			/>
			<input
				type="number"
				placeholder="Amount"
				min={0}
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				className="border p-2 mr-2"
			/>
			<button
				onClick={handleAdd}
				className="bg-blue-600 text-white px-4 py-2 rounded"
			>
				Add
			</button>
		</div>
	);
}
