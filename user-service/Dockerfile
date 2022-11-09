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

ENV ENV=PROD
ENV DB_CLOUD_URI=mongodb+srv://user3219:user3219@cluster0.fesq8vy.mongodb.net/?retryWrites=true&w=majority
ENV DB_LOCAL_URI=mongodb://localhost:27017/mydb
ENV SECRET_TOKEN=kajsdlaj
ENV URI_FRONTEND=https://frontend-rob2padjya-de.a.run.app
ENV URI_USER_SVC=https://user-service-rob2padjya-de.a.run.app
ENV PORT=8000

EXPOSE ${PORT}
CMD [ "node", "index.js" ]
