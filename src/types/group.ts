export interface Todo {
  id: number;
  name: string;
  checked: boolean;
}

export interface ParamsTodo {
  id?: number;
  name?: string;
  checked?: boolean;
}

export interface Group {
  name: string;
  id: number;
  checked: boolean;
  todos: Todo[];
}

export interface PayloadCheckedGroup {
  id: number;
  checked: boolean;
}

export interface PayloadRenameGroup {
  id: number;
  name: string;
}

export interface PayloadAddTodo {
  id: number;
  todo: Todo;
}

export interface PayloadTodo {
  id: number;
  todo: ParamsTodo;
}
