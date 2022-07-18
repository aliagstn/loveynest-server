const app = require("../app.js");
const request = require("supertest");
const { User, AppQuiz, AppQuizResult } = require("../models/index");
let answer = {
    responseUser: [true, false, true, true, true, false, false],
    UserId: 1,
    QuizId: 1,
    CoupleId: 1,
};
const { exec } = require("child_process");
beforeAll(() => {
    exec("npx sequelize-cli --env=test db:seed:all");
});

afterAll((done) => {});
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
                .get("/appquiz/result/55")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "User not found");
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

        // test not a couple

        // test response not boolean

        // test response less than 7

        // test response more than 7

        // test no user id
    });
});
