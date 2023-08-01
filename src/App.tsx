import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ClientInputPage from './views/pages/ClientInputPage'
import ResultPage from './views/pages/ResultPage'
import ClientConfirmPage from './views/pages/ClientConfirmPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/input' Component={ClientInputPage} />
        <Route path='/confirm' Component={ClientConfirmPage} />
        <Route path='/result' Component={ResultPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
