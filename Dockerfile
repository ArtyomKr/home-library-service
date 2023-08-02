FROM node:18.16-alpine

ARG PORT

ENV PORT=$PORT

EXPOSE ${PORT}

WORKDIR /usr/src/app

COPY package*.json tsconfig*.json ./

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY ./src .

RUN npm run build

USER node

CMD npm start
