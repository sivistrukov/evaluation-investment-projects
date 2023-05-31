FROM node:alphine

RUN mkdir /app
WORKDIR /app

COPY package.json
RUN npm install

COPY . .
