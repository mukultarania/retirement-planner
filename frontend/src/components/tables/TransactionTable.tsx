export default function TransactionTable({ data }: { data?: Array<{ date?: string; amount?: number }> }) {
	const rows = data ?? [];
	return (
		<table className="w-full border mt-4">
			<thead className="bg-gray-200">
				<tr>
					<th>Date</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((t, i) => (
					<tr key={i}>
						<td>{t.date}</td>
						<td>₹{t.amount}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
