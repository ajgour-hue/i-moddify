import React from 'react'

const FormGroup = ({type,label,placeholder,value,onChange}) => {
  return (
      <div className='form-group'>
            <label htmlFor="email">{label}</label>
            <input 
                value={value}
                onChange={onChange}
              type={type} 
              id={label.toLowerCase()} 
              name={label.toLowerCase()} 
              placeholder={placeholder} 
              required
            />
          </div>
  )
}

export default FormGroup
