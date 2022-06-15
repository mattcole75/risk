const endPoint = require('./endPoint');
const auth = require('./authEndPoint');
const risks = require('../data/risk');
const crypto = require('crypto');
const config = require('../configuration/config');
const application = config.get('application');
const version = config.get('version');

let response;

const wrongToken = '7c58e9e7cd20ae44f354d59f7a73ebb7e346d5e5a61517e33e0e97c4c79d25a826debfc57ca2e99c66108f80801059a9d2d94d14886fc98539e4ab324a5da2e125aa7e7d26af000e103fcbc75b0ed9caa75895ba26efa248fc0c2154a581786679c6a2a9120fadc9e68fef80bc30d6a8644cd19362e035a85e130d675e2e30a9';

let localId;
let idToken;

describe('Test the auth call to ensure only valid tokens can POST risk', () => {

    risks.forEach(risk => {
        it('should, fail to create a risk given no token', async () => {
            await endPoint.post(application + '/api/' + version + '/risk')
                .set({
                    
                })
                .send({
                    
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
        });
    });

    risks.forEach(risk => {
        it('should, fail to create a risk given empty token', async () => {
            await endPoint.post(application + '/api/' + version + '/risk')
                .set({
                    idToken: '',
                    localId: ''
                })
                .send({
                    
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
        });
    });

    risks.forEach(risk => {
        it('should, fail to create a risk given un-authorised token', async () => {
            await endPoint.post(application + '/api/' + version + '/risk')
                .set({
                    idToken: wrongToken,
                    localId: '6299c5f832fdb8b7ea025c66'
                })
                .send({
                    
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(404)
        });
    });
});

describe('Test the risk api POST methods', () => {

    it('should, login and return the user details and token', async () => {
        await auth.post('/user/login')
            .send({
                email: 'fitz.farseer@system.com',
                password: crypto.createHash('sha256').update('letmein').digest('hex')
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.status).toBe(200);
                expect(res.body.user.displayName).toBe('Fitz Farseer');
                expect(res.body.user.email).toBe('fitz.farseer@system.com');
                expect(res.body.user.idToken).toHaveLength(256);
                idToken = res.body.user.idToken;
                localId = res.body.user.localId;
            })
    });

    risks.forEach(risk => {

        it('should, create a risk given the right information', async () => {
            await endPoint.post(application + '/api/' + version + '/risk')
                .set({
                    idToken: idToken,
                    localId: localId
                })
                .send({
                    localId: localId,
                    title: risk.title,
                    description: risk.description,
                    asset: risk.asset,
                    keyWords: risk.keyWords,
                    location: risk.location,
                    vulnerability: risk.vulnerability,
                    riskAppititeScore: risk.riskAppititeScore,
                    likelihoodScore: risk.likelihoodScore,
                    impact: risk.impact,
                    treatment: risk.treatment,
                    occurrencePlan: risk.occurrencePlan
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(res => {
                    response = res.body.data;
                })
        });
    });

});

describe('Test the risk API GET methods', () => {

    it('should successfully return a risk given the correct id', async () => {
        await endPoint.get(application + '/api/' + version + '/risk')
            .set({
                idToken: idToken,
                localId: localId,
                id: response.insertedId,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.status).toBe(200);
                // console.log(res.body);
            })
    });

    it('should successfully return all risks when given no parameters', async () => {
        await endPoint.get(application + '/api/' + version + '/risks')
            .set({
                idToken: idToken,
                localId: localId
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.status).toBe(200);
                expect(res.body.data).toHaveLength(2);
            })
    });

    it('should successfully return all risks using a text filter', async () => {
        await endPoint.get(application + '/api/' + version + '/risks')
            .set({
                idToken: idToken,
                localId: localId
            })
            .send({
                filter: 'server'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toBeDefined();
                expect(res.body.status).toBe(200);
                expect(res.body.data).toHaveLength(1);
            })
    });

    it('should, logout current user', async() => {
        await auth.post('/user/logout')
            .set({
                idToken: idToken,
                localId: localId
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    })
});

// describe('Test the auth call to ensure only valid tokens can PATCH locations', () => {

//     let id;

//     it('should successfully return all locations using a text filter', async () => {
//         await endPoint.get('/locations')
//             .set({
//                 idToken: idToken
//             })
//             .send({
//                 name: 'John Rylands Research Institute'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(res => {
//                 expect(res.body).toBeDefined();
//                 expect(res.body.status).toBe(200);
//                 expect(res.body.data).toHaveLength(1);
//                 id = res.body.data[0]._id;
//             })
//     });

//     it('should, fail to patch a location given the right information and no token', async () => {
//         await endPoint.patch('/location')
//             .set({
//                 id: id
//             })
//             .send({
//                 description: 'Creative Space for Software Engineering'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(400)
//     });

//     it('should, fail to patch a location given the right information and empty token', async () => {
//         await endPoint.patch('/location')
//             .set({
//                 id: id,
//                 idToken: ''
//             })
//             .send({
//                 description: 'Creative Space for Software Engineering'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(400)
//     });

//     it('should, fail to patch a location given the right information and un-authorised token', async () => {
//         await endPoint.patch('/location')
//             .set({
//                 id: id,
//                 idToken: wrongToken
//             })
//             .send({
//                 description: 'Creative Space for Software Engineering'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(404)
//     });

// });

// describe('Test the location microservice PATCH methods', () => {
    
//     let id;

//     it('should successfully return all locations using a text filter', async () => {
//         await endPoint.get('/locations')
//             .set({
//                 idToken: idToken
//             })
//             .send({
//                 name: 'John Rylands Research Institute'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(res => {
//                 expect(res.body).toBeDefined();
//                 expect(res.body.status).toBe(200);
//                 expect(res.body.data).toHaveLength(1);
//                 id = res.body.data[0]._id;
//             })
//     });

//     it('should, patch a location given the right information', async () => {
//         await endPoint.patch('/location')
//             .set({
//                 id: id,
//                 idToken: idToken
//             })
//             .send({
//                 description: 'Creative Space for Software Engineering'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(res => {
//                 expect(res.body).toBeDefined();
//                 expect(res.body.status).toBe(200);
//                 expect(res.body.data.acknowledged === true);
//                 expect(res.body.data.modifiedCount === 1);
//                 expect(res.body.data.upsertedCount === 0);
//                 expect(res.body.data.matchedCount === 1);
//             })
//     });

//     it('should successfully return all locations using a text filter', async () => {
//         await endPoint.get('/locations')
//             .set({
//                 idToken: idToken
//             })
//             .send({
//                 name: 'John Rylands Research Institute'
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .then(res => {
//                 expect(res.body).toBeDefined();
//                 expect(res.body.status).toBe(200);
//                 expect(res.body.data).toHaveLength(1);
//                 expect(res.body.data[0].description).toBe('Creative Space for Software Engineering');
//             })
//     });
// });

describe('Bug replication and fixes', () => {

    it('should return 200 server is up', async () => {
        await endPoint.get('')
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
            expect(res.body.msg).toBe('Server is up!');
        })
    });

    // monitoring the logs on the live server and clocked this request... someone trying to hack the system? 
    it('should return 404 Not Found', async () => {
        await endPoint.get('.env')
        .expect(404)
        .then(res => {
            expect(res.res.statusMessage).toBe('Not Found');
        })
    });

    it('should return 404 Not Found', async () => {
        await endPoint.get('/index.html')
        .expect(404)
        .then(res => {
            expect(res.res.statusMessage).toBe('Not Found');
        })
    });
});