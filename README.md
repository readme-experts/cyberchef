# Cyberchef

## It is API that does CRUD operations on food recipes. Cyberchef has built in parser that can parse recipes from the web.

#### To properly work with server and database create .env file in root folder
```
PORT = 3000 || any other port
JWT_ACCESS_SECRET = "your secret key"
DATABASE_URL = "your connecting string"
```

#### To start parser:
```bash
/src/parser/ node index.js
```

#### To start server:
```bash
npm run start
```

#### All scripts: 
* `npm run installDependencies` - install dependencies
* `npm run preinstall` - generates prisma client and install dependencies
* `npm run start:dev` - starts nest server in dev mode
* `npm run start` - Builds server and client and starts in production mode


### Technology stack
* Parser - NodeJS
* Frontend - ReactJS & Redux
* Backend - NestJS 
* Database - PostgreSQL


### License
This program is distributed under an MIT License.
