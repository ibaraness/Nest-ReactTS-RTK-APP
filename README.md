# NestJs with React and RTK User and Posts App #

The app will display a single containing a table of users, a list of posts, and a form that allows users to create new posts.

**requirements:**
* Docker

**Instructions:**\
\
In the topmost folder, where the docker-compose file is, find "test.env" file and rename it to ".env" file. 
Composer will use this file to set the environment variables for the app:

You can change the POSTGRES_USER and POSTGRES_PASSWORD values if you like.

```
# .env file
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pass12345
POSTGRES_DATABASE=postgres
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
```
After doing that, you can run the app on the terminal running:
```
docker compose up
```

If all is running successfully, you should be able to view the app in your browser in the following address:
```
http://localhost:8080/
```
As you navigate and use the app, you can view the logs on the terminal (while the app is running)

To stop the app, just press on 'ctrl' + 'c' keys on the terminal.
