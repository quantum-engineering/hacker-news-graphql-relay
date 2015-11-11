# Hacker news GrapqhQL interface with relay on the client


## How to build the project

1. `npm i`
2. `npm run update-schema`
3. `npm run build`
4. `npm start` (default host is `4040`);

**Development**

- `npm start` (starts the node server)
- `npm run watch` (watches for client-side changes)

**SCHEMA**

Whenever you make a change to the schema, please stop the server and run:

```
npm run update-schema
```

**NOTES**

1. it's a bit slow because i'm fetching ALL of the top stories (like everything)
2. I need to update the react dependencies
