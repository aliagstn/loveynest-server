const app = require("../app.js");
const request = require("supertest");
const { UserQuiz } = require("../models");

beforeEach(() => {
    jest.restoreAllMocks();
});

const quizInsert = {
    quiz: {
        title: "test title",
        QuizCategoryId: "3",
    },
    question1: {
        question: "test question 1 jawabannya A yah?",
        optionA: "ini jawaban yang bener lho",
        optionB: "ini jawban yang salah",
        answer: "A",
    },
    question2: {
        question: "test question 2 jawabannya A yah?",
        optionA: "ini jawaban yang bener lho",
        optionB: "ini jawban yang salah",
        answer: "A",
    },
    question3: {
        question: "test question 3 jawabannya B yah?",
        optionA: "ini jawaban yang bener lho",
        optionB: "ini jawban yang salah",
        answer: "B",
    },
    question4: {
        question: "test question 4 jawabannya B yah?",
        optionA: "ini jawaban yang bener lho",
        optionB: "ini jawaban yang salah",
        answer: "B",
    },
    question5: {
        question: "test question 5 jawabannya A yah?",
        optionA: "ini jawaban yang bener lho",
        optionB: "ini jawaban yang salah",
        answer: "A",
    },
};

const answers = {
    answer1: "A",
    answer2: "A",
    answer3: "A",
    answer4: "A",
    answer5: "A",
};
describe("UserQuiz Routes Test", () => {
    describe("GET /userquiz/ - get all quiz", () => {
        test("200 - success on get all quiz", (done) => {
            request(app)
                .get("/userquiz/")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(Array.isArray(body)).toBe(true);
                    body.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("status");
                        expect(el).toHaveProperty("title");
                        expect(el).toHaveProperty("AuthorId", expect.any(Number));
                        expect(el).toHaveProperty("CoupleId", expect.any(Number));
                        expect(el).toHaveProperty("QuizCategoryId", expect.any(Number));
                    });
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });

        test("500 get all ISE test", (done) => {
            jest.spyOn(UserQuiz, "findAll").mockRejectedValue("Error");
            request(app)
                .get("/userquiz/")
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

    describe("GET /userquiz/:id - get UserQuiz based on id", () => {
        test("200 - success on get all quiz on id", (done) => {
            request(app)
                .get("/userquiz/1")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("status");
                    expect(body).toHaveProperty("title");
                    expect(body).toHaveProperty("AuthorId", expect.any(Number));
                    expect(body).toHaveProperty("CoupleId", expect.any(Number));
                    expect(body).toHaveProperty("QuizCategoryId", expect.any(Number));
                    expect(body).toHaveProperty("UserQuestions");
                    body.UserQuestions.forEach((el) => {
                        expect(el).toHaveProperty("id"), expect.any(Number);
                        expect(el).toHaveProperty("question");
                        expect(el).toHaveProperty("optionA");
                        expect(el).toHaveProperty("optionB");
                        expect(el).toHaveProperty("answer");
                    });
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });

        test("404 - success on get all quiz", (done) => {
            request(app)
                .get("/userquiz/55")
                .then((res) => {
                    const { body, status } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Quiz is not found");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
    });

    describe("POST /userquiz - post a quiz", () => {
        test("201 - success on creating quiz", (done) => {
            request(app)
                .post("/userquiz")
                .send(quizInsert)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty("message", "Quiz create successfully");
                    expect(body).toHaveProperty("userQuestions");

                    expect(body.userQuestions.length <= 5).toBe(true);
                    body.userQuestions.forEach((el) => {
                        expect(el).toHaveProperty("id", expect.any(Number));
                        expect(el).toHaveProperty("question");
                        expect(el).toHaveProperty("optionA");
                        expect(el).toHaveProperty("optionB");
                        expect(el).toHaveProperty("answer");
                    });
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });

        //test no question
        test("400 no questions", (done) => {
            request(app)
                .post("/userquiz")
                .send({
                    quiz: {
                        title: "test title",
                        QuizCategoryId: "3",
                    },
                })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
        //test no quizid
        test("404 - no category id", (done) => {
            request(app)
                .post("/userquiz")
                .send({
                    quiz: {
                        title: "test title",
                    },
                    question1: {
                        question: "test question 1 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question2: {
                        question: "test question 2 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question3: {
                        question: "test question 3 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "B",
                    },
                    question4: {
                        question: "test question 4 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "B",
                    },
                    question5: {
                        question: "test question 5 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "A",
                    },
                })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });

        test("404 - no title", (done) => {
            request(app)
                .post("/userquiz")
                .send({
                    quiz: {
                        QuizCategoryId: "3",
                    },
                    question1: {
                        question: "test question 1 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question2: {
                        question: "test question 2 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question3: {
                        question: "test question 3 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "B",
                    },
                    question4: {
                        question: "test question 4 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "B",
                    },
                    question5: {
                        question: "test question 5 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "A",
                    },
                })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Bad Request");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
        test("404 - category is not found", (done) => {
            request(app)
                .post("/userquiz")
                .send({
                    quiz: {
                        title: "CategoryErrorLOL",
                        QuizCategoryId: "99",
                    },
                    question1: {
                        question: "test question 1 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question2: {
                        question: "test question 2 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "A",
                    },
                    question3: {
                        question: "test question 3 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawban yang salah",
                        answer: "B",
                    },
                    question4: {
                        question: "test question 4 jawabannya B yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "B",
                    },
                    question5: {
                        question: "test question 5 jawabannya A yah?",
                        optionA: "ini jawaban yang bener lho",
                        optionB: "ini jawaban yang salah",
                        answer: "A",
                    },
                })
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Not Found");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
        test("400 repeat insert", (done) => {
            request(app)
                .post("/userquiz")
                .send(quizInsert)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "This Quiz already exist");
                    return done();
                })
                .catch((err) => {
                    console.log(err);
                    done(err);
                });
        });
    });

    describe("PATCH /userquiz/:quizId - insert response", () => {
        test("200 updated - success in adding answer", (done) => {
            request(app)
                .patch("/userquiz/3")
                .send(answers)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("message", "Response has been updated");
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });

        test("404 - quiz id not found", (done) => {
            request(app)
                .patch("/userquiz/93")
                .send(answers)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Quiz is not found");
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });

        test("400 - quiz has been finished", (done) => {
            request(app)
                .patch("/userquiz/3")
                .send(answers)
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "This Quiz already done");
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });
    });

    describe("GET /userquiz/:quizId/total-score - post a quiz", () => {
        test("200 - success on getting score", (done) => {
            request(app)
                .get("/userquiz/3/total-score")
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("totalPoint", expect.any(Number));
                    expect(body).toHaveProperty("statusQuiz");
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });

        test("404 quiz not found", (done) => {
            request(app)
                .get("/userquiz/99/total-score")
                .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Quiz is not found");
                    return done();
                })
                .catch((err) => {
                    return done(err);
                });
        });
    });
});
