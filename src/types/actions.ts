export type SimpleAction<TActionType extends string> = {
  type: TActionType
}

export type PayloadAction<TActionType extends string, TPayload> = SimpleAction<TActionType> & {
  payload: TPayload
}

export type FailureAction<TActionType extends string, TError> = SimpleAction<TActionType> & {
  error: TError
}
