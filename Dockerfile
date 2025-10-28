
FROM cypress/included:13.6.2


WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


ENV CYPRESS_CACHE_FOLDER=/root/.cache/Cypress


CMD ["npx", "cypress", "run"]
