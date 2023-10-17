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
      <h2>{todo.title}</h2>

      <div className="card-buttons">
        <button onClick={handleCompleteTodo}>
          {todo.completed ? 'retomar' : 'completar'}{' '}
        </button>
        <button onClick={handleDeleteTodo}>deletar</button>
      </div>
    </div>
  );
}
