import { PomodoroTimer } from './components/pomodoro-timer';
import ToDoList from './components/to-do-list';

function App() {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={1500}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
      <ToDoList />
    </div>
  );
}

export default App;
