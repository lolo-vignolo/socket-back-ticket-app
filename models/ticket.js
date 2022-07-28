const { v4: uuidv4 } = require('uuid');

//cuando estan en pendietes agent and desk will be null, then qhen they become in assigned, agent and desk will be assigned.

class Ticket {
  constructor(lastNumber) {
    this.id = uuidv4();
    this.number = lastNumber;
    this.desk = null;
    this.employee = null;
  }
}

module.exports = Ticket;
