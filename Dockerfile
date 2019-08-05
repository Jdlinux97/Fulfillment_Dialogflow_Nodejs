FROM node:10.16.0-slim

WORKDIR /items

COPY . /items

RUN npm install 

CMD ["npm", "start"]