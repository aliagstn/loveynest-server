const app = require("../app.js");
const request = require("supertest");
const { Couple } = require("../models/index");

describe("Couple Routes Test", () => {
    describe("GET /couples/ - get all couple", () => {
        test("200 - success on get all couple", (done) => {
            request(app)
                .get("/couples/")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("UserId1", expect.any(Number));
                        expect(el).toHaveProperty("UserId2", expect.any(Number));
                    });
                    return done();
                });
        });
    });
    describe("GET /couples/ - get all couple", () => {
        test("200 - success on get all couple", (done) => {
            request(app)
                .get("/couples/")
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("UserId1", expect.any(Number));
                        expect(el).toHaveProperty("UserId2", expect.any(Number));
                    });
                    return done();
                });
        });
    });
    describe("GET /couples/id - get couple by id", () => {
        test("200 - success on get one couple", (done) => {
            request(app)
                .get("/couples/1")
                .end((err, res) => {
                    if (err) return done(err);
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
                        expect(el).toHaveProperty("UserCode");
                        expect(el).toHaveProperty("PartnerCode");
                        expect(el).toHaveProperty("CoupleId");
                    });
                    return done();
                });
        });
    });
    test("404 - wrong couple id on get one couple", (done) => {
        request(app)
            .get("/couples/555")
            .end((err, res) => {
                if (err) return done(err);
                const { body, status } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Not Found");
                return done();
            });
    });
});
