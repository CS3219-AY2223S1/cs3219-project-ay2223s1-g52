FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=production
ENV PORT=8003
ENV MONGO_URI=mongodb+srv://user3219:user3219@cluster0.fesq8vy.mongodb.net/QuestionService?retryWrites=true&w=majority
EXPOSE ${PORT}
CMD [ "node", "index.js" ]
