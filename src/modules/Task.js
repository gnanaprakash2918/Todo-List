export default class Task {
  constructor(name, dueDate = 'No Date') {
    this.name = name;
    this.dueDate = dueDate;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDate(date) {
    this.dueDate = date;
  }

  getDate() {
    return this.dueDate;
  }

  getDateFormatted() {
    const [day, month, year] = this.dueDate.split('/');
    return `${month}/${day}/${year}`;
  }
}
