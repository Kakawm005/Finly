import logo from '../assets/logo1-removebg-preview.png'
import './base.css'

import { Link } from "react-router-dom";

function Base({ children }) {
    return (
        <div className="container">
            <header className="sidebar">
                <a href="" className="sidebar-logo"><img src={logo} alt="logo" /></a>
                <nav className="sidebar-nav">
                    <Link to="/dashboard/3"><div>Dashboard</div></Link>
                    <Link to="/lancamentos"><div>Lançamentos</div></Link>
                    <Link to="/contas"><div>Contas</div></Link>
                    <Link to="/categorias"><div>Categorias</div></Link>
                    <Link href=""><div>Cartão de Crédito</div></Link>
                </nav>
                <p>@Finly todos os direitos reservados</p>
            </header>
            <main className="main-content">
                {children}
            </main>
        </div>
    )
}

export default Base
