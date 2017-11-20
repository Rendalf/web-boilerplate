export type TodoId = string
export type Todo = {
  id: TodoId
  body: string
  isCompleted: boolean
}

export type TodoState = {
  isLoading: boolean
  userTodos: Todo[] | null
  loadingError: number | null
}
