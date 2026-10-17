import Base from '../components/Base'

import './categorias.css'

const categorias = []

function Categorias () {
    return (
        <>
        <Base>
            <nav>
                <h1>Categorias</h1>
            </nav>
            <section className='categories'>
                <header>
                    <h2>Organize receitas e despesas</h2>
                    <button>+ Nova</button>
                </header>
                <section className='categories-content'>
                    <div>
                        <h4>8</h4>
                        <p>Despesas</p>
                    </div>
                    <div>
                        <h4>4</h4>
                        <p>Receitas</p>
                    </div>
                    <div>
                        <h4>12</h4>
                        <p>Total</p>
                    </div>
                </section>
                <hr />
                <section>
                    
                </section>
            </section>
        </Base>
        </>
    )
}

export default Categorias