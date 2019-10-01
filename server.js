// Imports externos
const http = require('http');

//Import internos
const application = require('./server/app');

//Declarações
const server = http.createServer(application);

server.on('listening', () => console.log('Servidor Online !'));
server.on('error', (err) => console.log(err));

server.listen(3000);