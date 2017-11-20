import { combineEpics } from 'redux-observable'
import { LOAD_TODOS, loadTodosSuccess } from 'actions/todos'
import { AppEpic } from 'types'

const loadTodosEpic: AppEpic = action$ =>
  action$
    // TODO provide better typings tools
    .ofType(LOAD_TODOS)
    .delay(500)
    .map(() => loadTodosSuccess([
      {
        id: '1',
        body: 'Todo #1',
        isCompleted: false,
      },
      {
        id: '2',
        body: 'Todo #2',
        isCompleted: false,
      },
      {
        id: '3',
        body: 'Todo #3',
        isCompleted: true,
      },
    ]))

export default combineEpics(
  loadTodosEpic,
)
