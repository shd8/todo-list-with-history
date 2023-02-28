import React, { useState } from 'react';
import './style.css';
import { useAppSelector, useAppDispatch } from './store';
import {
  addTask,
  deleteTasks,
  goBackInHistory,
  goNextInHistory,
} from './store/tasks.slice.js';
import Task from './components/Task';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const dispatch = useAppDispatch();

  const tasks = useAppSelector(({ tasks }) => tasks.tasks);
  const versionInUse = useAppSelector(
    ({ tasks }) => tasks.history.versionInUse
  );
  const maxVersion = useAppSelector(({ tasks }) => tasks.history.maxVersion);

  const onChangeTitle = ({ target }) => {
    const { value } = target;
    setTaskTitle(value);
  };

  const onChangeDescription = ({ target }) => {
    const { value } = target;
    setTaskDescription(value);
  };

  const handleBackInHistory = () => {
    dispatch(goBackInHistory());
  };

  const handleNextInHistory = () => {
    dispatch(goNextInHistory());
  };

  const addATask = () => {
    dispatch(addTask({ title: taskTitle, description: taskDescription }));
    setTaskTitle('');
    setTaskDescription('');
  };

  const deleteAllSelectedTasks = () => {
    dispatch(deleteTasks());
  };

  const disableAddTask = !taskTitle.length || !taskDescription.length;

  return (
    <div>
      <h1>Hello TODO List!</h1>

      <input
        type="text"
        value={taskTitle}
        placeholder="Add a task title"
        onChange={onChangeTitle}
      />
      <input
        type="text"
        value={taskDescription}
        placeholder="Add a task description"
        onChange={onChangeDescription}
      />

      <button type="button" onClick={addATask} disabled={disableAddTask}>
        Add a task
      </button>

      <button type="button" onClick={deleteAllSelectedTasks}>
        Delete selected task/s
      </button>

      <ul>
        {tasks?.length ? (
          tasks?.map(({ id }) => <Task id={id} key={id} />)
        ) : (
          <p>You completed your tasks!</p>
        )}
      </ul>

      <button
        type="button"
        onClick={handleBackInHistory}
        disabled={versionInUse === 0 || !versionInUse}
      >
        Go back in history
      </button>

      <button
        type="button"
        onClick={handleNextInHistory}
        disabled={versionInUse === maxVersion}
      >
        Go back next in history
      </button>
    </div>
  );
}
