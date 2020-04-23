import React, { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import './App.css'
import TeamMember from './TeamMember'
import Form from '../src/components/Form'
import * as yup from 'yup'



// starting values for slices
const initialTeamMembers = [
  {
    id: uuid(),
    name: 'Griffin McElroy',
    email: 'Ditto@TAZ.com',
    password:'testpassword',
    role: 'DM',
    TOS: true
  },
]

const initialFormValues ={
  name: '',
  email: '',
  password: '',
  role: '',
  TOS: false
}
const initialFormErrors = {
  name: '',
  password: '',
  email: '',
  role: '',
  TOS: ''

}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'name must have at least 3 characters!')
    .max(7, "Hero names are 7 letters or less!(It's tradition)")
    .required('name is required!'),
  password: yup
    .string()
    .min(8, 'passwords should be at least 8 characters long')
    .max(30, 'passwords can be no more than 30 characters long')
    .required('password is required'),
  email: yup
    .string()
    .email('a VALID email is required')
    .required('email is required'),
  role: yup
    .string()
    .required('role is required'),
  TOS: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Service to continue.")
})

function App() {
  // set slice
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formDisabled, setFormDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  
  // handler for input changes 
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const onCheckboxChange = evt => {
    const { name } = evt.target
    const isChecked = evt.target.checked
    setFormValues({
      ...formValues,
      [name]: isChecked
    })
  }

  useEffect(() => {
    formSchema.isValid(formValues)
    .then(valid => {
      setFormDisabled(!valid);
    })


  }, [formValues])
  // handler for submit button
  const onSubmit = evt => {
    evt.preventDefault()
    const newMember = {
      id: uuid(),
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      role: formValues.role,
      TOS: formValues.TOS,
    }

    setTeamMembers([...teamMembers, newMember])
    setFormValues(initialFormValues)
  }
  // axios use effect statement
  
    // axios.get('testurl')
    // .then(res => {
    //   setTeamMembers(res.data)
    // })
    // .catch (err => {
    //   console.log(err)
    // })
  // useEffect(()=> {
  // }, [])
  return (
    <div className='container'>
    <header><h1>Team Builder</h1></header>
    {
      teamMembers.map(teamMember => {
        return (
          <TeamMember key={teamMember.id} details={teamMember} />
        )
      })
    }
    <Form
    values={formValues}
    onInputChange={onInputChange}
    onCheckboxChange={onCheckboxChange}
    onSubmit={onSubmit}
    disabled={formDisabled}
    errors={formErrors}
    />
    </div>
);
}

export default App;
