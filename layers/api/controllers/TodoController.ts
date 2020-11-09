import { inject } from 'inversify';
import * as express from "express";
import { controller, httpGet, response, requestParam, httpPost, requestBody, httpPut, httpDelete } from 'inversify-express-utils';

import { TYPES } from 'domain/types';
import ITodoRepository from 'domain/interfaces/ITodoRepository';

@controller('/api/v1/todo')
export default class TodoController {
  @inject(TYPES.TodoRepository) private readonly _todoRepository: ITodoRepository;

  @httpGet('/')
  public async get(@response() res: express.Response) {
    const items = await this._todoRepository.readAll();
    return items.map(item => item.unmarshal());
  }
  
  @httpGet('/:id') 
  public async getOne(@requestParam('id') id: string) {
    const item = await this._todoRepository.readOneById(id);
    return item.unmarshal();
  }

  @httpPost('/') 
  public async createTodo(@requestBody() body) {
    const item = await this._todoRepository.createTodo(body.text, body.isDone);
    return item.unmarshal();
  }

  @httpPut('/:id')
  public async updateTodo(@requestParam('id') id: string, @requestBody() body) {
    const item = await this._todoRepository.updateTodo(id, body.text, body.isDone);
    return item.unmarshal();
  }

  @httpDelete('/:id')
  public async deleteTodo(@requestParam('id') id: string) {
    return await this._todoRepository.removeTodo(id);
  }
}
