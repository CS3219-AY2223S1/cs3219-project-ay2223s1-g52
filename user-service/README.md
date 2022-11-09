# User Service

This microservice stores user data and manages login, signup, etc.

## Development

1. Refer to `.env.example` file to create your own `.env` file
1. Install and run [mongodb](https://www.mongodb.com/docs/manual/administration/install-community/) server locally
1. Run the following commands

```
npm install
npm run dev
```

The above commands will install all the dependencies and start the local development server for User Service.

## Database Schema

### UserModel

```
{
  username: String, (unique)
  password: String,
}
```

## API

- POST /api/user/
  - description: Create a new user
  - request body (JSON):
    - username
    - password
  - response:
    - message: Auto generated message
- POST /api/user/login
  - description: Login a new user
  - request body (JSON):
    - username
    - password
  - response:
    - username
    - token: jwt token
- POST /api/user/change-password
  - description: Change the password of the current user
  - request body (JSON):
    - password
  - response:
    - message: Auto generated message
- POST /api/user/delete-user
  - description: Delete the current user
  - response:
    - message: Auto generated message
