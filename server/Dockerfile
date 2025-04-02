FROM node:22.14.0-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Generowanie klienta Prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]