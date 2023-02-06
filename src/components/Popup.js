import React from 'react'
import "./Popup.css"

const Popup = ({ coordinate, text }) => {
  return (
    <div style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
      <p>{text}</p>
    </div>
  )

}

export default Popup