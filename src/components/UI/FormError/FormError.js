import React from 'react';
import './FormError.css';
const FormErrors = ({formErrors}) =>
  <div className='FormError'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>

export default FormErrors;