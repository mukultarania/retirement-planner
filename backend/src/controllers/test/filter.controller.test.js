const { filter } = require("../filter.controller");

jest.mock("../../services/filter.service");
jest.mock("../../validators/filter.validator");

const filterService = require("../../services/filter.service");
const { filterSchema } = require("../../validators/filter.validator");

describe("filter.controller", () => {
	let req;
	let res;
	let next;

	beforeEach(() => {
		jest.clearAllMocks();
		req = { body: {} };
		res = { json: jest.fn() };
		next = jest.fn();
	});

	describe("filter", () => {
		it("parses body, calls service, and returns result", () => {
			const body = {
				wage: 50000,
				transactions: [
					{ date: "2023-06-15 00:00:00", amount: 150 },
				],
				q: [],
				p: [],
				k: [{ start: "2023-01-01 00:00:00", end: "2023-12-31 23:59:59" }],
			};
			req.body = body;

			const parsed = { ...body };
			filterSchema.parse.mockReturnValue(parsed);

			const result = { valid: [{ date: "2023-06-15 00:00:00", amount: 150, ceiling: 200, remanent: 50, inKPeriod: true }], invalid: [] };
			filterService.filterTransactions.mockReturnValue(result);

			filter(req, res, next);

			expect(filterSchema.parse).toHaveBeenCalledWith(body);
			expect(filterService.filterTransactions).toHaveBeenCalledWith(parsed);
			expect(res.json).toHaveBeenCalledWith(result);
			expect(next).not.toHaveBeenCalled();
		});

		it("calls next with error when validation fails", () => {
			const validationError = new Error("Invalid input");
			validationError.name = "ZodError";
			filterSchema.parse.mockImplementation(() => {
				throw validationError;
			});

			filter(req, res, next);

			expect(filterService.filterTransactions).not.toHaveBeenCalled();
			expect(res.json).not.toHaveBeenCalled();
			expect(next).toHaveBeenCalledWith(validationError);
		});

		it("calls next with error when service throws", () => {
			req.body = {
				wage: 50000,
				transactions: [{ date: "2023-06-15 00:00:00", amount: 100 }],
				q: [],
				p: [],
				k: [],
			};
			filterSchema.parse.mockReturnValue(req.body);
			const serviceError = new Error("Service error");
			filterService.filterTransactions.mockImplementation(() => {
				throw serviceError;
			});

			filter(req, res, next);

			expect(next).toHaveBeenCalledWith(serviceError);
			expect(res.json).not.toHaveBeenCalled();
		});
	});
});
