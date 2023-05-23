FROM node:lts as build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4173

RUN yarn build 

CMD ["yarn", "preview", "--host"]


