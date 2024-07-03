FROM node:lts-alpine
WORKDIR /app

COPY *.* .
RUN npm install

COPY src src

CMD npm run dev