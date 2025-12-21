import TaskList from './components/TaskList.jsx';
import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

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

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const getTaskAPI = (id) => {
  return axios.get(`${kbaseURL}/task/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete ? apiTask.is_complete: false,
    description: apiTask.description ? apiTask.description : 'Unknown',
    goalId: apiTask.goal_id ? apiTask.goal_id : null,
  };
  return newTask;
};

const markTaskCompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
  .catch(error => console.log(error));
};

const markTaskIncompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .catch(error => console.log(error));
};

const App = () => {
  const [tasksData, updateTasks] = useState(TASKS);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(convertFromAPI);
        updateTasks(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const markTaskCompleted = (id) => {
    const task = tasksData.find(task => task.id === id);
    if (!task) return;

    return (
      task.isComplete
        ? markTaskIncompleteAPI(id)
        : markTaskCompleteAPI(id)
    ).then(() => {
      updateTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? { ...task, isComplete: !task.isComplete }
            : task
        )
      );
    }).catch(error => console.log(error));
  };


  const deleteTask = (taskId) => {
    const tasks = tasksData.filter(task => {
      if (task.id === taskId) {
        return false;
      } else {
        return true;
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
        <div>{<TaskList tasks={tasksData} onTaskToggleComplete={markTaskCompleted} onTaskToggleDelete={deleteTask}/>}</div>
      </main>
    </div>
  );
};

export default App;
