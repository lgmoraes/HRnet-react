import { createSlice } from '@reduxjs/toolkit'
import { selectUsersStatus } from '../utils/selectors'
import { faker } from '@faker-js/faker'

const initialState = {
  status: 'void',
  data: [],
  error: null,
}

export const getUsers = async (store) => {
  const status = selectUsersStatus(store.getState()).status

  if (status === 'pending' || status === 'updating') {
    return
  }

  store.dispatch(actions.fetching())

  try {
    const fakeResponse = () => {
      const storedUsers = JSON.parse(localStorage.getItem('employees')) || []
      const fakeUsers = []

      for (let i = 0; i < 100; i++) {
        fakeUsers.push({
          id: faker.datatype.uuid(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          department: faker.address.county(),
          startDate: faker.date.birthdate().toISOString().substring(0, 10),
          dateOfBirth: faker.date.birthdate().toISOString().substring(0, 10),
          street: faker.address.buildingNumber(),
          city: faker.address.cityName(),
          state: faker.address.country(),
          zipCode: faker.address.zipCode('#####'),
        })
      }

      return storedUsers.concat(fakeUsers)
    }

    const data = await Promise.resolve({ status: 200, data: fakeResponse() })

    if (data.status !== 200) {
      store.dispatch(actions.rejected(data.message))
      return
    }

    store.dispatch(actions.resolved(data))
  } catch (error) {
    store.dispatch(actions.rejected(error))
  }

  return
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetching: (draft) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
        return
      }

      if (draft.status === 'rejected') {
        draft.status = 'pending'
        draft.error = null
        return
      }

      if (draft.status === 'resolved') {
        draft.status = 'updating'
        return
      }

      return
    },
    resolved: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload.data
        draft.status = 'resolved'
        return
      }

      return
    },
    rejected: (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'rejected'
        draft.error = action.payload
        draft.data = {}
        return
      }

      return
    },
  },
})

const { actions, reducer } = usersSlice

export const { fetching, resolved, rejected } = actions

export default reducer
