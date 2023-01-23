import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'

import { dataColumns } from '../../utils/data'

const Title = styled.h1`
  align-items: center;
  justify-content: center;
  display: flex;
`

const columns = Object.entries(dataColumns).map(([label, id]) => ({
  name: label,
  selector: (row) => row[id],
  sortable: true,
}))

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

function EmployeeList() {
  const storedUsers = JSON.parse(localStorage.getItem('employees')) || []
  const users = storedUsers.concat(fakeUsers)
  console.log(storedUsers)

  useEffect(() => {
    document.title = 'Employee list'
  }, [])

  return (
    <main className="employeeList">
      <Title>Current Employees</Title>

      <DataTable
        id="employee-table"
        pagination
        striped
        columns={columns}
        data={users}
      />
      <Link to="/">Home</Link>
    </main>
  )
}

export default EmployeeList
