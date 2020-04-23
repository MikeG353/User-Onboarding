import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TeamMember from './TeamMember'
import Form from '../src/components/Form'
import * as yup from 'yup'


const url = 'https://reqres.in/api/users'
// starting values for slices
// const initialTeamMembers = [
//   {
//     id: uuid(),
//     name: 'Griffin McElroy',
//     email: 'Ditto@TAZ.com',
//     password:'testpassword',
//     role: 'DM',
//     TOS: true
//   },
// ]

const initialFormValues ={
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  TOS: false,
}
const initialFormErrors = {
  first_name: '',
  last_name: '',
  password: '',
  email: '',  
  TOS: '',
}

const formSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(3, 'name must have at least 3 characters!')
    .required('name is required!'),
  last_name: yup
    .string()
    .min(3, 'name must have at least 3 characters!')
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
  TOS: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Service to continue.")
})

function App() {
  // set slice
  const [teamMembers, setTeamMembers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formDisabled, setFormDisabled] = useState(true)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  // GET and POST
  const getTeam = () => {
    axios.get(url)
    .then(res => {
      console.log(res.data)
      setTeamMembers(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect (() => {
    getTeam()
  }, [])

  const postMember = member => {
    axios.post(url, member)
      .then(res => {
        console.log(res)
        setTeamMembers([...teamMembers, res.data])
      })
      .catch(err=> {
        console.log(err)
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
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      password: formValues.password,
      TOS: formValues.TOS,
    }

    postMember(newMember)
    setFormValues(initialFormValues)
  }
  // handler for input changes 
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch (err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

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
