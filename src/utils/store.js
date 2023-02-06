import usersReducer from '../features/users'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    users: usersReducer,
  },
})
