import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; 2022 Example Company</p>
      </div>
      <nav className="footer-right">
        <p href="#">Privacy Policy</p>
        <p href="#">Terms of Use</p>
      </nav>
    </footer>

  )
}

export default Footer