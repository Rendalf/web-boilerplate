import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { Provider } from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import { State } from 'types/state'
import reducer from 'reducers'
import epic from 'epics'
import App from 'components/App'

const epicMiddleware = createEpicMiddleware(epic)
const composeEnhancers: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store: Store<State> = composeEnhancers(
  applyMiddleware(epicMiddleware)
)(createStore)(reducer)

const rootId = 'app-root'
const rootNode = document.getElementById(rootId)

if (rootNode) {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    rootNode
  )
} else {
  throw new Error(`Can't find #${ rootId }`)
}

// TODO implement react-hot-loader working
