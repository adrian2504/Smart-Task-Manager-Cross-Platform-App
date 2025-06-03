// src/hooks/TasksContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '../types';

// 1) Define state & action types:
interface State {
  tasks: Task[];
}

type Action =
  | { type: 'ADD';    payload: Task }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'REORDER'; payload: Task[] };

// 2) Reducer logic (same as before):
function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { tasks: [...state.tasks, action.payload] };

    case 'TOGGLE':
      return {
        tasks: state.tasks.map(t =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };

    case 'DELETE':
      return { tasks: state.tasks.filter(t => t.id !== action.id) };

    case 'REORDER':
      return { tasks: action.payload };

    default:
      return state;
  }
}

// 3) Context value shape:
type TasksContextType = {
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
};

// 4) Create the context:
const TasksContext = createContext<TasksContextType>({
  tasks: [],
  dispatch: () => {},
});

// 5) Convenience hook to read the context:
export const useTasks = () => useContext(TasksContext);

// 6) Provider component
export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });

  return (
    <TasksContext.Provider value={{ tasks: state.tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
