import React, { createContext, useContext, useReducer } from 'react';

export type Task = {
  id: string;
  title: string;
  due?: string;                 // YYYY-MM-DD
  notes?: string;
  category?: string;
  comment?: string;
  imageUri?: string;
  status?: 'not_started' | 'in_progress' | 'done';
  done: boolean;
};

type State = { tasks: Task[] };

type Action =
  | { type: 'ADD'; payload: Task }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'STATUS'; id: string; status: Task['status'] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return { tasks: [action.payload, ...state.tasks] };
    case 'TOGGLE':
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case 'DELETE':
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'STATUS':
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: action.status } : t
        ),
      };
    default:
      return state;
  }
};

const TasksContext = createContext<ReturnType<typeof useInternal> | null>(null);
function useInternal() {
  return useReducer(reducer, { tasks: [] });
}

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useInternal();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used inside <TasksProvider>');
  const [state, dispatch] = ctx;
  return { tasks: state.tasks, dispatch };
};
