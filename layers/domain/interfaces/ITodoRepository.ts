import IRepository from './IRepository';
import Todo from '../entities/Todo';

export default interface ITodoRepository extends IRepository<Todo> {
  createTodo(text: string, isDone: boolean): Promise<Todo>
  updateTodo(id: string, text: string, isDone: boolean): Promise<Todo>
  removeTodo(id: string): Promise<String>
}
