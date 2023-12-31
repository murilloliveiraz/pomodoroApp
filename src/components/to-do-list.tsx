import { ChangeEvent, useEffect, useState } from 'react';
import Card from './Card';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export function ToDoList(): JSX.Element {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('@codersList:todos');

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@codersList:todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    setTodos((previousTodos) => [
      ...previousTodos,
      { id: Math.random(), title: todoInput, completed: false },
    ]);

    setTodoInput('');
  }

  function completeTodo(id: number) {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed },
      ),
    );
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoInput(e.target.value);
  }

  function deleteTodo(id: number) {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input
          placeholder="Adicione uma Tarefa"
          value={todoInput}
          onChange={handleInputChange}
        />
        <button onClick={addTodo} className="button">
          <span className="material-symbols-outlined">add</span>
        </button>
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
