FROM node:16-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .

ARG API_PORT=3000
EXPOSE $API_PORT

ARG NODE_ENV=production

RUN npx tsup


CMD ["npm", "run", "start:prod"]