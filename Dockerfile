FROM node:18.16-alpine

ARG PORT

ENV PORT=$PORT

EXPOSE ${PORT}

STOPSIGNAL SIGINT

WORKDIR /usr/app

RUN chown node:node /usr/app

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
