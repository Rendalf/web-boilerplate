import { Reducer } from 'types'
import { TodoState } from 'types/todos'
import {
  LOAD_TODOS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
} from 'actions/todos'

const DEFAULT_TODOS_STATE: TodoState = {
  isLoading: false,
  loadingError: null,
  userTodos: null,
}
const todosReducer: Reducer<TodoState> = (state = DEFAULT_TODOS_STATE, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return {
        ...state,
        isLoading: true,
      }

    case LOAD_TODOS_SUCCESS:
      return {
        userTodos: action.payload,
        isLoading: false,
        loadingError: null,
      }

    case LOAD_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadingError: action.error,
      }

    default:
      return state
  }
}

export default todosReducer
