FROM node:16.18.1-alpine

# set work directory
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
RUN yarn install

COPY . .

RUN yarn run build

CMD ["node", "dist/main.js"]