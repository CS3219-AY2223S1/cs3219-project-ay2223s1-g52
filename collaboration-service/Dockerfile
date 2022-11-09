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
ENV PORT=8002
ENV REDIS_DEV_URL=redis://redis:6379
ENV REDIS_PROD_HOST=redis-10745.c299.asia-northeast1-1.gce.cloud.redislabs.com
ENV REDIS_PROD_PORT=10745
ENV REDIS_PW=HwDKiJnZH8oceNGS6K76sakPj08mDldK

EXPOSE ${PORT}
CMD [ "node", "index.js" ]
