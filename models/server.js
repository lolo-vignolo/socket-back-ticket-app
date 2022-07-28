const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { ok } = require('assert');

class Server {
  constructor(port) {
    this.port = port;
    this.app = express();
    //creo el http server
    this.serverSocket = http.createServer(this.app);
    //socket config
    this.io = socketio(this.serverSocket, {
      /*Config adicionales */
    });

    this.sockets = new Sockets(this.io);
  }

  middleware() {
    //deplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    //CORS -- Esti me sirve cuando mi app va aestar trabajando en dominios differentes. Por ejemplo en puerto 3000 back y 8080 en front
    this.app.use(cors());

    //middleware para REST INFO INICIAP PARA FRONT

    this.app.get('/information', (req, res) => {
      res.json({
        ok: true,
        ultimos: this.sockets.tiketList.last13Tickets,
      });
    });
  }

  // SE INICIALIZA EN EL CONSTRUCTOR
  // //congiguracion de socket para inicio de chat
  // configSocket() {
  //   new Sockets(this.io);
  // }

  //este start se llama en index.js
  start() {
    //inicializa el middleware
    this.middleware();

    {
      /*
    COMO ESTOY HACIENDO UN API-REST Y NECESITO INFORMACION DEL NUEVO SOCKET, LO INICIALIZO EN EL CONSTRUCTOR
    //inicializa el socket
    this.configSocket(); */
    }
    //inicializa el server
    this.serverSocket.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
