# CS3219 AY22/23 Project - PeerPrep (by Team G52)

PeerPrep is a web application that helps students better prepare themselves for technical interviews. It provides a collaborative interview preparation platform and peer matching system, where students can find peers to practice whiteboard-style interview questions together.

Visit the deployed website [here](https://frontend-rob2padjya-de.a.run.app/).

## Installing / Getting started

### Requirements

- Install Node.js and NPM. We prefer using a Node Version Manager, you can follow the instructions here to install for [Mac](https://github.com/nvm-sh/nvm) or [Windows](https://github.com/coreybutler/nvm-windows). The version of Node that we are using is 16.
- Install Docker, for [Mac](https://docs.docker.com/desktop/install/mac-install/) or [Windows](https://docs.docker.com/desktop/install/windows-install/)
- Install [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)
- Install [Redis](https://redis.io/docs/getting-started/installation/)

### Development

**1. Using Docker Compose**

1. Clone the repo
1. Navigate to Dockerfile in the frontend directory
1. Uncomment "REACT_APP_ENV=DEV"
1. Run the following command

```shell
docker compose -f docker-compose-all.yaml up --build
```

The above command will build and run the docker containers. You can then access the website at http://localhost

**2. Running each services locally**

1. Clone the repo
1. cd into each directories and follow the instructions on the README of each services: [Frontend](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/frontend), [User Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/user-service), [Matching Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/matching-service), [Collaboration Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/collaboration-service), [Question Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/question-service), [Communication Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/communication-service), [History Service](https://github.com/CS3219-AY2223S1/cs3219-project-ay2223s1-g52/tree/main/history-service)
1. Then, you can access the website at http://localhost:3000

```
For example:

    cd frontend
    npm install
    npm start
```
