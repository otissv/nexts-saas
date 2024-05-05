type TypeOfProperty<T> = T[keyof T]
type Field = TypeOfProperty<ColumnDialogState>
