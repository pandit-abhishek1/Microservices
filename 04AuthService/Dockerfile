FROM node:21-alpine3.18 as builder

# stage 1
 # npm install
 WORKDIR /app
  COPY package.json ./
  COPY tsconfig.json ./
  COPY .npmrc ./
  COPY src ./src
  COPY tools ./tools
  RUN npm install -g npm@latest
  RUN npm ci && npm run build
# stage 2
 # npm run test
FROM node:21-alpine3.18
WORKDIR /app
RUN apk add --no-cache bash
COPY package.json ./
COPY tsconfig.json ./
COPY .npmrc ./
RUN npm install -g pm2 npm@latest
RUN npm ci --production
COPY --from=builder /app/build ./build

EXPOSE 4002
CMD ["node", "run", "start"]
# stage 3
 # npm run build
# stage 4

