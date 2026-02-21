const { z } = require("zod");

const period = z.object({
	start: z.string(),
	end: z.string(),
});

const transaction = z.object({
	date: z.string(),
	amount: z.number(),
});

exports.returnsSchema = z.object({
	age: z.number(),
	wage: z.number(),
	inflation: z.number(),

	q: z.array(
		period.extend({
			fixed: z.number(),
		})
	),

	p: z.array(
		period.extend({
			extra: z.number(),
		})
	),

	k: z.array(period),

	transactions: z.array(transaction),
});
