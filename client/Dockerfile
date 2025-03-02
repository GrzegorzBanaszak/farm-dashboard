FROM node:20.14.0-alpine 

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj całą aplikację
COPY . .

# Uruchom aplikację
CMD ["npm", "run", "dev", "--", "--host"]