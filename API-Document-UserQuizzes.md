# User Quizzes API Documentation

List of available endpoints:

- `GET /quizes`
- `POST /quiz`
- `PATCH /quiz/:quizId/:questionId`
- `GET /quiz/:quizId`
- `POST /quiz/:quizId`
- `GET /quiz/:quizId/total-score`

&nbsp;

## 1. GET /quizes
Description:
- Get all User Quiz from database

_Response (200 - OK)_

```json
{
    [
        {
            "id": 1,
            "title": "Makanan Kesukaan",
            "status": null,
            "totalPoint": null,
            "AuthorId": 1,
            "CoupleId": 1,
            "QuizCategoryId": 3
        },
        {
            "id": 2,
            "title": "Film Kesukaan",
            "status": null,
            "totalPoint": null,
            "AuthorId": 1,
            "CoupleId": 1,
            "QuizCategoryId": 2
        },
        {
            "id": 3,
            "title": "Naruto",
            "status": "done",
            "totalPoint": 100,
            "AuthorId": 1,
            "CoupleId": 1,
            "QuizCategoryId": 1
        }
    ]
}
```
&nbsp;

## 2. POST /quiz
Description:
- Create user quizzes

Request:
- Body:
```json
{
  "title": "string",
  "QuizCategoryId": "integer",
  "question": "string",
  "answer": "string",
  "optionA": "string",
  "optionB": "string"
}
```

_Response (201 - CREATED)_
```json
{
    message: "Quizz create successfully"
}

```

_Response (400 - Bad Request)_
```json
{
    "statusCode": 400,
    "message"   : "This Quiz allready exist"
}
OR
{
    "statusCode": 400,
    "message"   : "Field Can Not be Empty"
}
```
&nbsp;

## 3. PATCH /quiz/:quizId/:questionId
Description:
- Update response partner, status quiz and total point

Request: 
- Body:
```json
{
    "responsePartner" : "string"
}
```
- Params:
```json
{
    "quizId"        : "integer",
    "questionId"    : "integer"
}
```

_Response (200 - OK)_
```json
{
    message: "Response has been updated"
}
```
_Response (400 - Bad Request)_
```json
{
    "statusCode": 400,
    "message"   : "This Quiz allready done"
}
```
_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "message"   : "Quiz is not found"
}
```
&nbsp;

## 4. GET /quiz/:quizId
Description:
- Get quiz by ID

Request:
- Params
```json
{
    "quizId"    : "integer"
}
```
_Response (200 - OK)_
```json
{
    "id": "integer",
    "title": "string",
    "status": "string",
    "totalPoint": "integer",
    "AuthorId": "integer",
    "CoupleId": "integer",
    "QuizCategoryId": "integer",
    "UserQuestions": [
        {
            "id": "integer",
            "question": "string",
            "optionA": "string",
            "optionB": "string",
            "answer": "string",
            "responsePartner": "string",
            "valuePartner": "boolean",
            "QuizId": "integer"
        }
    ],
    "QuizCategory": {
        "id": "integer",
        "quizCategory": "string",
        "imgUrl": "string"
    }
}
```
_Response (404 - Not Found)_

```json
{
    "statusCode": 400,
    "message"   : "Quiz is not found"
}
```
&nbsp;

## 5. POST /quiz/:quizId
Description:
- Create question 

Request:
-Body:
```json
{
    "question"  : "string",
    "answer"    : "string",
    "optionA"   : "string",
    "optionB"   : "string"
}
```
-Params:
```json
{
    "quizId"    : "string"
}
```
_Response (201 - CREATED)_
```json
{
     message: "Question create successfully"
}
```

_Response (400 - Bad Request)_
```json
{
    "statusCode": 400,
    "message"   : "This Question allready done"
}
```
_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "message"   : "Quiz is not found"
}
```
&nbsp;

## 5. GET /quiz/:quizId/total-score
Description:
- Get total point quiz

Request:
-Params:
```json
{
    "quizId"    : "string"
}
```
_Response (200 - OK)_
```json
{
    "totalPoint": "integer",
    "statusQuiz": "string"
}
```


_Response (404 - Not Found)_

```json
{
    "statusCode": 404,
    "message"   : "Quiz is not found"
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
    "statusCode": 500,
  "message": "Internal server error"
}
```