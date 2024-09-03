# Étape de build : création de l'image Node.js pour compiler le projet
FROM node:21 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . .

# Construire l'application NestJS
RUN npm run build

# Étape de production : création de l'image finale basée sur Nginx
FROM nginx:1.27.1

# Copier les fichiers buildés du frontend (dossier /dist) dans le répertoire Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier le fichier de configuration Nginx, si nécessaire
# COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80 pour que Nginx puisse être accessible
EXPOSE 80
