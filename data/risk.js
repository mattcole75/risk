const risk = [
    {
        localId: 'MongoDB ObjectId (the user id)',
        title: 'Risk of Electricution',
        description: 'One or more people could come into contact with Overhead Line Equipment and get electricuted and die.',
        asset: [
            { 0: 'Overhead Line Equipment' },
            { 1: 'Substation' }
        ],
        keyWords: [
            { 0: 'people' },
            { 1: 'electricuted' },
            { 2: 'Overhead Line Equipment' },
            { 3: 'die' }
        ],
        location: [
            { 0: 'Network wide' }
        ],
        vulnerability: [
            { 0: 'switching programme' },
            { 1: 'Physical Isolation (earthing' },
            { 2: 'Signed paperwork' },
            { 3: 'Competency' },
            { 4: 'Mechanical failure' }
        ],
        riskAppititeScore: 36,
        likelihoodScore: 2,
        impact: [
            { safety: 6 },
            { financial: 5 },
            { publicity: 4 },
            { reputation: 4 },
            { project: 6 }
        ],
        treatment: [
            { 0: {
                    type: 'Directive',
                    description: 'The person in charge of possession shall use The Ole Safe Working Procedure (doc number)'
                }
            }, {
                1: {
                    type: 'Preventative',
                    description: 'The person in charge of possession shall electrically isolate the work site'
                },
            }, {
                2: {
                    type: 'Preventative',
                    description: 'The person in charge of site safety shall setup a safe area for work and brief the team'
                },
            }, {
                3: {
                    type: 'Preventative',
                    description: 'The person in charge of site safety shall setup safe walking routes and brief the team'
                },
            }, {
                4: {
                    type: 'Preventative',
                    description: 'The person in charge of site safety shall ensure tool and equipment are insulated and not long enough to reach the OLE'
                }
            }
        ],
        occurrencePlan: [
            { 0: 'Notify emergency services' },
            { 1: 'Notify the Person in charge of possession' },
            { 2: 'Notify the Production Network Manager' },
            { 3: 'Use hardwire mass trip to issolate the area' },
            { 4: 'Carry out first aid on injured individuals' },
            { 5: 'NMC to dispatch incident officer' },
            { 6: 'Incident officer to contact Office of Road & Rail and report the incident' },
            { 7: 'Incident officer to protect the site and preserve it\'s state for evidence gathering' },
            { 8: 'Incident officer to provide wellfare to the site team' },
            { 9: 'Engineer on call to assess any damage' },
            { 10: 'Engineer on call to plan any required corrective maintenance and restore service once site has been handed back'}

        ]
    },
    {
        localId: 'MongoDB ObjectId (the user id)',
        title: 'Risk of Server Failure',
        description: 'One or more of the operational servers could fail due to being life expired'
    }
]

module.exports = risk;