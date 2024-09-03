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

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application NestJS
RUN npm run build

# Exposer le port 3000
EXPOSE 3000

# Démarrer le projet
ENTRYPOINT [ "npm", "run", "start:prod" ]
