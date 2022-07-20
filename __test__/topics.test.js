const app = require("../app.js");
const request = require("supertest");
const { Topic } = require("../models/index");

beforeEach(() => {
    jest.restoreAllMocks();
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MjQ4MjE2fQ.bIzM9ZHbDgjlocFMYJITQ_2nL7qVe8yl1x0WI-IH-S4";

describe("GET /topics/ - get all quiz", () => {
    test("200 - success fetch", (done) => {
        request(app)
            .get("/topics/")
            .set("access_token", token)
            .then((res) => {
                const { body, status } = res;
                expect(status).toBe(200);
                body.forEach((el) => {
                    expect(el).toHaveProperty("id", expect.any(Number));
                    expect(el).toHaveProperty("name", expect.any(String));
                    expect(el).toHaveProperty("TopicCategory");
                });
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
    test("500 - somehow fail", (done) => {
        jest.spyOn(Topic, "findAll").mockRejectedValue("Error");
        request(app)
            .get("/topics/")
            .set("access_token", token)
            .then((res) => {
                const { body, status } = res;
                expect(status).toBe(500);
                expect(body).toHaveProperty("message", "Internal Server Error");
                return done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe("POST /topics/ - add topic", () => {
    test("201- success create", (done) => {
        request(app)
            .post("/topics")
            .set("access_token", token)
            .send({ status: "true", TopicId: 1 })
            .then((res) => {
                const { body, status } = res;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("status");
                expect(body).toHaveProperty("TopicId");
                return done();
            })
            .catch((err) => {
                console.log(err);
                done(err);
            });
    });
    test("400- didnt send status", (done) => {
        request(app)
            .post("/topics")
            .set("access_token", token)
            .send({ TopicId: 1 })
            .then((res) => {
                const { body, status } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Bad Request");
                return done();
            })
            .catch((err) => {
                console.log(err);
                done(err);
            });
    });
});
