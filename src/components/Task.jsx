import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onToggleComplete, onToggleDelete }) => {
  const taskMarkCompleteOnClick = () => {
    onToggleComplete(id);
  };
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const deleteTaskOnClick = () => {
    onToggleDelete(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => taskMarkCompleteOnClick()}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTaskOnClick()}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func,
  onToggleDelete: PropTypes.func
};

export default Task;
