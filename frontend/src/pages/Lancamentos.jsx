import Base from '../components/Base'
import dayjs from '../lib/dayjs'

import './lancamentos.css'

function Lancamentos() {

    function mes() {
        const mes = dayjs().format('MMMM')
        return mes
    }

    return (
        <>
        <Base>
            <nav>
                <h1>Lançamentos</h1>
            </nav>
            <section className='releases'>
                <div className='income'>
                    <h2>Receitas de {mes()}</h2>
                    <p>R$600</p>
                </div>
                <div className='expense'>
                    <h2>Despesas de {mes()}</h2>
                    <p>R$600</p>
                </div>
            </section>
            <section className='releases-search'>
                <header>
                    <form method="GET">
                        <div className='search'>
                            <h3>Pesquisar</h3>
                            <input type="text" placeholder='Descrição ou Categoria...'/>                            
                        </div>
                        <h3>Tipo</h3>
                        <div className='releases-type'>
                            <div>
                                <input type="radio" id='all' name='releases-type' value="Todos"/>
                                <label htmlFor="Todos">Todos</label>   
                            </div>
                            <div>
                                <input type="radio" id='income' name='releases-type' value="Receitas"/>
                                <label htmlFor="Receitas">Receitas</label>
                            </div>
                            <div>
                                <input type="radio" id='expense'  name='releases-type' value="Despesas"/>
                                <label htmlFor="Despesas">Despesas</label>                                
                            </div>
                            <div>
                                <input type="radio" id='transference' name='releases-type' value="Transferencia"/>
                                <label htmlFor="Transferencia">Transferência</label>                                   
                            </div>
                        </div>
                        <div className='period-status'>
                            <div>
                                <label for="period">Período: </label>
                                <select name="period" id="period">
                                    <option value="month" selected>Este mês</option>
                                    <option value="previous">Mês anterior</option>
                                    <option value="90days">Últimos 90 dias</option>
                                    <option value="all">Todo o período</option>
                                </select>                                
                            </div>
                            <div>
                                <label for="status">Status: </label>
                                <select name="status" id="status">
                                    <option value="all" selected>Todos</option>
                                    <option value="pay">Pago / Recebido</option>
                                    <option value="pending">Pendente</option>
                                </select>                                
                            </div>
                        </div>
                    </form>                    
                </header>
                <hr/>
                <section className='releases-result'>

                </section>
            </section>
        </Base>
        </>
    )
}

export default Lancamentos