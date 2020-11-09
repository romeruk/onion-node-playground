import 'reflect-metadata';
import { Repository as TypeOrmRepository } from "typeorm";
import { AsyncContainerModule, Container } from 'inversify';

import { TYPES as DAL_TYPES } from 'dal/types';
import { TYPES as DOMAIN_TYPES } from 'domain/types';
import TodoEntity from "dal/entities/TodoEntity";
import { getDbConnection, getRepository } from 'dal/typeorm';
import TodoRepository from 'dal/repositories/TodoRepository';

const bindings = new AsyncContainerModule(async (bind) => {
  await getDbConnection();
  bind<TypeOrmRepository<TodoEntity>>(DAL_TYPES.TypeOrmRepositoryOfTodoEntity)
    .toDynamicValue(() => getRepository())
    .inRequestScope();
  bind<TodoRepository>(DOMAIN_TYPES.TodoRepository).to(TodoRepository);
});

export const getContainer = async () => {
  const container = new Container();
  await container.loadAsync(bindings);
  return container;
};
