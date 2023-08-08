# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/) install Docker.

## Downloading

```
git clone {repository URL}
```

## Composing docker containers

Run inside repository root:

```
docker-compose up
```
If command is exiting with ERR_SOCKET_TIMEOUT **retry the command.**  
It can take up to 10 min to fully download and install packages.

## Running application

After composing both containers should be running.

Application should restart after changes in `/src` folder.

DB migrations should run **automatically**, but you can trigger
them manually with `npm run migration:run` (or with `docker exec web-server npm run migration:run` for running container)

DB logs are stored in `home-lib-service_db-data` volume, DB data is stored in `home-lib-service_db-logs` volume.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stopping application

```
docker-compose down   
```

## Deleting images & volumes

**Deleting images:**

```
docker image rm home-lib-service-web-server 
docker image rm home-lib-service-db
```

**Deleting volumes:**

```
docker volume rm home-lib-service_db-data
docker volume rm home-lib-service_db-logs
```


## Vulnerability scanning

You can scan for vulnerabilities using `docker scout` (container should be built). Run scanner with:

```
npm run scout:scan
```

## Testing

After both containers are running you can open new terminal tab
and connect to server container and start testing with following commands:

To run all tests without authorization

```
docker exec web-server npm run test 
```

To run only one of all test suites

```
docker exec web-server npm run test -- <path to suite>
```

To run all test with authorization

```
docker exec web-server npm run test:auth
```

To run only specific test suite with authorization

```
docker exec web-server npm run test:auth -- <path to suite>
```

Alternatively you can use Docker Desktop app and select:

`Containers -> home-lib-service -> web-server -> Terminal`

After that you can input `npm run test` into terminal field to run all tests.