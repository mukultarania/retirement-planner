const service = require("../services/transactionValidator.service");

const validatorSchema = require("../validators/transactionValidator.validator");

exports.validateTransactions = async (req, res, next) => {
	try {
		const parsed = validatorSchema.parse(req.body);
		const payload = Array.isArray(parsed)
			? { transactions: parsed }
			: { ...parsed, transactions: parsed.transactions };
		const result = service.validate(payload);

		res.json({
			status: "success",
			...result,
		});
	} catch (err) {
		next(err);
	}
};
