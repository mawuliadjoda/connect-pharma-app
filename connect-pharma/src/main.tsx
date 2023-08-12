import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { BrowserRouter } from 'react-router-dom'

// https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*   <BrowserRouter> */}
      <App />
    {/* </BrowserRouter>  */}
  </React.StrictMode>
)
