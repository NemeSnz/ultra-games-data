FROM node:14-alpine As builder
WORKDIR /usr/src/app

COPY *.json ./
COPY src src
RUN npm install
RUN npm run build

FROM node:14-alpine As runtime

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist dist

EXPOSE ${PORT}

CMD ["node", "dist/main"]
