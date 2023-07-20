FROM node:16.20-alpine AS development-deps
WORKDIR /app
COPY package.json ./
RUN chown -R node:node .
USER node
RUN npm install

FROM node:16.20-alpine AS development
WORKDIR /app
COPY --from=development-deps /app/node_modules ./node_modules
COPY . .
RUN chown -R node:node .
USER node
RUN npm run build
CMD [ "npm", "run", "dev" ]


FROM node:16.20-alpine AS builder
WORKDIR /app
COPY --from=development-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# PRODUCTION
FROM node:16.20-alpine AS production-deps
WORKDIR /app
COPY package.json ./
RUN chown -R node:node .
USER node
RUN npm install --production


FROM node:16.20-alpine AS production
WORKDIR /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
CMD [ "npm", "start" ]


