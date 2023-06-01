FROM node:20-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production --silent
RUN npm install react-scripts@5.0.1 -g --production --silent

ENV NODE_PATH=/app/node_modules/.bin

COPY . .