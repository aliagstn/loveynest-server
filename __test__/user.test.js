const app = require("../app.js");
const request = require("supertest");
const { User, AppQuiz, AppQuizResult } = require("../models/index");

const user1 = {
    email: "user.test@mail.com",
    nickname: "User Test",
    password: "usertest",
};
beforeEach(() => {
    jest.restoreAllMocks();
});
beforeAll(() => {});
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU4MjQ4MjE2fQ.bIzM9ZHbDgjlocFMYJITQ_2nL7qVe8yl1x0WI-IH-S4";

const user5token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjU4MjUwODYwfQ.lkC475z-VBZmLcdehxMPA82DDdWXAT56lltmdOI1duY";

describe("User Routes Test", () => {
    describe("POST /register - create new user", () => {
        test("201 Success register - should create new User", (done) => {
            request(app)
                .post("/users/")
                .send(user1)
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(201);
                    expect(body.data).toHaveProperty("id", expect.any(Number));
                    expect(body.data).toHaveProperty("nickname", user1.nickname);
                    expect(body.data).toHaveProperty("email", user1.email);
                    expect(body.data).toHaveProperty("usercode", expect.any(String));
                    expect(body).toHaveProperty("message", "User created successfully");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("400 Failed register - should return error if email is null", (done) => {
            request(app)
                .post("/users/")
                .send({
                    password: "qweqwe",
                    nickname: "testnicknameajanih",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 Failed register - should return error if email is already exists", (done) => {
            request(app)
                .post("/users/")
                .send({ nickname: "iu", email: "iucantik@mail.com", password: "123456" })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "E-mail must be unique");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("400 Failed register - should return error if wrong email format", (done) => {
            request(app)
                .post("/users/")
                .send({
                    nickname: "iu",
                    email: "iucantik@mail",
                    password: "123456",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("POST /login - user login", () => {
        test("200 Success login - should return access_token", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    nickname: "iu",
                    email: "iucantik@mail.com",
                    password: "123456",
                })
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body.data).toHaveProperty("access_token", expect.any(String));
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 Failed login wrong password - should return error", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    email: "iucantik@mail.com",
                    password: "salahpassword",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthorized");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 Failed login no password- should return error", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    email: "iucantik@mail.com",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthorized");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 Failed login no email- should return error", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    password: "hehetest@mail.com",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthorized");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 Failed login wrong email - should return error", (done) => {
            request(app)
                .post("/users/login")
                .send({
                    email: "iucantikiyakah@mail.com",
                    password: "salahpassword",
                })
                .then((res) => {
                    const { body, status } = res;

                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Unauthorized");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("get /users - ", () => {
        test("200 - get all users", (done) => {
            request(app)
                .get("/users/")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("nickname");
                        expect(el).toHaveProperty("email", expect.any(String));
                        expect(el).toHaveProperty("userCode", expect.any(String));
                    });
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("500 - get all users", (done) => {
            jest.spyOn(User, "findAll").mockRejectedValue("Error");
            request(app)
                .get("/users/")
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

    describe("get /users/:id - ", () => {
        test("200 - get one user", (done) => {
            request(app)
                .get("/users/1")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body.data).toHaveProperty("id", expect.any(Number));
                    expect(body.data).toHaveProperty("nickname");
                    expect(body.data).toHaveProperty("email", expect.any(String));
                    expect(body.data).toHaveProperty("userCode", expect.any(String));
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("404 - get one users", (done) => {
            request(app)
                .get("/users/999")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("patch /user/:id - update username & profile picture", () => {
        test("200 - patch succesful", (done) => {
            request(app)
                .patch("/users/1")
                .send({ nickname: "test edit" })
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("message", "User updated successfully");
                    expect(body).toHaveProperty("data");
                    expect(body.data).toHaveProperty("id", expect.any(Number));
                    expect(body.data).toHaveProperty("photoProfile", expect.any(String));
                    expect(body.data).toHaveProperty("nickname", expect.any(String));
                    expect(body.data).toHaveProperty("userCode", expect.any(String));
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 - fail if no access_token", (done) => {
            request(app)
                .patch("/users/1")
                .send({ username: "no access token bro" })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid access token");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
        test("404 - fail if no data is sent", (done) => {
            request(app)
                .patch("/users/1")
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("404 - fail if user is not found", (done) => {
            request(app)
                .patch("/users/111")
                .send({ nickname: "user doesnt even exist" })
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("post /users/input/:id - input code to match with pair", () => {
        test("400 - no code", (done) => {
            request(app)
                .patch("/users/input/5")
                .set("access_token", user5token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
        test("400 - wrong access_token", (done) => {
            request(app)
                .patch("/users/input/5")
                .send({ partnerCode: "LV-2345" })
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
        test("401 - no access_token", (done) => {
            request(app)
                .patch("/users/input/5")
                .send({ partnerCode: "LV-2345" })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid access token");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("400 - pair already coupled", (done) => {
            request(app)
                .patch("/users/input/5")
                .send({ partnerCode: "LV-1235" })
                .set("access_token", user5token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("400 - pairing with self", (done) => {
            request(app)
                .patch("/users/input/1")
                .send({ partnerCode: "LV-1111" })
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
        test("200 - succesful pair", (done) => {
            request(app)
                .patch("/users/input/5")
                .set("access_token", user5token)
                .send({ partnerCode: "LV-2346" })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty("message", "Couple created successfully");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
        test("404 - self already paired", (done) => {
            request(app)
                .patch("/users/input/5")
                .send({ partnerCode: "LV-2346" })
                .set("access_token", user5token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "You already have a partner");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("post /users/delete/:id - delete partnerCode", () => {
        test("401 - no access token", (done) => {
            request(app)
                .patch("/users/delete/1")
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid access token");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("401 - no user", (done) => {
            request(app)
                .patch("/users/delete/99")
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid access token");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("400 - no couple", (done) => {
            request(app)
                .patch("/users/delete/1")
                .set("access_token", token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        test("200- successful delete", (done) => {
            request(app)
                .patch("/users/delete/5")
                .set("access_token", user5token)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("message", "partnerCode deleted successfully");
                    return done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("post /api/upload  - upload image", () => {
        test.skip("201 - succesfull image upload", (done) => {
            request(app)
                .post("/users/api/upload")
                .set("access_token", token)
                .attach("img", "./data/testingasset.png")
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(201);
                    return done();
                })
                .catch((err) => {
                    next(err);
                });
        });

        test("500 - somehow error", (done) => {
            jest.spyOn(User, "findAll").mockRejectedValue("Error");
            request(app)
                .post("/users/api/upload")
                .set("access_token", token)
                .attach("img", "./data/testingasset.png")
                .then((res) => {
                    const { status, body } = res;

                    expect(status).toBe(500);
                    expect(body).toHaveProperty("message", "Internal Server Error");
                    return done();
                })
                .catch((err) => {
                    next(err);
                });
        });
    });
});
