const service = require("../services/transactionParse.service");

const schema = require("../validators/transactionParse.validator");

exports.parseTransactions = async (req, res, next) => {
	try {
		const parsed = schema.parse(req.body);

		const result = service.buildTransactions(parsed);

		res.json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};
