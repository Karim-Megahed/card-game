# card-game

Setup guide:

1. create `.env` file and copy keys from `.env.example` and fill in your SQL DB credentials

In your teminal run the following commands:

2. `npm i`

3. `npx sequelize-cli db:create` in order to create DB with the name provided to `DB_DATABASE` in `.env`

4. `npx sequelize-cli db:migrate`

5. `npx sequelize-cli db:seed:all`

6. `npm run dev` for running the server

7. `npm run test` for running tests




PS: it's been a while since I wrote node and it's my first time writing typescript :)
