class Risk {

    constructor (id, localId, title, description, assets, keyWords, locations, vulnerability,
        appetiteScore, likelihoodScore, impactScores, treatment, occurrencePlan,
        configVersion, inuse, updated, created) {

        this.id = id;
        this.localId = localId;
        this.title = title;
        this.description = description;
        this.assets = assets;
        this.keyWords = keyWords;
        this.locations = locations;
        this.vulnerability = vulnerability;
        this.appetiteScore = appetiteScore;
        this.likelihoodScore = likelihoodScore;
        this.impactScores = impactScores;
        this.treatment = treatment;
        this.occurrencePlan = occurrencePlan;
        this.configVersion = configVersion;
        this.inuse = inuse;
        this.updated = updated;
        this.created = created;
    }
}

module.exports = Risk;