FROM mcr.microsoft.com/playwright
WORKDIR /app
COPY *.* .
RUN npm i
COPY tests/ /app/tests/
CMD npx playwright test