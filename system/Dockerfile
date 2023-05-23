FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run migrate-initial
RUN npm run generate

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start"]
