const app = require("../app.js");
const request = require("supertest");
const { User, AppQuiz, AppQuizResult } = require("../models/index");
let answer = {
    responseUser: [true, false, true, true, true, false, false],
    UserId: 1,
    QuizId: 1,
    CoupleId: 1,
};

jest.useFakeTimers("legacy");
beforeEach(() => {
    jest.restoreAllMocks();
});

describe("AppQuiz Routes Test", () => {
    describe("GET /appquiz/ - get all quiz", () => {
        test("200 - success on get all quiz", (done) => {
            request(app)
                .get("/appquiz/")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("question", expect.any(Array));
                        expect(el).toHaveProperty("title", expect.any(String));
                    });
                    return done();
                });
        });

        test("500 get all ISE test", (done) => {
            jest.spyOn(AppQuiz, "findAll").mockRejectedValue("Error");
            request(app)
                .get("/appquiz/")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(500);
                    expect(body).toHaveProperty("message", "Internal Server Error");
                    return done();
                });
        });
    });
    describe("GET /result/ - get all result", () => {
        test("200 - success on get all result", (done) => {
            request(app)
                .get("/appquiz/result")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("responseUser");
                        expect(Array.isArray(el.responseUser)).toBe(true);
                        expect(el).toHaveProperty("CoupleId", expect.any(Number));
                        expect(el).toHaveProperty("QuizId", expect.any(Number));
                    });
                    return done();
                });
        });

        test("500 get all ISE result", (done) => {
            jest.spyOn(AppQuizResult, "findAll").mockRejectedValue("Error");
            request(app)
                .get("/appquiz/result")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(500);
                    expect(body).toHaveProperty("message", "Internal Server Error");
                    return done();
                });
        });
    });
    describe("GET /result/:id - get one result based on user Id", () => {
        test("200 - success on get one result", (done) => {
            request(app)
                .get("/appquiz/result/1")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("responseUser", expect.any(Array));
                        expect(el).toHaveProperty("CoupleId", expect.any(Number));
                        expect(el).toHaveProperty("QuizId", expect.any(Number));
                    });
                    return done();
                });
        });

        test("404 - error when getting result with incorrect id", (done) => {
            request(app)
                .get("/appquiz/result/99")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                });
        });

        // test authorization 403 if CoupleId is wrong from access_token
    });
    describe("post /result - post quiz result", () => {
        // test correct
        test("201 - success on posting answer", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send(answer)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("responseUser", expect.any(Array));
                    expect(body).toHaveProperty("QuizId", expect.any(Number));
                    expect(body).toHaveProperty("UserId", expect.any(Number));
                    expect(body).toHaveProperty("CoupleId", expect.any(Number));
                    return done();
                });
        });
        // test empty response
        test("400 no response", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    UserId: 1,
                    QuizId: 1,
                    CoupleId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    expect(Array.isArray(body.message)).toBe(true);
                    return done();
                });
        });
        // test not a couple
        test("403 - wrong couple", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false, false],
                    UserId: 3,
                    CoupleId: 1,
                    QuizId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(403);
                    expect(body).toHaveProperty("message", "Forbidden");
                    return done();
                });
        });
        //test no couple
        test("404 - wrong couple", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false, false],
                    UserId: 3,
                    QuizId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                });
        });
        // test response not boolean
        test("400 - wrong response data  type", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, "talse", "frue"],
                    UserId: 1,
                    QuizId: 1,
                    CoupleId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    return done();
                });
        });
        // test response less than 7
        test("400 - response insufficient / sequelize error", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false],
                    UserId: 1,
                    QuizId: 1,
                    CoupleId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    return done();
                });
        });
        // test response more than 7
        test("400 - response insufficient / sequelize error", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false, false, true],
                    UserId: 1,
                    QuizId: 1,
                    CoupleId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    return done();
                });
        });
        // test no user id
        test("404 - cannot find user ", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false, false],
                    QuizId: 1,
                    CoupleId: 1,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                });
        });
        //test wrong user
        test("404 - cannot find user ", (done) => {
            request(app)
                .post("/appquiz/result/")
                .send({
                    responseUser: [true, false, true, true, true, false, false],
                    QuizId: 1,
                    CoupleId: 1,
                    UserId: 55,
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                });
        });
    });
});
