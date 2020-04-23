import React from 'react'

function TeamMember({ details }) {
  if (!details) {
    return <h3>Loading...</h3>
  }
  return (
    <div className='team-member container'>
      <h2>{details.first_name} {details.last_name}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
    </div>
  )
}

export default TeamMember
