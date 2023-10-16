import { ChangeEvent, useState } from 'react';
import Card from './Card';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export function ToDoList(): JSX.Element {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: Math.random(), title: todoInput, completed: false },
    ]);

    setTodoInput('');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed },
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input
          placeholder="Fazer café"
          value={todoInput}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      {todos.map((todo) => (
        <Card
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      ))}
    </div>
  );
}

export default ToDoList;
