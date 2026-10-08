function Base ({children}) {
    return (
        <>
        <div class="container">
            <header>
                <a href=""><img src="src/assets/logo1-removebg-preview.png" alt="logo" /></a>
                <a href=""><div>Dashboard</div></a>
                <a href=""><div>Lançamentos</div></a>
                <a href=""><div>Contas</div></a>
                <a href=""><div>Categorias</div></a>
                <a href=""><div>Cartão de Crédito</div></a>
                <p>@Finly todos os direitos reservados</p>
            </header>
            <main>
                {children}
            </main>
        </div>
        </>
    )
}

export default Base