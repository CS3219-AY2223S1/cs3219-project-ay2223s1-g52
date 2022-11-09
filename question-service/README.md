# Question Service

This microservice stores the coding questions from leetcode.

## Development

1. Refer to `.env.example` file to create your own `.env` file
1. Install and run [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) server locally
1. Run the following commands

```
npm install
npm run dev
```

The above commands will install all the dependencies and start the local development server for Question Service.

However, before you can start using the service, you have to populate your database with the questions. To do this, send a **POST** request to `/api/questionService/question/test`. This endpoint will fetch 100 questions from leetcode API.

## Database Schema

### Problem

```
{
  \_id: String,
  questionId: String,
  questionFrontendId: String,
  title: String,
  titleSlug: String, (unique)
  content: String,
  difficulty: String, (index)
  likes: Number,
  dislikes: Number,
  similarQuestions: String,
  topicTags: Array,
  codeSnippets: Array,
  stats: String,
  hints: Array,
  sampleTestCase: String,
}
```

## API

- GET /api/questionService/question/random/:roomId

  - description: Get a random question for the room
  - params:
    - roomId: `match-[Easy/Medium/Hard]-[random string]`
  - response: `Problem`

- GET /api/questionService/question/:titleSlug
  - description: Get a question with the specific title slug
  - params:
    - titleSlug: `two-sum`
  - response: `Problem`
