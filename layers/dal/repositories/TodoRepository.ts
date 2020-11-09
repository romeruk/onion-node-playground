import { inject, injectable } from 'inversify';
import { Repository as TypeOrmRepository } from 'typeorm';

import Todo from 'domain/entities/Todo';
import ITodoRepository from 'domain/interfaces/ITodoRepository';

import { TYPES } from '../types';
import TodoEntity from '../entities/TodoEntity';
import TodoDataMapper from '../data-mappers/TodoDataMapper';
import GenericRepository from '../repositories/GenericRepository';

@injectable()
export default class TodoRepository
    extends GenericRepository<Todo, TodoEntity>
    implements ITodoRepository {

    public constructor(
        @inject(TYPES.TypeOrmRepositoryOfTodoEntity) repository: TypeOrmRepository<TodoEntity>
    ) {
        super(repository, new TodoDataMapper());
    }

    async createTodo(text: string, isDone: boolean) {
      const newTodo = new TodoEntity();
      newTodo.isDone = isDone;
      newTodo.text = text;
      const todo = await this._repository.save(newTodo);

      return this._dataMapper.toDomain(todo);
    }

    async updateTodo(id: string, text: string, isDone: boolean) {
      const findTodo = await this._repository.findOne(id);
      findTodo.isDone = isDone;
      findTodo.text = text;
      
      const todo = await this._repository.save(findTodo);

      return this._dataMapper.toDomain(todo);
    }

    async removeTodo(id: string) {
      const findTodo = await this._repository.findOne(id);
      await this._repository.remove(findTodo);
      return `${id} deleted`
    }
}
