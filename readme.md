Olympus is a **ultra-fast** and **secure** **self-hosted** server. Designed to be used across devices in a local network.

Made using:
- TypeScript
- Express
- sqlite3
- JWT

Features:
- Registration and logging
- Flexible API
- Scalable and modulable

Clients:
- [Web Client](https://github.com/olympusapp/webclient)
- [Mobile Client](https://github.com/olympusapp/mobileclient)

## Compiling

Clone the repository:
```shell
git clone https://github.com/olympusapp/olympus --depth 1
```

Enter the folder.

Install the dependencies:
```shell
npm install
```

Create a file, named '.env'. This will specify some important values used in the server.

Example:

```
ROOT_PASSWD = 'secret'
SERVER_NAME = 'cool'
SERVER_PORT = '4000'
MEMORIA_DRIVE = './dummy'
```

**Note**: You should create the folder you specified in MEMORIA_DRIVE.

Now run:
```shell
start
```

The server is now working! You can now connect via a client, for example the [WebClient](https://github.com/olympusapp/webclient)