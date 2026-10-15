import logo from '../assets/logo1-removebg-preview.png'
import './base.css'

function Base({ children }) {
    return (
        <div className="container">
            <header className="sidebar">
                <a href="" className="sidebar-logo"><img src={logo} alt="logo" /></a>
                <nav className="sidebar-nav">
                    <a href=""><div>Dashboard</div></a>
                    <a href=""><div>Lançamentos</div></a>
                    <a href=""><div>Contas</div></a>
                    <a href=""><div>Categorias</div></a>
                    <a href=""><div>Cartão de Crédito</div></a>
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
