# Wybór obrazu Node.js 
FROM node:20.14.0-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json (lub yarn.lock)
COPY package.json package-lock.json* ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty aplikacji
COPY . .

# Ustawienie zmiennej środowiskowej dla trybu deweloperskiego
ENV NODE_ENV=development

# Eksponowanie portu, na którym aplikacja będzie działać
EXPOSE 3000

# Uruchomienie aplikacji w trybie deweloperskim (hot reload)
CMD ["npm", "run", "dev"]