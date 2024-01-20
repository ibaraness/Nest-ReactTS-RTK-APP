FROM node:18.12.0-alpine

WORKDIR /app

COPY . .

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "start"]
