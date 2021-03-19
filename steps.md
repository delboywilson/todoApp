mkdir todo
cd todo
touch app.js
npm init
git init
npm i -s express ejs express-ejs-layouts pg pg-promise morgan dotenv
npm i --save-dev nodemon

touch README.md
touch .gitignore
tocuh .env
touch database.js
touch config.js

add node_modules and .env to .gitignore

create views folder with pages and partials sub folders
create public, routes and sql folders

create views/layout.ejs, views/pages/index.ejs, views/partials/header.ejs, views/partials/footer.ejs

create routes/index/js, public/main.css

create sql/create-database.sql, sql/create-table.sql, sql/seed-table.sql

add scripts to package.json to run nodemon and sql files

define variables in app.js to require and use dependencies

create server

write route routers in app.js

write basic layout file and include body & partials

start writing in the index files - test server is working first up then continue
