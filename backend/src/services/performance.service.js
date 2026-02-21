class PerformanceService {
	// Format milliseconds → HH:mm:ss.SSS
	formatTime(ms) {
		const date = new Date(ms).toISOString();

		return date.substr(11, 12);
	}

	getMetrics(startTime) {
		// Response time
		const duration = Date.now() - startTime;

		const formattedTime = this.formatTime(duration);

		// Memory usage
		const mem = process.memoryUsage();

		const memoryMB = (mem.heapUsed / 1024 / 1024).toFixed(2) + " MB";

		// Threads
		// Node is single-threaded event loop
		const threads = 1;

		return {
			time: formattedTime,
			memory: memoryMB,
			threads,
		};
	}
}

module.exports = new PerformanceService();
