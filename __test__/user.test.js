const app = require("../app.js");
const request = require("supertest");
const { User, AppQuiz, AppQuizResult } = require("../models/index");

const user1 = {
    email: "user.test@mail.com",
    name: "User Test",
    password: "usertest",
};

describe("User Routes Test", () => {
    describe("POST /register - create new user", () => {
        test("201 Success register - should create new User", (done) => {
            request(app)
                .post("/user/")
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("nickname", user1.nickname);
                    expect(body).toHaveProperty("email", user1.email);
                    return done();
                });
        });

        test("400 Failed register - should return error if email is null", (done) => {
            request(app)
                .post("/user/")
                .send({
                    password: "qweqwe",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email is required");
                    return done();
                });
        });

        test("400 Failed register - should return error if email is already exists", (done) => {
            request(app)
                .post("/user/")
                .send(user1)
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email must be unique");
                    return done();
                });
        });

        test("400 Failed register - should return error if wrong email format", (done) => {
            request(app)
                .post("/user/")
                .send({
                    email: "random",
                    name: "Sample User",
                    password: "qweqwe",
                })
                .end((err, res) => {
                    if (err) return done(err);
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Invalid email format");
                    return done();
                });
        });
    });

    // describe("POST /login - user login", () => {
    //     test("200 Success login - should return access_token", (done) => {
    //         request(app)
    //             .post("/login")
    //             .send(user1)
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 const { body, status } = res;

    //                 expect(status).toBe(200);
    //                 expect(body).toHaveProperty("access_token", expect.any(String));
    //                 return done();
    //             });
    //     });

    //     test("401 Failed login - should return error", (done) => {
    //         request(app)
    //             .post("/login")
    //             .send({
    //                 email: "hello@mail.com",
    //                 password: "salahpassword",
    //             })
    //             .end((err, res) => {
    //                 if (err) return done(err);
    //                 const { body, status } = res;

    //                 expect(status).toBe(401);
    //                 expect(body).toHaveProperty("message", "Invalid email/password");
    //                 return done();
    //             });
    //     });
    // });
});
