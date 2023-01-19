import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function EmployeeList() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Employee list'
  }, [])

  return <main className="employeeList"></main>
}

export default EmployeeList
