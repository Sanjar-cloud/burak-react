import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import './css/index.css'
import App from './App.tsx'
import theme from './app/MaterialTheme/index.ts'
import { BrowserRouter as Router } from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
          <App />
      </Router>
    </ThemeProvider>
  </StrictMode>,
)

