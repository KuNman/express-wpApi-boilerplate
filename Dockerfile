FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

ARG SERVER_PORT
ENV SERVER_PORT ${SERVER_PORT}
EXPOSE ${SERVER_PORT}
