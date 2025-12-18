import TaskList from './components/TaskList.jsx';
import { useState } from 'react';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasksData, updateTasks] = useState(TASKS);

  const toggleComplete = (taskId) => {
    const tasks = tasksData.map(task => {
      if (task.id === taskId) {
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
    });
    updateTasks(tasks);
  };

  const deleteTask = (taskId) => {
    const tasks = tasksData.map(task => {
      if (task.id === taskId) {
        return {};
      } else {
        return task;
      }
    });
    updateTasks(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasksData} onTaskToggleComplete={toggleComplete} onTaskToggleDelete={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
