# History Service

This microservice stores the past questions done by users.

## Development

1. Refer to `.env.example` file to create your own `.env` file
1. Install and run [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) server locally
1. Run the following commands

```
npm install
npm run dev
```

The above commands will install all the dependencies and start the local development server for History Service.

## Database Schema

### History

```
{
  username: String,
  title: String,
  titleSlug: String
}
```

## API

- GET /api/historyService/history/:userId
  - description: Get histories of a user
  - params:
    - username: username of a user
  - response: `History`
- POST /api/historyService/history/:userId
  - description: Add a history for a user
  - params:
    - username: username of a user
  - request body (JSON):
    - title: `Two Sum`
    - titleSlug: `two-sum`
  - response:
    - message: Auto generated message
    - history: `History`
