import React, { useState } from 'react'

function RegisterAccount() {
const [name , setName] = useState('')
const [email , setEmail] = useState('')
const [password , setPassword] = useState('')
const [branch , setBranch] = useState('')
const [city , setCity] = useState('')

  return (
    <div>
         <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          marginLeft: "0 auto",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
         
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          </div>
    </div>
  )
}

export default RegisterAccount


     