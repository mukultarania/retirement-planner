const service = require("../services/returns.service");

const { returnsSchema } = require("../validators/returns.validator");

exports.npsReturns = (req, res, next) => {
    try {
		const parsed = returnsSchema.parse(req.body);

		const result = service.calculate(parsed, 0.0711, true);

		res.json(result);
	} catch (err) {
		next(err);
	}
};

exports.indexReturns = (req, res, next) => {
    try {
		const parsed = returnsSchema.parse(req.body);

		const result = service.calculate(parsed, 0.1449, false);

		res.json(result);
	} catch (err) {
		next(err);
	}
};
