class TransactionValidatorService {
	validate(data) {
		const seenDates = new Set();

		const valid = [];
		const invalid = [];

		for (const tx of data.transactions) {
			// Negative check
			if (tx.amount < 0) {
				invalid.push({
					...tx,
					message: "Negative amounts are not allowed",
				});
				continue;
			}

			// Duplicate date check
			if (seenDates.has(tx.date)) {
				invalid.push({
					...tx,
					message: "Duplicate transaction",
				});
				continue;
			}

			seenDates.add(tx.date);

			valid.push(tx);
		}

		return { valid, invalid };
	}
}

module.exports = new TransactionValidatorService();
