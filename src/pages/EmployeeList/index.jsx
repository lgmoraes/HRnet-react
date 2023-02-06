import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { faker } from '@faker-js/faker'
import { Input } from 'antd'

import { dataColumns } from '../../utils/data'

const Title = styled.h1`
  align-items: center;
  justify-content: center;
  display: flex;
`

const { Search } = Input

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
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const users = storedUsers.concat(fakeUsers)
  const filteredUsers = users.filter(
    (user) =>
      user.firstName &&
      user.lastName &&
      user.firstName
        .concat(' ', user.lastName)
        .toLowerCase()
        .includes(filterText.toLowerCase())
  )
  const onFilter = (txt) => setFilterText(txt)

  useEffect(() => {
    document.title = 'Employee list'
  }, [])

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <Search
        style={{
          width: 220,
        }}
        placeholder="Filter results"
        enterButton="X"
        onInput={(e) => onFilter(e.target.value)}
        onSearch={handleClear}
      />
    )
  }, [filterText, resetPaginationToggle])

  return (
    <main className="employeeList">
      <Title>Current Employees</Title>

      <DataTable
        id="employee-table"
        pagination
        striped
        columns={columns}
        data={filterText ? filteredUsers : users}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
      <Link to="/">Home</Link>
    </main>
  )
}

export default EmployeeList
