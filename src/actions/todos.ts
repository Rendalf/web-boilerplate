import {
  SimpleAction,
  PayloadAction,
  FailureAction,
} from 'types/actions'
import { Todo } from 'types/todos'

export const LOAD_TODOS: 'LOAD_TODOS' = 'LOAD_TODOS'
type LoadTodos = SimpleAction<typeof LOAD_TODOS>
export const loadTodos = (): LoadTodos => ({
  type: LOAD_TODOS,
})

export const LOAD_TODOS_SUCCESS: 'LOAD_TODOS_SUCCESS' = 'LOAD_TODOS_SUCCESS'
type LoadTodosSuccess = PayloadAction<typeof LOAD_TODOS_SUCCESS, Todo[]>
export const loadTodosSuccess = (todos: Todo[]): LoadTodosSuccess => ({
  type: LOAD_TODOS_SUCCESS,
  payload: todos,
})

export const LOAD_TODOS_FAILURE: 'LOAD_TODOS_FAILURE' = 'LOAD_TODOS_FAILURE'
type LoadTodosFailure = FailureAction<typeof LOAD_TODOS_FAILURE, number>
export const loadTodosFailure = (error: number): LoadTodosFailure => ({
  type: LOAD_TODOS_FAILURE,
  error,
})

type TodoAction =
  | LoadTodos
  | LoadTodosSuccess
  | LoadTodosFailure

export default TodoAction
