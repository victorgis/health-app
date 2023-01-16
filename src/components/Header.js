import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='navbar'>
        <div className='fluid'>
            <div className='row'>
                <div className='col center'>
                    <h1>Health App</h1>
                </div>
                <div className='col center'>
                    <ul className='upload'>
                        <li>
                            <h4>Upload Data</h4>
                        </li>
                    </ul>
                </div>
            </div>
        </div>   
    </div>
       

  )
}

export default Header