import * as React from 'react'
import { connect } from 'react-redux'
import * as cn from 'classnames'
import * as styles from 'styles/App.css'
import { Todo } from 'types/todos'
import { State } from 'types/state'
import { loadTodos } from 'actions/todos'

type AppStateProps = {
  todos: Todo[]
  isTodosLoading: boolean
}

type AppDispatchProps = {
  loadTodos: () => void
}

type AppProps = AppStateProps & AppDispatchProps

class AppComponent extends React.Component<AppProps> {
  componentDidMount () {
    const { isTodosLoading, todos, loadTodos } = this.props
    if (todos.length === 0 && !isTodosLoading) {
      loadTodos()
    }
  }

  render () {
    const { todos, isTodosLoading } = this.props

    if (isTodosLoading) {
      return (
        <span>Loading...</span>
      )
    }

    return (
      <ol>
        { todos.map(todo => (
          <li key={ todo.id }
            className={ cn(styles.todoItem, {
              [styles.todoItemCompleted]: todo.isCompleted,
            }) }
          >
            { todo.body }
          </li>
        )) }
      </ol>
    )
  }
}

const mapStateToProps = (state: State): AppStateProps => ({
  isTodosLoading: state.todos.isLoading,
  todos: state.todos.userTodos || [],
})

const mapDispatchToProps: AppDispatchProps = {
  loadTodos,
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent)
export default App
