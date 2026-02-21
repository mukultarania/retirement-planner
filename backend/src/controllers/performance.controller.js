const service = require("../services/performance.service");

exports.getPerformance = (req, res, next) => {
	try {
		// Start timer
		const startTime = Date.now();

		const metrics = service.getMetrics(startTime);

		res.json({
			status: "success",
			data: metrics,
		});
	} catch (err) {
		next(err);
	}
};
