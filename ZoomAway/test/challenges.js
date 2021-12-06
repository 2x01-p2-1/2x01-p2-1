let mongoose = ('mongoose');
let request = require('supertest');
let Challenges = require('../models/challenges.model');
let server = require('../server');

let chai = require('chai');
let should = chai.should();

let cookie;
let challengeID;

describe('Challenges', () => {
    /**
     * Before every test, the Database will be cleared
     */
    before((done) => {
        Challenges.remove({}, (err) => {
            done();
        });
    });

    /**
     * Test login function
     */
    describe('/POST Login', () => {
        it('it should login with correct credentials', (done) => {
            let user = {
                email: 'admin@zoomaway.com',
                password: 'password'
            }
            request(server).post('/login')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    cookie = res.headers['set-cookie'];
                    done();
                });
        });
    });

    /**
     * Test login function (invalid credentials)
     */
    describe('/POST Login', () => {
        it('it should not login with incorrect credentials', (done) => {
            let user = {
                email: 'admin@zoomaway.com',
                password: 'password123'
            }
            request(server).post('/login')
                .send(user)
                .expect(401)
                .end((err, res) => {
                    done();
                });
        });
    });

    /**
     * Test POST challenges function (user not logged in)
     * -> i.e., cookie is not set
     */
    describe('/POST challenges', () => {
        it('it should not POST a challenge when not authenticated', (done) => {
            let challenge = {
                challengeName: 'Test Challenge',
                instruction: 'Test instruction',
                command: 'FFFF',
                maze: {
                    startPoint: {
                        x: 3,
                        y: 5
                    },
                    endPoint: {
                        x: 3,
                        y: 1
                    },
                    firstRow: [
                        1, 1, 0, 1, 1
                    ],
                    secondRow: [
                        1, 1, 0, 1, 1
                    ],
                    thirdRow: [
                        1, 1, 0, 1, 1
                    ],
                    fourthRow: [
                        1, 1, 0, 1, 1
                    ],
                    fifthRow: [
                        1, 1, 0, 1, 1
                    ]
                }
            }
            request(server).post('/challenges')
                .send(challenge)
                .expect(401)
                .end((err, res) => {
                    done();
                });
        });
    });

    /**
     * Test POST challenges function (contains invalid values)
     * -> i.e., empty strings, 1 > number > 5, 1 > array_size > 5
     */
    describe('/POST challenges', () => {
        it('it should not POST a challenge with invalid fields', (done) => {
            let challenge = {
                challengeName: '',
                instruction: '',
                command: '',
                maze: {
                    startPoint: {
                        x: 7,
                        y: 1
                    },
                    endPoint: {
                        x: 5,
                        y: -1
                    },
                    firstRow: [
                        1, 1, 0, 1, 15
                    ],
                    secondRow: [
                        1, 12, 0, 1, 1
                    ],
                    thirdRow: [
                        1, 1, 0, 1, 1
                    ],
                    fourthRow: [
                        1, -1, 0, 1, 1
                    ],
                    fifthRow: [
                        1, 1, 0, 1, 1, 1
                    ]
                }
            }
            request(server).post('/challenges')
                .set('cookie', cookie)
                .send(challenge)
                .expect(422)
                .end((err, res) => {
                    done();
                });
        });
    });

    /**
     * Test POST challenges function (user is logged in and all values are valid)
     */
    describe('/POST challenges', () => {
        it('it should POST a challenge when authenticated and has valid fields', (done) => {
            let challenge = {
                challengeName: 'Test Challenge',
                instruction: 'Test instruction',
                command: 'FFFF',
                maze: {
                    startPoint: {
                        x: 3,
                        y: 5
                    },
                    endPoint: {
                        x: 3,
                        y: 1
                    },
                    firstRow: [
                        1, 1, 0, 1, 1
                    ],
                    secondRow: [
                        1, 1, 0, 1, 1
                    ],
                    thirdRow: [
                        1, 1, 0, 1, 1
                    ],
                    fourthRow: [
                        1, 1, 0, 1, 1
                    ],
                    fifthRow: [
                        1, 1, 0, 1, 1
                    ]
                }
            }
            request(server).post('/challenges')
                .set('cookie', cookie)
                .send(challenge)
                .expect(200)
                .end((err, res) => {
                    done();
                });
        });
    });

    /**
     * Test GET all challenges function
     */
     describe('/GET challenges', () => {
        it('it should GET all challenges', (done) => {
            request(server).get('/challenges')
                .expect(200)
                .end((err, res) => {
                    challengeID = res.body[0]._id;
                    console.log(challengeID);
                    done();
                });
        });
    });

    /**
     * Test GET challenges function (using a specific ID)
     */
    describe('/GET/:id challenge', () => {
        it('it should GET a challenge by the given id', (done) => {
            request(server).get('/challenges/' + challengeID)
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('maze');
                    res.body.should.have.property('challengeName');
                    res.body.should.have.property('instruction');
                    res.body.should.have.property('command');
                    done();
                });
        });
    });

    /**
     * Test DELETE challenges function (ID needs to be specified)
     * -> Comment this test case if you want to view the data in the database created from the test
     */
    describe('/DELETE challenges', () => {
        it('it should DELETE a challenge', (done) => {
            request(server).delete('/challenges/' + challengeID)
                .set('cookie', cookie)
                .expect(200)
                .end((err, res) => {
                    done();
                });
        });
    });
});