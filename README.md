### Mongodb concepts in depth

## configuration

1. create a .env file in root folder
2. create MONGO_DB_URI=<mongodb_connection_string>
3. run npm install in root folder.
4. now you can run any server.js file in the nested folders.

### 📋 Common Options and Their Descriptions

| Option                  | Description                                                                |
| ----------------------- | -------------------------------------------------------------------------- |
| `retryWrites=true`      | Retries failed write operations automatically. Recommended for most apps.  |
| `w=majority`            | Acknowledges writes only after majority of replica set confirms.           |
| `readPreference`        | Chooses which node to read from: `primary`, `secondary`, or `nearest`.     |
| `tls=true`              | Enforces TLS encryption. Use this for secure connections.                  |
| `authSource=admin`      | Specifies which DB to authenticate against. Often used for custom DB auth. |
| `connectTimeoutMS=3000` | Time in milliseconds to wait before connection attempt times out.          |
| `socketTimeoutMS=45000` | Timeout for idle socket connections.                                       |
| `maxPoolSize=50`        | Sets max number of concurrent connections. Useful for high concurrency.    |
| `minPoolSize=5`         | Sets minimum number of connections maintained in the pool.                 |
| `maxIdleTimeMS=30000`   | How long a connection can be idle before it’s closed.                      |
| `retryReads=true`       | Retries reads after transient network errors. Similar to `retryWrites`.    |

---

## concurrency control testing

- we are using autocannon package
- in one terminal instance 
```npm run concurrency```
```npx autocannon -c 100 -d 10 http://localhost:3000/increment```
