import React from 'react'

function FormModifierMessage({message}) {
  return (
    <div className='modal-body'>
  <div className="mb-3">
          <label className="form-label">Message</label>
          <div 
          />
          {message.message}
        </div>
    </div>
  )
}

export default FormModifierMessage