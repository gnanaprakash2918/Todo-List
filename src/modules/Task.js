export default class Task {
  constructor(
    name,
    dueDate = 'No Date',
    description = '',
    note = '',
    completionStatus = false,
    priority
  ) {
    this.name = name;
    this.dueDate = dueDate;
    this.isCompleted = completionStatus;
    this.priority = priority;
    this.note = note;
    this.description = description;
  }

  // Name
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Due Date
  setDate(date) {
    this.dueDate = date;
  }

  getDate() {
    return this.dueDate;
  }

  // Completion Status
  getCompletionStatus() {
    return this.isCompleted;
  }

  setCompletionStatus(status) {
    this.isCompleted = status;
  }

  // Priority
  // 0 -> Low, 1 -> Normal, 2 -> High
  getPriority() {
    return this.priority;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  // Note
  getNote() {
    return this.note;
  }

  setNote(note) {
    this.note = note;
  }

  // Description
  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  // Get Formatted Date
  getDateFormatted() {
    const [day, month, year] = this.dueDate.split('/');
    return `${month}/${day}/${year}`;
  }
}
