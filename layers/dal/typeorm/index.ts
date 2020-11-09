import { createConnection, getConnection } from 'typeorm';

import TodoEntity from '../entities/TodoEntity';

export function getDbConnection() {
  const entities = [
    TodoEntity
  ];

  return createConnection({
    type: 'sqlite',
    database: './solid-onion.sqlite',
    entities,
    synchronize: true,
  });
}

export const getRepository = () => getConnection().getRepository(TodoEntity);
