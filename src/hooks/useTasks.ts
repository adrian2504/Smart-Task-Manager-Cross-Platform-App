import { useReducer } from 'react';
import { Task } from '../types';
interface State { tasks: Task[] }
type Action = { type: 'ADD'; payload: Task } | { type: 'TOGGLE'; id: string } | { type: 'DELETE'; id: string } | { type: 'REORDER'; payload: Task[] };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': return { tasks: [...state.tasks, action.payload] };
    case 'TOGGLE': return { tasks: state.tasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
    case 'DELETE': return { tasks: state.tasks.filter(t => t.id !== action.id) };
    case 'REORDER': return { tasks: action.payload };
    default: return state;
  }
}
export default function useTasks() { const [state, dispatch] = useReducer(reducer, { tasks: [] }); return { tasks: state.tasks, dispatch }; }
