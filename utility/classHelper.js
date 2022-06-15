const Risk = require('../model/risk');

// returns a new instance of a Risk Class
export const newInstanceOfRisk = (risk) => {
    return (
        new Risk(
            risk._id || null,
            risk.localId || null,
            risk.title || null,
            risk.description || null,
            risk.assets || [],
            risk.keyWords  || [],
            risk.locations  || [],
            risk.vulnerability  || [],
            risk.appetiteScore || null,
            risk.likelihoodScore || null,
            risk.impactScores || [],
            risk.treatment || [],
            risk.occurrencePlan || [],
            risk.configVersion,
            risk.inuse || null,
            risk.updated || null,
            risk.created || null
        )
    );
};