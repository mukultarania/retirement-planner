const express = require("express");
const router = express.Router();

// -------------------------------
// TRANSACTIONS APIs
// -------------------------------

// Parse
router.post(
	/^\/transactions:parse$/,
	require("../controllers/transactionParse.controller").parseTransactions
);

// Validate
router.post(
	/^\/transactions:validate$/,
	require("../controllers/transactionValidator.controller")
		.validateTransactions
);

// Filter (Temporal Constraints)
router.post(
	/^\/transactions:filter$/,
	require("../controllers/filter.controller").filter
);

// -------------------------------
// RETURNS APIs
// -------------------------------

// NPS Returns
router.post(
	/^\/returns:nps$/,
	require("../controllers/returns.controller").npsReturns
);

// Index Returns
router.post(
	/^\/returns:index$/,
	require("../controllers/returns.controller").indexReturns
);

// -------------------------------
// PERFORMANCE API
// -------------------------------

router.get(
	"/performance", // no colon → normal route
	require("../controllers/performance.controller").getPerformance
);

module.exports = router;
