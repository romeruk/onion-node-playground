export default class Todo {
  private readonly id: number;
  private readonly text: string;
  private readonly isDone: boolean;

  constructor(id: number, text: string, isDone: boolean) {
    this.id = id;
    this.text = text;
    this.isDone = isDone;
  }

  get todoId() {
    return this.id;
  }

  get todoText() {
    return this.text;
  }

  get todoIsDone() {
    return this.isDone;
  }

  unmarshal() {
    return {
      id: this.id,
      text: this.text,
      isDone: this.isDone
    };
  }
}
