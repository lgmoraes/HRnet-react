import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'
import Home from './pages/Home'
import EmployeeList from './pages/EmployeeList'
import Error404 from './pages/Error404'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/employee-list" element={<EmployeeList />}></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
)
