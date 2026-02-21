const { z } = require("zod");

const period = z.object({
	start: z.string(),
	end: z.string(),
});

const transactionItemSchema = z.object({
	date: z.string(),
	amount: z.number(),
});

// Accept full object or object with only transactions (q, p, k optional, default [])
// Also accept raw array of transactions
const filterObjectSchema = z.object({
	q: z.array(
			period.extend({
				fixed: z.number(),
			})
		)
		.optional()
		.default([]),
	p: z.array(
			period.extend({
				extra: z.number(),
			})
		)
		.optional()
		.default([]),
    k: z.array(period).optional().default([]),
    wage: z.number(),
	transactions: z.array(transactionItemSchema),
});

exports.filterSchema = filterObjectSchema;
