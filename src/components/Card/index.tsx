import { Todo } from '../to-do-list';
import './style.css';

type CardProps = {
  todo: Todo;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function Card({ todo, completeTodo, deleteTodo }: CardProps) {
  function handleCompleteTodo() {
    completeTodo(todo.id);
  }

  function handleDeleteTodo() {
    deleteTodo(todo.id);
  }

  return (
    <div className={`card ${todo.completed ? 'done' : ''}`}>
      <div className="card-buttons">
        <button onClick={handleCompleteTodo}>
          {todo.completed ? (
            <span className="material-symbols-outlined check">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined">
              radio_button_unchecked
            </span>
          )}{' '}
        </button>
        <button onClick={handleDeleteTodo}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <h3>{todo.title}</h3>
    </div>
  );
}
