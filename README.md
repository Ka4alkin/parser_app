
- Create DB in mongodb locally with name "parserApp"

- Execute DB commands below using MONGOSH_ e.g. to create basic collections, it is something like init endpoint

  so, run this step by step:

  -> use parserApp
  -> db.createCollection('posts')
     db.createCollection('roles')
     db.createCollection('user')
     db.roles.insertMany([
     {
     value: "USER"
     },
     {
     value: "ADMIN"
     }
     ])

- From server folder run server by -> npm i -> npm run dev

- From client folder run client by -> npm i -> npm run dev

- Register user admin/admin e.g. and log in to see result

- Сron events are triggered every next 30 seconds, so you will be able to see triggered posts from the RSS feed after 30 seconds


To sum up, It was wasted about 10-15 hours. I tried to fulfill the main points set in the test task, in case of lack of time I didn't do refactoring, so sorry for that:) and other improvements such as:
- ts typization
- code reuse
- smt. like loader using context API or Redux for post entity
- jest testing
- node.js best practises for better app scaling

