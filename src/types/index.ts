import Action from 'actions'
import { Epic } from 'redux-observable'
import { State } from 'types/state'

export type Reducer<TState> = (state: TState | undefined, action: Action) => TState

export type AppEpic = Epic<Action, State>
