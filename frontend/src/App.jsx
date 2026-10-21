import { BrowserRouter, Router, Route } from "react-router-dom";

import './App.css'
import Dashboard from './pages/Dashboard'
import Lancamentos from './pages/Lancamentos'
import Contas from './pages/Contas'
import NovoLancamento from './pages/NovoLancamento'
import Categorias from './pages/Categorias'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="" element=""/>
        <Route path="" element=""/>
        <Route path="" element=""/>
        <Route path="" element=""/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
