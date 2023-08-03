import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ClientInputPage from './views/pages/clientInputPage/ClientInputPage.tsx';
import ResultPage from './views/pages/ResultPage';
import ClientConfirmPage from './views/pages/ClientConfirmPage/ClientConfirmPage.tsx';
import FormAddPage from './views/pages/FormAddPage.tsx';
import Login from "./views/pages/Login/Login.tsx"
import RegistUser from './views/pages/RegistUser/RegistUser.tsx';
import ShowAllProjects from "./views/pages/ShowAllProjects/ShowAllProjects.tsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/input' Component={ClientInputPage} />
        <Route path='/confirm' Component={ClientConfirmPage} />
        <Route path='/result' Component={ResultPage} />
        <Route path='/add_form' Component={FormAddPage} />
        <Route path='/' Component={Login} />
        <Route path='/regist' Component={RegistUser} />
        <Route path='/allProjects' Component={ShowAllProjects} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
