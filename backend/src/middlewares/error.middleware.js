exports.errorHandler = (err, req, res, next) => {
	const isZod = err.name === "ZodError";
	const status = isZod ? 400 : err.statusCode || 500;
	const message = isZod
		? err.errors?.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ") || err.message
		: err.message || "Internal Server Error";
	res.status(status).json({
		status: "error",
		message,
		...(isZod && err.errors && { errors: err.errors }),
	});
};
