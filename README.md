# Graphql test project
Basically a small project that I made in a couple hours to test gql

## Parts
/server: \
The server folder, connects to database as specified in /server/prisma/.env

/client: \
The react client folder

/common: \
Shared code between server and client. If server and client are separate repositories, then this folder would be a shared submodule

/testdb: \
A quick docker compose script for launching the database server used to run this. When creating the server, make sure you also create a database called "testdb", a user called "yui" with password "pass".

## Commands
`yarn server start`: starts the server \
`yarn server debug`: starts the server with a debug port open \
`yarn client start`: starts the react app \
`yarn server gql || yarn client gql || yarn gql`: runs gql codegen for that respective package \
`yarn lint-fix`: runs tslint fix on the entire project, because I have ocd or something idk 

## Other
Tested on node.js v14.6.0
