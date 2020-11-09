import Todo from 'domain/entities/Todo';
import TodoEntity from '../entities/TodoEntity';
import IEntityDataMapper from '../interfaces/IEntityDataMapper';

export default class AircraftDataMapper implements IEntityDataMapper<Todo, TodoEntity> {
  toDomain(entity: TodoEntity): Todo {
    return new Todo(entity.id, entity.text, entity.isDone);
  }

  toDalEntity(model: Todo): TodoEntity {
    return new TodoEntity();
  }
}
