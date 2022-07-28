const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.tiketList = new TicketList();
  }

  socketEvents() {
    //on conecta el socket
    this.io.on('connection', (socket) => {
      console.log('a user connected');
      //escuchar (recibir /enviar) envento: mensaje-to-server
      socket.on('mensaje-to-server', (data) => {
        console.log(data.texto);
        this.io.emit('mensaje-from-server', data);
      });

      //socket io puese recibir dos argumentos, primero es la data, que va a estar relacionado a lo que el front me envía.
      //segunfoes un callback el cual se disparara en el fron solo y solo si fue deflarado en el back. En esete caso lo uso para que el
      //fornt tengo el ticket creado
      socket.on('askTicket', (data, callback) => {
        const newTicket = this.tiketList.crearTicket();
        callback(newTicket);
      });

      socket.on('restart', () => {
        this.tiketList.restart();
      });

      socket.on('assignTicket', ({ employee, desk }, callback) => {
        const infoForCustomer = this.tiketList.asignNextTicket(employee, desk);
        callback(infoForCustomer);

        // pr ser un get no lleva parentesis, no es un metodo

        this.io.emit('assignTickets', this.tiketList.last13Tickets);
      });
    });
  }
}

module.exports = Sockets;
