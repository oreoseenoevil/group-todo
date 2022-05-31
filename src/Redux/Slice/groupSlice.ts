import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group, PayloadAddTodo, PayloadCheckedGroup, PayloadTodo, PayloadRenameGroup } from 'types/group';

interface GroupsState {
  groups: Group[];
}

const initialState: GroupsState = {
  groups: []
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroup: (state, { payload }: PayloadAction<Group>) => {
      state.groups = [...state.groups, payload];
    },
    setCheckGroup: (state, { payload }: PayloadAction<PayloadCheckedGroup>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.checked = payload.checked;
            group.todos = [
              ...group.todos.map((item) => {
                item.checked = payload.checked;
                return item;
              })
            ];
          }

          return group;
        })
      ];
    },
    deleteGroup: (state, { payload }: PayloadAction<number>) => {
      state.groups = [...state.groups.filter((group) => group.id !== payload)];
    },
    renameGroup: (state, { payload }: PayloadAction<PayloadRenameGroup>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.name = payload.name;
          }

          return group;
        })
      ];
    },
    addTodo: (state, { payload }: PayloadAction<PayloadAddTodo>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.todos = [...group.todos, payload.todo];
          }

          return group;
        })
      ];
    },
    checkTodo: (state, { payload }: PayloadAction<PayloadTodo>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.todos = [
              ...group.todos.map((item) => {
                if (item.id === payload.todo.id) {
                  item.checked = payload.todo.checked!;
                }

                return item;
              })
            ];
          }

          return group;
        })
      ];
    },
    deleteTodo: (state, { payload }: PayloadAction<PayloadTodo>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.todos = [...group.todos.filter((item) => item.id !== payload.todo.id)];
          }

          return group;
        })
      ];
    },
    updateTodo: (state, { payload }: PayloadAction<PayloadTodo>) => {
      state.groups = [
        ...state.groups.map((group) => {
          if (group.id === payload.id) {
            group.todos = [
              ...group.todos.map((item) => {
                if (item.id === payload.todo.id) {
                  item.name = payload.todo.name!;
                }
                return item;
              })
            ];
          }

          return group;
        })
      ];
    }
  }
});

export const { setGroup, setCheckGroup, deleteGroup, renameGroup, addTodo, checkTodo, deleteTodo, updateTodo } =
  groupSlice.actions;
export default groupSlice.reducer;
