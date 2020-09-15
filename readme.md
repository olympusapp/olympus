Olympus is a **ultra-fast** and **secure** **self-hosting** file server. Designed to be used across devices in a local network.

Made using:
- TypeScript
- Express
- sqlite3
- JWT

Features:
- Registration and logging
- It's API can be used for clients

Clients:
- [Web Client](https://github.com/olympusapp/webclient)
- [Mobile Client](https://github.com/olympusapp/mobileclient)

## Wanna try it?

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
```

Now run:
```shell
start:server
```

The server is now working! You can now connect via a client, for example the [WebClient](https://github.com/olympusapp/webclient)