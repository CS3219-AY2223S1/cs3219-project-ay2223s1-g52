Add secret_token into .env of user-service and replace secret_token in authentication-controller.js with that

## To close local db

    mongosh
    use admin
    db.shutdownServer()

