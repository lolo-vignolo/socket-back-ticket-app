const Ticket = require('./ticket');

class TicketList {
  constructor() {
    // arranca de cero, por que next number ya suma uno
    this.lastNumber = 0;
    // sera una collección de tickets
    this.pendientes = [];
    this.assigned = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  // tres que se ven y 10 que se vieron
  get last13Tickets() {
    return this.assigned.slice(0, 10);
  }

  // creo un nuevo ticket. usando la clase, tener en cuenta que se le debe pasasr un numero. Alli llamo al method que asigna el sigueinte numero
  crearTicket() {
    const newTicket = new Ticket(this.nextNumber);

    this.pendientes.push(newTicket);
    return newTicket;
  }

  restart() {
    this.pendientes = [];
    this.assigned = [];
    this.lastNumber = 0;
  }

  asignNextTicket(employee, desk) {
    if (this.pendientes.length === 0) {
      return null;
    }

    //uso shift por que toma el primero del array, es como que agarras al primero de la cola y lo pasas a la otra cola, o al escritorio

    const newTicket = this.pendientes.shift();
    console.log(employee, desk);

    newTicket.employee = employee;
    newTicket.desk = desk;

    //aca se usa unshift por que ingresa el nuevo cliente al primer lugar del array, losultimos lugares iran desaparenciendo d ela pantalla
    this.assigned.unshift(newTicket);

    return newTicket;
  }
}

module.exports = TicketList;
