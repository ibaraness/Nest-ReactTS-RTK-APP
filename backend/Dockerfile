FROM node:18.12.0-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "start:prod"]
