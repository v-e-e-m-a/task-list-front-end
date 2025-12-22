import { useState } from "react";
import PropTypes from 'prop-types';

const defaultTaskData = {
  'title': '',
};

const NewTaskForm = ( props ) => {
  const [taskData, setTaskData] = useState(defaultTaskData);

  const handleChange = (e) => {
    setTaskData(oldData => ({ ...oldData, 'title': e.target.value }));
  };


  const submitNewTask = (e) => {
    e.preventDefault();
    props.onAddTaskCallback(taskData);
    setTaskData(defaultTaskData);
  };

  return (
    <form onSubmit={submitNewTask}>
      <div>
        <label htmlFor="taskInput">Enter new task:</label>
        <input id="taskInput" name="taskInput" value={taskData.title} onChange={handleChange}></input>
      </div>
      <input type="submit" value="Add Task"></input>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTaskCallback: PropTypes.func
};

export default NewTaskForm;

