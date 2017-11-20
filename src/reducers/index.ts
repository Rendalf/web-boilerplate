import { combineReducers } from 'redux'
import { State } from 'types/state'
import todosReducer from 'reducers/todos'

const reducer = combineReducers<State>({
  todos: todosReducer,
})

export default reducer
