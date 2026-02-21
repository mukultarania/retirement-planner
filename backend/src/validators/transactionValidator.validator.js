const { z } = require("zod");

const transactionItemSchema = z.object({
	date: z.string(),
	amount: z.number(),
	ceiling: z.number(),
	remanent: z.number(),
});

// Accept object with transactions (wage optional) or raw array of transactions
const validatorSchema = z.union([
	z.object({
		wage: z.number().optional(),
		transactions: z.array(transactionItemSchema),
	}),
	z.array(transactionItemSchema),
]);

module.exports = validatorSchema;
