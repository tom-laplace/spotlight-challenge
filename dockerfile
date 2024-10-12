FROM node:20-alpine3.18 AS base

RUN apk --no-cache add curl 
RUN corepack enable 

FROM base AS deps 
WORKDIR /app 
ADD package.json package.lock.json ./ 
RUN npm install

FROM base AS production-deps 
WORKDIR /app 
ADD package.json package.lock.json ./
RUN npm install --ommit=dev

FROM base AS build 
WORKDIR /app 
COPY --from=deps /app/node_modules /app/node_modules
ADD . . 
RUN node ace build

FROM base 
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/content/build/packages.json /app/content/build/packages.json
RUN mkdir /app/tmp
EXPOSE 8080
CMD ["node", "./bin/server.js"]