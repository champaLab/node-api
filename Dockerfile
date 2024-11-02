FROM node:20-slim

WORKDIR /app

RUN apt update
RUN apt install -y nfs-common

RUN npm install -g pm2


COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]