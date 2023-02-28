import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  history: {
    versions: [
      {
        state: [],
        version: 0,
      },
    ],
    versionInUse: 0,
    maxVersion: 0,
  },
};

const tasksSlice = createSlice({
  name: 'tasksStatus',
  initialState,
  reducers: {
    addTask(state, action) {
      const biggerId = () => {
        if (state.tasks.length) {
          const maxId = state.tasks?.reduce((previous, current) => {
            return current.id > previous.id ? current : previous;
          });
          return parseInt(maxId.id) + 1;
        }

        return 0;
      };

      const newTask = {
        description: action.payload.description,
        id: biggerId(),
        selected: false,
        title: action.payload.title,
      };

      state.tasks.push(newTask);

      state.history.maxVersion++;

      state.history.versionInUse = state.history.maxVersion;

      state.history.versions.push({
        state: state.tasks,
        version: state.history.versionInUse,
      });
    },

    deleteTasks(state) {
      const newTasks = state.tasks.filter(({ selected }) => !selected);

      state.tasks = newTasks;

      state.history.maxVersion
        ? state.history.maxVersion++
        : (state.history.maxVersion = 0);

      state.history.versionInUse = state.history.maxVersion;

      state.history.versions.push({
        state: state.tasks,
        version: state.history.versionInUse,
      });
    },

    updateTask(state, action) {
      const newTasks = state.tasks.map((task) => {
        if (task.id === action?.payload?.id)
          return { ...task, ...action.payload };

        return task;
      });

      state.tasks = newTasks;

      state.history.maxVersion
        ? state.history.maxVersion++
        : (state.history.maxVersion = 0);

      state.history.versionInUse = state.history.maxVersion;

      state.history.versions.push({
        state: state.tasks,
        version: state.history.versionInUse,
      });
    },

    goBackInHistory(state) {
      const tasksVersion = state.history.versions.find(
        (version) => version.version === state.history.versionInUse - 1
      );

      state.tasks = tasksVersion.state;
      if (state.history.versionInUse !== 0) state.history.versionInUse--;
    },

    goNextInHistory(state) {
      if (state.history.versionInUse < state.history.maxVersion) {
        const tasksVersion = state.history.versions.find(
          (version) => version.version === state.history.versionInUse + 1
        );

        state.tasks = tasksVersion.state;
        state.history.versionInUse++;
      }
    },
  },
});

export const {
  addTask,
  deleteTasks,
  updateTask,
  goBackInHistory,
  goNextInHistory,
} = tasksSlice.actions;

export default tasksSlice.reducer;
