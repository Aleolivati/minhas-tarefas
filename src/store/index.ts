import { configureStore } from '@reduxjs/toolkit'

import tasksReducer from './reducers/tasks'
import termChangeReducer from './reducers/filter'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: termChangeReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
