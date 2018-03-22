import React from 'react'

const Login = (props) => (
  <nav className="login">
    <h2>Inventory Login</h2>
    <p>Sign in to manege your store's inventory.</p>
    <button className="github" onClick={()=> props.authenticate('Github')}>Login to GitHub</button>
    <button className="twitter" onClick={()=> props.authenticate('Twitter')}>Login to Twitter</button>
  </nav>
)

export default Login
