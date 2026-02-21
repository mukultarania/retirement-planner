const { z } = require("zod");

const transactionSchema = z.array(
	z.object({
		date: z.string(), // YYYY-MM-DD HH:mm:ss
		amount: z.number().nonnegative(),
	})
);

module.exports = transactionSchema;
