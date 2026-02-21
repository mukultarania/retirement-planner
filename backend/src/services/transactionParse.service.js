class TransactionParseService {
	buildTransactions(expenses) {
		return expenses.map((exp) => {
			const ceiling = Math.ceil(exp.amount / 100) * 100;

			const remanent = ceiling - exp.amount;

			return {
				date: exp.date,
				amount: exp.amount,
				ceiling,
				remanent,
			};
		});
	}
}

module.exports = new TransactionParseService();
