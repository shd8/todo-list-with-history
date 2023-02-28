import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { updateTask } from '../store/tasks.slice.js';

const Task = ({ id }) => {
  const currentTask = useAppSelector(({ tasks }) =>
    tasks.tasks.find((task) => task.id === id)
  );

  const [editOpened, setEditOpened] = useState(false);
  const [editedTitle, setEditedTitle] = useState(currentTask.title);
  const [editedDescription, setEditedDescription] = useState(
    currentTask.description
  );

  const dispatch = useAppDispatch();

  const handleOnClick = () =>
    dispatch(updateTask({ id, selected: !currentTask.selected }));

  const handleOpenEdit = () => setEditOpened(!editOpened);

  const handleOnUpdate = () => {
    dispatch(
      updateTask({ id, title: editedTitle, description: editedDescription })
    );

    setEditOpened(false);
  };

  const onChangeTitle = ({ target }) => {
    const { value } = target;
    setEditedTitle(value);
  };

  const onChangeDescription = ({ target }) => {
    const { value } = target;
    setEditedDescription(value);
  };

  const disableUpdateTask = !editedTitle.length || !editedDescription.length;

  return (
    <div>
      {editOpened ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            placeholder="You must add at least 1 character"
            onChange={onChangeTitle}
          />
          <input
            type="text"
            value={editedDescription}
            placeholder="You must add at least 1 character"
            onChange={onChangeDescription}
          />

          <button
            type="button"
            onClick={handleOnUpdate}
            disabled={disableUpdateTask}
          >
            Update task
          </button>
        </div>
      ) : (
        <div onClick={handleOnClick} style={{ border: '1px solid black' }}>
          <input
            type="checkbox"
            checked={currentTask.selected}
            onChange={() => {}}
          />
          <h3>
            {id} - {currentTask.title}
          </h3>
          <p>{currentTask.description}</p>
        </div>
      )}
      <button onClick={handleOpenEdit}>
        {editOpened ? 'Close edit' : 'Edit'}
      </button>
    </div>
  );
};

export default Task;
