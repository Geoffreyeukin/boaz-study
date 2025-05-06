# Utilisation de Node.js comme image de base
FROM node:18-alpine as build

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie des fichiers sources
COPY . .

# Construction de l'application
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Copie des fichiers de build vers Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copie de la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 9000
EXPOSE 9000

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
