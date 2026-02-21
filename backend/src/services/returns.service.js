class ReturnsService {
	// ---------- Utils ----------

	inRange(date, start, end) {
		const d = new Date(date);
		return d >= new Date(start) && d <= new Date(end);
	}

	ceiling(amount) {
		return Math.ceil(amount / 100) * 100;
	}

	yearsToRetirement(age) {
		return age < 60 ? 60 - age : 5;
	}

	compound(P, r, t) {
		return P * Math.pow(1 + r, t);
	}

	inflationAdjust(A, i, t) {
		return A / Math.pow(1 + i, t);
	}

	// ---------- Tax Slab ----------

	tax(income) {
		if (income <= 700000) return 0;

		if (income <= 1000000) return (income - 700000) * 0.1;

		if (income <= 1200000) return 300000 * 0.1 + (income - 1000000) * 0.15;

		if (income <= 1500000)
			return 300000 * 0.1 + 200000 * 0.15 + (income - 1200000) * 0.2;

		return (
			300000 * 0.1 +
			200000 * 0.15 +
			300000 * 0.2 +
			(income - 1500000) * 0.3
		);
	}

	// ---------- Core Engine ----------

	processTransactions(data) {
		return data.transactions.map((tx) => {
			const ceiling = this.ceiling(tx.amount);

			let rem = ceiling - tx.amount;

			// q override
			const qMatches = data.q
				.filter((q) => this.inRange(tx.date, q.start, q.end))
				.sort((a, b) => new Date(b.start) - new Date(a.start));

			if (qMatches.length) rem = qMatches[0].fixed;

			// p addition
			const extra = data.p
				.filter((p) => this.inRange(tx.date, p.start, p.end))
				.reduce((s, p) => s + p.extra, 0);

			rem += extra;

			return {
				...tx,
				ceiling,
				remanent: rem,
			};
		});
	}

	// ---------- k Aggregation ----------

	groupByK(data, transactions) {
		return data.k.map((period) => {
			const amount = transactions
				.filter((tx) => this.inRange(tx.date, period.start, period.end))
				.reduce((s, tx) => s + tx.remanent, 0);

			return {
				start: period.start,
				end: period.end,
				amount,
			};
		});
	}

	// ---------- Returns Engine ----------

	calculate(data, rate, isNPS) {
		const processed = this.processTransactions(data);

		const grouped = this.groupByK(data, processed);

		const years = this.yearsToRetirement(data.age);

		const totalAmount = processed.reduce((s, t) => s + t.amount, 0);

		const totalCeiling = processed.reduce((s, t) => s + t.ceiling, 0);

		const annualIncome = data.wage * 12;

		const savingsByDates = grouped.map((g) => {
			const future = this.compound(g.amount, rate, years);

			const real = this.inflationAdjust(
				future,
				data.inflation / 100,
				years
			);

			let taxBenefit = 0;

			if (isNPS) {
				const deduction = Math.min(
					g.amount,
					annualIncome * 0.1,
					200000
				);

				taxBenefit =
					this.tax(annualIncome) - this.tax(annualIncome - deduction);
			}

			return {
				start: g.start,
				end: g.end,
				amount: g.amount,
				profits: Number((real - g.amount).toFixed(2)),
				taxBenefit,
			};
		});

		return {
			transactionsTotalAmount: totalAmount,

			transactionsTotalCeiling: totalCeiling,

			savingsByDates,
		};
	}
}

module.exports = new ReturnsService();