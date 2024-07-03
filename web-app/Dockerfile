FROM node:lts-alpine
WORKDIR /app

COPY *.* .
RUN npm install
COPY public/ src/ .

CMD npm run dev