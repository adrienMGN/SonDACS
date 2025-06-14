# SonDACS

Face au besoin d’obtenir rapidement un retour d’opinion anonyme lors d’événements
ou en milieu associatif, nous avons imaginé SonDACS, une plateforme de mini-sondages
instantanés et anonymes, utilisable sans création de compte. L’utilisateur peut créer,
partager et consulter les résultats d’un sondage en quelques clics, sans aucune barrière
d’inscription.

SonDACS est une plateforme de mini-sondages instantanés anonymes utilisable sans
créer de compte. Le frontend est vanilla (HTML/CSS/JS), le backend en Node.js et la
base de données en MongoDB. Une librairie permet d’afficher les résultats d’un sondage
sous forme de graphique, et le service est déployé sur un VPS ou en utilisant Railway.
Le service est utile dans des contextes associatifs, événementiels ou même profession-
nels (dans les entreprises en interne). Il peut également être public et utilisable par tous,
et subsister sur des revenus publicitaires, ce qui en fait une solution soit B2B, soit B2B2C.

### DENIS Oscar et MANGIN Adrien
# Dacs S4 2024-2025


## Choix des ports

Port 4000 - API CORS REST Backend
Service docker : backend
Mapping: 4000:4000 (hôte:conteneur)
4000 est le port par défaut utilisé par Node.js

Port 27017 - Base de données MongoDB
Service docker: mongo
Mapping: 27017:27017 (hôte:conteneur)
Utilisation: Accès direct à la base de données MongoDB
27017 est le port par défaut de MondoDB

Port 8088 - Frontend web
Service: frontend (Nginx)
Mapping: 8088:80 (hôte:conteneur)
Utilisation: IHM web
On utilise 8088 au lieu de 80 afin d'éviter les conflits avec d'autres services web déployés

Port 8081 - MongoDB Express
Service: Interface d'administration web MongoDB
Mapping: 8081:8081 (hôte:conteneur)
Utilisation: Interface web pour administrer MongoDB (Mongo Express)
8081 est le port par défaut de MongoDB Express. Utiliser un port proche de celui pour les utilisateurs ne représente pas de risque puisqu'il faut s'authentifier avant d'accéder à la base de données

## L'idée du projet

SonDACS est une application web de sondages minimalistes et anonymes. L'objectif est de permettre à n'importe qui de créer rapidement un sondage, le partager via un lien unique, et obtenir des résultats en temps réel.

### Fonctionnalités principales :
- **Création rapide** : Interface simple pour créer un sondage en 3 clics
- **Choix unique ou multiple** : Pour tout types de questions
- **Anonyme** : Pas d'inscription requise, identification par session
- **Résultats en temps réel** : Visualisation graphique des résultats avec Chart.js
- **Partage facile** : Copie du lien de vote en un clic avec un boutton

## Comment lancer le projet

### Prérequis
- Docker et Docker Compose installés
- Git pour cloner le projet
- Créer un fichier .env sur le modèle de .env.example

### Installation et lancement

1. **Cloner le projet**
```bash
git clone <url-du-repo>
cd SAE_Advenced_Deployment
```

2. **Lancer l'application avec Docker Compose**
```bash
docker compose up --build
```

3. **Vérifier que tous les services sont démarrés**
```bash
docker compose ps
```
4 services devraient apparaitre

4. **Accéder à l'application**
- Frontend : http://{IP}:8088 
- API Backend : http://{IP}:4000
- MongoDB : http://{IP}:27017
- MongoDB Express : http://{IP}:8081

## Déploiement 

SonDACS est déployer sur docketu.iutnc.univ-lorraine.fr pour des raisons techniques.
En effet, l'application nécessite une base de donnée mongoDB et les services tel que MongoAtlas ne sont pas gratuit. ![alt text](image.png) C'est pour ces raisons techniques et financiaires que le site est déployé sur docketu. SonDACS est donc uniquement accessible via un VPN ou une connexion sur le réseau de l'université. 

Le déploiement sur docketu est relativement simple, il suffit de se ssh sur la machine :
ssh login@docketu.iutnc.univ-lorraine
y déposer les fichiers sources : sudo scp -r ../SAE_Advenced_Deployment login@docketu.iutnc.univ-lorraine.fr:~/  
puis de lancer le docker compose de puis la machine : 
ssh login@docketu.iutnc.univ-lorraine
cd SAE_Advenced_Deployment
docker compose up --build -d 

SonDACS est accessible à l'adresse suivante :
http://docketu.iutnc.univ-lorraine.fr:8088/

 Ce déploiement à nécessité de revoir les routes API de SonDACS qui utilisait un hostname localhost. De plus il a fallu s'assurer que chaque port utilisé pour SonDACS était bien libre sur la machine docketu.

### Arrêter l'application
```bash
docker compose down
```

### Réinitialiser les données
```bash
docker compose down --volumes
docker compose up -d
```

## Comment utiliser l'application

### Créer un sondage
1. Rendez-vous sur http://{IP}:8088
2. Cliquez sur "Créer un sondage"
3. Saisissez votre question
4. Ajoutez vos options de réponse (minimum 2)
5. Cochez "Autoriser le choix multiple" si nécessaire
6. Cliquez sur "Créer le sondage"

### Partager un sondage
1. Une fois le sondage créé, vous êtes redirigé vers la page de vote
2. Cliquez sur "📋 Copier le lien" pour partager l'URL
3. Les participants peuvent voter en accédant au lien

### Voter
1. Accédez au lien du sondage
2. Sélectionnez votre/vos réponse(s)
3. Cliquez sur "✅ Voter"
4. Vous êtes redirigé vers les résultats

### Consulter les résultats
1. Depuis la page de vote, cliquez sur "📊 Voir les résultats"
2. Les résultats s'affichent sous forme de graphique en barres
3. Les données sont mises à jour en temps réel

## Stacks

### Architecture
- **Frontend** : HTML/CSS/JavaScript vanilla servi par Nginx
- **Backend** : Node.js avec Express.js
- **Base de données** : MongoDB
- **Containerisation** : Docker et Docker Compose
- **CI/CD** : GitHub Actions

## Comment contribuer

1. **Fork du projet** et clone de votre fork
```bash
git clone https://github.com/votre-username/SAE_Advenced_Deployment.git
```

2. **Créer une branche de fonctionnalité**
```bash
git checkout -b feature/nouvelle-fonctionnalite
```

3. **Développer et tester**
```bash
docker compose up --build
# Faire vos modifications
# Tester l'application
```

4. **Lancer les tests CI**
```bash
docker compose config --quiet  # Valider la configuration
docker compose build --no-cache  # Construire les images
```

### Structure du projet
```
├── backend/              # API Node.js
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Routes Express
│   └── index.js         # Point d'entrée
├── frontend/            # Interface web
│   ├── *.html          # Pages HTML
│   ├── config.js       # Configuration API
├── secrets/             # Identifiants MongoDB
├── .github/workflows/   # CI/CD GitHub Actions
├── docker-compose.yml   # Configuration services
└── Dockerfile          # Image backend
```

### Guidelines de contribution

#### Code
- Respecter l'indentation et le style existant
- Tester systématiquement toutes les fonctionnalités, nouvelles et anciennes

#### Commits
- Messages clairs et descriptifs
- Commits uniques (une fonctionnalité = un commit)
- Format : `type: description` (ex: `feat: ajout choix multiple`)

#### Pull Requests
- Description claire de la fonctionnalité
- Tests effectués et résultats
- Screenshots si modification UI
- Référencer les issues liées

### Idées d'améliorations
- [ ] Export des résultats en CSV
- [ ] Option de partages via réseaux sociaux en plus du lien direct
- [ ] Limitation dans le temps des sondages

### Contact
- DENIS Oscar
- MANGIN Adrien
- Projet S4-02 DACS 2024-2025
