class FilterService {
	// ---------- Utils ----------

	inRange(date, start, end) {
		const d = new Date(date);
		return d >= new Date(start) && d <= new Date(end);
	}

	ceiling(amount) {
		return Math.ceil(amount / 100) * 100;
	}

	// ---------- Core Engine ----------

	filterTransactions(data) {
		const valid = [];
		const invalid = [];

		const seen = new Set();

		for (const tx of data.transactions) {
			// ---------- Negative check ----------
			if (tx.amount < 0) {
				invalid.push({
					date: tx.date,
					amount: tx.amount,
					message: "Negative amounts are not allowed",
				});
				continue;
			}

			// ---------- Duplicate check ----------
			const key = `${tx.date}-${tx.amount}`;

			if (seen.has(key)) {
				invalid.push({
					date: tx.date,
					amount: tx.amount,
					message: "Duplicate transaction",
				});
				continue;
			}

			seen.add(key);

			// ---------- Ceiling ----------
			const ceiling = this.ceiling(tx.amount);

			let remanent = ceiling - tx.amount;

			// ---------- q override ----------
			const qMatches = data.q
				.filter((q) => this.inRange(tx.date, q.start, q.end))
				.sort((a, b) => new Date(b.start) - new Date(a.start));

			if (qMatches.length) remanent = qMatches[0].fixed;

			// ---------- p additions ----------
			const extra = data.p
				.filter((p) => this.inRange(tx.date, p.start, p.end))
				.reduce((s, p) => s + p.extra, 0);

			remanent += extra;

			// ---------- k validation ----------
			const inKPeriod = data.k.some((k) =>
				this.inRange(tx.date, k.start, k.end)
			);

			// ---------- Push valid ----------
			valid.push({
				date: tx.date,
				amount: tx.amount,
				ceiling,
				remanent,
				inKPeriod,
			});
		}

		return {
			valid,
			invalid,
		};
	}
}

module.exports = new FilterService();
