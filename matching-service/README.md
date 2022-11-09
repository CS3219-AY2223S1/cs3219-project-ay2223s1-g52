# Matching Service

This microservice match two users and returns a room id.

## Development

1. Refer to `.env.example` file to create your own `.env` file
1. Install and run [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) server locally
1. Run the following commands

```
npm install
npm run dev
```

The above commands will install all the dependencies and start the local development server for Matching Service.

## Database Schema

### Match

```
{
  user: String,
  difficulty: String,
  room: String, (unique)
}
```

## API

- POST /api/matchService/match
  - description: Create a match
  - request body (JSON):
    - user: username of the user
    - difficulty: `[Easy/Medium/Hard]`
  - response:
    - room: id of the room
    - isMatch: `Boolean`
