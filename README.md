# Project Setup Instruction
## Initial Step
- npm init -y
## Package Install
- npm i express dotenv pg @prisma/client @prisma/adapter-pg

## For Development
- npm i prisma --save-dev
- npm i -D nodemon

```
DATABASE_URL = "postgresql://user:password@host:port/databaseName?schema=public"
```
## Podman Compose command
### To build, pull image and start container 
- podman compose up
### To build, pull image and start container but silently
- podman compose up -d
- 
# Prisma Setup Steps
- npx prisma init
- npx prisma migrate dev --name create_students_table
### to visualize the database tables
- npx prisma studio 

### Note: if table already exists when migrating then
- npx prisma migrate reset

### Generating prisma client code
- npx prisma generate