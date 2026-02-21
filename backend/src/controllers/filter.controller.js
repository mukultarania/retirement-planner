const serclvice = require("../services/filter.service");

const { filterSchema } = require("../validators/filter.validator");

exports.filter = (req, res, next) => {
	try {
		const parsed = filterSchema.parse(req.body);

		const result = service.filterTransactions(parsed);

		res.json(result);
	} catch (err) {
		next(err);
	}
};
