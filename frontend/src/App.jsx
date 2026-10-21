import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css'
import Dashboard from './pages/Dashboard'
import Lancamentos from './pages/Lancamentos'
import Contas from './pages/Contas'
import NovoLancamento from './pages/NovoLancamento'
import Categorias from './pages/Categorias'


function App() {
  return (
    <Routes>
      <Route path="/dashboard/:id" element={<Dashboard />} />
      <Route path="/lancamentos" element={<Lancamentos />} />
      <Route path="/novolancamento" element={<NovoLancamento />} />
      <Route path="/contas" element={<Contas />} />
      <Route path="/categorias" element={<Categorias />} />
    </Routes>
  )
}

export default App
