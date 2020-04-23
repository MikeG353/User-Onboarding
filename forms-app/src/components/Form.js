import React from 'react'

function Form(props) {
  const {
    values,
    onInputChange,
    onCheckboxChange,
    onSubmit,
    disabled,
    errors
  } = props

  return (
    <form className='member container'>
        <div className='errors'>
        
        
        
        
      </div>
      <h2>Member Form</h2>
      {/* ////////// TEXT INPUTS ////////// */}
      <label>First Name:&nbsp;
      <input
          value={values.first_name}
          onChange={onInputChange}
          name='first_name'
          type='text'
        />{errors.first_name}</label>
        <label>Last Name:&nbsp;
      <input
          value={values.last_name}
          onChange={onInputChange}
          name='last_name'
          type='text'
        />{errors.last_name}</label>
      <label>Email:&nbsp;
      <input
          value={values.email}
          onChange={onInputChange}
          name='email'
          type='text'
        />{errors.email}</label>
        <label>Password:&nbsp;
        <input 
            values={values.password}
            onChange={onInputChange}
            name='password'
            type='text' 
        /></label>
        <label>{errors.password}<input
        
        checked={values.tos}
        onChange={onCheckboxChange}
        name='TOS'
        type="checkbox" /> I accept the Terms of Service
        {errors.tos}
        </label>

      <button onClick={onSubmit} disabled={disabled}>submit</button>
    </form>
  )
}

export default Form
