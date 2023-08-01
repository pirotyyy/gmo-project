import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ClientInputPage from './views/pages/ClientInputPage'
import ResultPage from './views/pages/ResultPage'
import ClientConfirmPage from './views/pages/ClientConfirmPage'
import Chat from './views/pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/input' Component={ClientInputPage} />
        <Route path='/confirm' Component={ClientConfirmPage} />
        <Route path='/result' Component={ResultPage} />
        <Route path='/chat' Component={Chat} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
