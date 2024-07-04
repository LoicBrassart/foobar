FROM node:lts-alpine
WORKDIR /app

COPY *.* .
RUN npm install

COPY src src
COPY prisma prisma

CMD npm run dev