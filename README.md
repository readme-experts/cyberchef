# Cyberchef

## It is api that does CRUD operations on food recipes. Cyberchef has built in pasrer that can parse recipes from web.
### 


#### To work with DB properly, create config.json file in src/database/config :
```.
"db_host": "your hosting",
"db_user": "your username",
"db_database": "your db name",
"db_password": "your db pass"
```

#### To properly work with server create .env file in src/api
```.
PORT = 3000 || any other port
JWT_ACCESS_SECRET = "your secret key"
```

#### To generate prisma client
```bash
npx prisma generate --schema=./src/database/prisma/schema.prisma
```

#### To start parser:
```bash
/src/parser/ node index.js
```

#### To start server:
```bash
/src/api/ npm run dev
```


### Technology stack
* Parser - NodeJS
* Frontend - VueJs
* Backend - Express 
* Database - MySQL


### License
This program is distributed under an MIT License.
