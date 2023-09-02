FROM node:18.16-alpine

STOPSIGNAL SIGINT

WORKDIR /usr/app

RUN chown -R node:node /usr/app

RUN mkdir -p /usr/app/logs && chown -R node:node /usr/app/logs

USER node

COPY package*.json tsconfig*.json nest-cli.json ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

COPY ./src ./src

COPY ./migrations ./migrations

COPY ./test ./test

CMD npm start
