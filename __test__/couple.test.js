const app = require("../app.js");
const request = require("supertest");
const { Couple } = require("../models/index");

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("Couple Routes Test", () => {
    describe("GET /couples/ - get all couple", () => {
        test("200 - success on get all couple", (done) => {
            request(app)
                .get("/couples")
                .then((res) => {
                    const { body, status } = res;
                    console.log(body, status, "<--- body status");
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("UserId1", expect.any(Number));
                        expect(el).toHaveProperty("UserId2", expect.any(Number));
                    });
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });

        test("500 get all ISE test", (done) => {
            jest.spyOn(Couple, "findAll").mockRejectedValue("Error");
            request(app)
                .get("/couples/")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(500);
                    expect(body).toHaveProperty("message", "Internal Server Error");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
    });

    describe("GET /couples/id - get couple by id", () => {
        test("200 - success on get one couple", (done) => {
            request(app)
                .get("/couples/1")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("UserId1", expect.any(Number));
                    expect(body).toHaveProperty("UserId2", expect.any(Number));
                    expect(body).toHaveProperty("Users");
                    body.Users.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("nickname", expect.any(String));
                        expect(el).toHaveProperty("email", expect.any(String));
                        expect(el).toHaveProperty("userCode", expect.any(String));
                        expect(el).toHaveProperty("partnerCode", expect.any(String));
                        expect(el).toHaveProperty("CoupleId", expect.any(Number));
                    });
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
    });

    test("404 - wrong couple id on get one couple", (done) => {
        request(app)
            .get("/couples/555")
            .then((res) => {
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Not Found");
                return done();
            })
            .catch((err) => {
                console.log(err);
                done(err);
            });
    });
});
