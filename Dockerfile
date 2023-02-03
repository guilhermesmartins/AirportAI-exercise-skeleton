FROM node:16-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .

ARG API_PORT=3000
EXPOSE $API_PORT

RUN npm run build

ARG NODE_ENV=production

CMD ["npm", "run", "start:prod"]