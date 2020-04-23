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
      <h2>Member Form</h2>
      {/* ////////// TEXT INPUTS ////////// */}
      <label>Name:&nbsp;
      <input
          value={values.name}
          onChange={onInputChange}
          name='name'
          type='text'
        /></label>
      <label>Email:&nbsp;
      <input
          value={values.email}
          onChange={onInputChange}
          name='email'
          type='text'
        /></label>
        <label>Password:&nbsp;
        <input 
            values={values.password}
            onChange={onInputChange}
            name='password'
            type='text' 
        /></label>

      {/* ////////// DROPDOWN ////////// */}
      <label>Role:&nbsp;
      <select
          
          value={values.role}
          onChange={onInputChange}
          name='role'
        >
          <option defaultValue=''>Chose Your Role</option>
          <option value='Tank'>Tank</option>
          <option value='DPS'>DPS</option>
          <option value='Control'>Control</option>
          <option value='Healer'>Healer</option>

        </select>
        </label>

        <label><input
        
        checked={values.tos}
        onChange={onCheckboxChange}
        name='TOS'
        type="checkbox" /> I accept the Terms of Service</label>

      <button onClick={onSubmit} disabled={disabled}>submit</button>
    </form>
  )
}

export default Form
