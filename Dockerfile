FROM node:alpine

WORKDIR /usr/src/misi-site

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY ./ ./

RUN cd front/ && yarn

RUN yarn build-deploy

CMD [ "node", "server.js" ]
