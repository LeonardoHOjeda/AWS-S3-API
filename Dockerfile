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

# FROM node:16.20-alpine as production
# WORKDIR /app
# COPY --from=builder /app/build ./build
# COPY package*.json ./
# RUN npm install --production
# CMD [ "npm", "start" ]

# FROM node:16.20-alpine
# WORKDIR /app
# COPY package*.json ./
# COPY prisma ./prisma/
# COPY .env ./
# COPY tsconfig.json ./
# COPY . .
# RUN npm install
# RUN npx prisma generate
# RUN npm run build
# EXPOSE 8000
# CMD [ "npm", "start" ]