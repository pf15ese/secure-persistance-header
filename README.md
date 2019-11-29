# Persistance-Allowed Header Prototype

A small sample Node project (using the node-rasp runtime) to present
the **Persistance-Allowed** header.

## Setup

Using the docker image:
```
docker build -t persistance-allowed
docker run --rm -p 8080:8080 persistance-allowed 
```

Then you cann access the api at http://localhost:8080

## Sample-Request
Login as a user, but deny to log the request:

```

curl -H "Content-Type: application/json" -H "Persistance-Allowed: none" -d '{"username": "user", "password": "asdf"}' -X POST http://localhost:8080/login

```

By default the used logger middleware logs the whole request body.  
For this request the logger will deny any logging, since it respects the **Persistance-Allowed: none**
header that forbids logging the request body.