import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import tasksReducer from './tasks.slice.js';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;

export default store;
