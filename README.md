# Auth
Node Express MongoDB api for managing risk, opportunities and incidents.

## Installation

Use the package manager [npm](https://github.com/mattcole75/risk) to install Locations once you have cloned the repository.

```bash
npm install
```
## description
This API is part of a suit of microservices with a purpose to handle risk, opportunity and incidents. The system requires access to the Auth microservice to approve transactions based on authentication and authorised roles and location microservice to provide location functionality.

## Configuration
 - Create a .env file in the root directory
    - Add the following configuration:
        - DB_URI={your mongodb uri} e.g. mongodb://localhost:27017/
        - PORT={the port number you will serve the express app on} e.g. 1337
        - LOG_PATH={the path to your log file} e.g. ./logs/auth.log
- Create your logs Directory as above
- Take a look at the config file in the configuration directory as this information is used in the URL's.
- The location text search functionality will only work once the text inecies are in place on the name and description fields on MongoDB Schema.

## Data requirements
```
    body: {
            _id: 'MongoDB ObjectId (exclude for posting)',
            localId: 'MongoDB ObjectId (the user id)',
            title: 'Risk of Electricution',
            descriptions:'One or more people could come into contact with Overhead Line Equipment and get electricuted and die.',
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
                { 0: 'MongoDB ObjectId (location id)' }
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
        }
    }
```
## Usage

### POST Create risk:
This API will accept a full object (as above) or sections of the above.
```
POST http://localhost:1337/risk/api/0.1/risk

Requires JSON Header:
    {
        idToken: 'the given IdToken',
        localId: 'the given localid'
    }

Requires JSON Body:
    {
        see data requirements above
    }

Returns:
    - 201 Created, returns the uid and transaction status
    - 400 Bad request
    - 500 Internal error message
```

### GET risk:
This API will return the matching risk provided it is in use.
```
GET http://localhost:1337/risk/api/0.1/risk

Requires JSON Header:
    {
        idToken: 'the given IdToken',
        localId: 'the given localid',
        id: 'the id of the risk'
    }

Returns:
    - 200 ok, returns the stored location matching the id
    - 404 not found
    - 500 Internal error message
```

### GET risks:
This API will return all the risks.
```
GET http://localhost:1337/risk/api/0.1/risk

Requires JSON Header:
    {
        idToken: 'the given IdToken',
        localId: 'the given localid',
    }

Returns:
    - 200 ok, returns the stored location matching the id
    - 400 [error details]
    - 500 Internal error message
```

### PATCH risk:
This API will patch a given risk attribut(s) given the risk id.
```
GET http://localhost:1337/auth/api/0.1/locations

Requires JSON Header:
    {
        idToken: 'the given IdToken',
        localId: 'the given localid',
        id: 'the id of the location'
    }

Requires JSON Body:
    {
        [attribute]: 'the value to update it to'
    }

Returns:
    - 200 ok, update successful
    - 400 invalid request
    - 500 Internal error message
```

## License
[GNU GENERAL PUBLIC LICENSE V3](https://www.gnu.org/licenses/gpl-3.0.en.html)