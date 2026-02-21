const { getPerformance } = require("../performance.controller");

jest.mock("../../services/performance.service");

const performanceService = require("../../services/performance.service");

describe("performance.controller", () => {
	let req;
	let res;
	let next;

	beforeEach(() => {
		jest.clearAllMocks();
		req = {};
		res = { json: jest.fn() };
		next = jest.fn();
	});

	describe("getPerformance", () => {
		it("returns status success and metrics from service", () => {
			const metrics = {
				time: "00:00:00.012",
				memory: "12.34 MB",
				threads: 1,
			};
			performanceService.getMetrics.mockImplementation((startTime) => {
				expect(typeof startTime).toBe("number");
				return metrics;
			});

			getPerformance(req, res, next);

			expect(performanceService.getMetrics).toHaveBeenCalledTimes(1);
			expect(res.json).toHaveBeenCalledWith({
				status: "success",
				data: metrics,
			});
			expect(next).not.toHaveBeenCalled();
		});

		it("calls next with error when service throws", () => {
			const serviceError = new Error("Metrics failed");
			performanceService.getMetrics.mockImplementation(() => {
				throw serviceError;
			});

			getPerformance(req, res, next);

			expect(next).toHaveBeenCalledWith(serviceError);
			expect(res.json).not.toHaveBeenCalled();
		});
	});
});
