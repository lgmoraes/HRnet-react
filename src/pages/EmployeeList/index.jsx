import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useStore } from 'react-redux'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import { Input } from 'antd'
import { selectUsersData } from '../../utils/selectors'
import { getUsers } from '../../features/users'

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

function EmployeeList() {
  const store = useStore()
  const users = useSelector(selectUsersData)
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredUsers =
    filterText === ''
      ? users
      : users.filter(
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
    getUsers(store)
  }, [store])

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
        data={filteredUsers}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
      <Link to="/">Home</Link>
    </main>
  )
}

export default EmployeeList
