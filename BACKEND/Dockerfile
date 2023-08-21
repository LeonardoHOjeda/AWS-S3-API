FROM node:16.20-alpine as builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build
CMD [ "npm", "start" ]