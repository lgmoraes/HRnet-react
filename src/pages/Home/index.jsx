import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Input, InputNumber, Select } from 'antd'
import ReactDatePicker from 'react-datepicker'

import { departments, states } from '../../utils/data'

const Title = styled.h1`
  align-items: center;
  justify-content: center;
  display: flex;
`

const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  width: 300px;
  max-width: 100%;
  margin-bottom: 1em;
`

const Label = styled.label`
  margin-top: 1rem;
  margin-bottom: 10px;
  display: block;
`

const Address = styled.fieldset`
  margin-top: 10px;
`

const Modal = styled.div`
  display: none;
`

/**
 * Root element of the app
 */
function Home() {
  useEffect(() => {
    document.title = 'HRnet'
  }, [])

  function showModal(visible) {
    const modal = document.getElementById('modal')
    modal.style.display = visible ? 'block' : 'none'
  }

  function saveEmployee() {
    const firstName = document.getElementById('first-name')
    const lastName = document.getElementById('last-name')
    const dateOfBirth = document.getElementById('date-of-birth')
    const startDate = document.getElementById('start-date')
    const department = document.getElementById('department')
    const street = document.getElementById('street')
    const city = document.getElementById('city')
    const state = document.getElementById('state')
    const zipCode = document.getElementById('zip-code')

    const employees = JSON.parse(localStorage.getItem('employees')) || []
    const employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      startDate: startDate.value,
      department: department.value,
      street: street.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value,
    }
    employees.push(employee)
    //localStorage.setItem('employees', JSON.stringify(employees))
    showModal(true)
  }

  return (
    <main className="home">
      <Title>HRnet</Title>
      <Container>
        <Link to="employee-list">View Current Employees</Link>

        <h2>Create Employee</h2>
        <Form action="#" id="create-employee">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" />

          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" />

          <Label htmlFor="date-of-birth">Date of Birth</Label>
          <Input id="date-of-birth" />

          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" />

          <Address>
            <legend>Address</legend>

            <Label htmlFor="street">Street</Label>
            <Input id="street" />

            <Label htmlFor="city">City</Label>
            <Input id="city" />

            <Label htmlFor="state">State</Label>
            <Select
              name="state"
              id="state"
              options={states.map((state) => ({ value: state.name }))}
              style={{
                width: 180,
              }}
            />

            <Label htmlFor="zip-code">Zip Code</Label>
            <InputNumber id="zip-code" min={0} />
          </Address>

          <Label htmlFor="department">Department</Label>
          <Select
            name="department"
            id="department"
            options={departments.map((name) => ({ value: name }))}
            style={{
              width: 160,
            }}
          />
        </Form>

        <Button onClick={saveEmployee} type="primary">
          Save
        </Button>
      </Container>

      <Modal id="modal">Employee Created!</Modal>
    </main>
  )
}

export default Home
