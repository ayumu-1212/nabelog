FROM node:16.15.0-slim

WORKDIR /usr/local/app

COPY app/package*.json ./
RUN npm install

CMD ["npm", "start"]
