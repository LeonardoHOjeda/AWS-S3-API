# STAGE 1: development-deps
FROM node:16.20-alpine AS development-deps
WORKDIR /app
COPY package.json ./
RUN chown -R node:node .
USER node
RUN npm install

# STAGE 2: development
FROM nope:16.20-alpine AS development
WORKDIR /app
COPY --from=development-deps /app/node_modules ./node_modules
COPY . .
RUN chown -R node:node .
USER node

# STAGE 3: builder
FROM node:16.20-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install && npm run build

FROM node:16.20-alpine AS production-deps
WORKDIR /app
COPY package.json ./
RUN chown node:node . .
USER node
RUN npm install --production

FROM node:16.20-alpine AS production
WORKDIR /app
COPY . .
COPY --from=builder /app/build ./build
COPY --from=production-deps /app/node_modules ./node_modules
CMD [ "node", "build" ]
