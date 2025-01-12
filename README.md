#Tyria Tracker Backend

Welcome to the Tyria Tracker Backend.
This is where the applications stores the all the data coming from the Guild Wars 2 API in a Database using Prisma, as well as handeling all requests coming from the front end.
It has a complete login system utilizing JWT and bcrypt to securely store passwords and authenticate users.

How to run :

  - Clone repository to local machine
  - In `schema.prisma` change the `datasource db` to
    `datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }`
  - If you have a migrations folder go ahead and delete that
  - Then run `npm i`
  - Run `npx prisma geneate`
  - Run `npx prisma migrate dev`
  - If ts-node is not installed go ahead and install that and then run `npx ts-node src/utils/tils.ts` and this will initialize the Database.
    (this will take some time and also throw a bunc of errors towards the end, that is because the Typescript wrapper for the Guildwars 2 api that I am using
     is not up to date with the most recent expansion of the game)
  - from here everything should be set up correctly and you can run `npx nodemon` which will launch a local backend server


If you followed the front end setup guide you can now properly browse the page locally. On issue with that is since you just created a fresh database the Tradingpost item view will not show you any data besides what it fetched while you had it running.
