# base image
FROM node:16-alpine as base

# dependency builder
FROM base AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . ./

RUN yarn build

# development target
FROM builder AS dev

WORKDIR /app

EXPOSE $PORT

ENV NODE_PATH=./src

CMD ["yarn", "dev"]


# production target
FROM base AS prod

ENV NODE_ENV=production

WORKDIR /app

RUN chown -R node:node /app

USER node

COPY --chown=node:node --from=builder /app /app

RUN yarn install --production --frozen-lockfile

EXPOSE $PORT

ENV NODE_PATH=./dist

CMD ["node", "--unhandled-rejections=strict", "./dist/server.js"]