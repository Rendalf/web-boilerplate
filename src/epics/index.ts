import { combineEpics } from 'redux-observable'
import todosEpic from 'epics/todos'

export default combineEpics(
  todosEpic,
)
