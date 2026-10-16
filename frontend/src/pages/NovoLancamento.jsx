import { useState } from "react";
import Base from '../components/Base'

import './novolancamento.css'



function NovoLancamento() {

    const [ativo, setAtivo] = useState("Receita");

    function context (context_name) {
        setAtivo(context_name);
        if (context_name == "Receita") {

        }
    }

    return (
        <>
        <Base>
            <section className='new-releases'>
                <h1>Novo Lançamento</h1>
                <div>
                    <button className={ativo === "Receita" ? "ativo" : ""}  onClick={() => context("Receita")}>Receita</button>
                    <button className={ativo === "Despesa" ? "ativo" : ""} onClick={() => context("Despesa")}>Despesa</button>
                    <button className={ativo === "Transferência" ? "ativo" : ""} onClick={() => context("Transferência")}>Transferência</button>
                </div>
                <div>
                    <form className="form-release" action="">
                        <div>
                            <label htmlFor="description">Descrição: </label>
                            <input id="description" type="text" placeholder="Ex: Compra no mercado..."/>                            
                        </div>
                        <div>
                        <label htmlFor="value">Valor(R$): </label>
                        <input id="value" type="number" placeholder="Valor..."/>                            
                        </div>
                        <div>
                            <label htmlFor="date">Data: </label>
                            <input id="date" type="date" placeholder="Data..."/>                            
                        </div>
                        <div>
                            <label htmlFor="category">Categoria: </label>
                            <input id="category" type="text" placeholder="Categoria..."/>                            
                        </div>
                        <article>
                            <input type="radio" id='Recebido' name='releases-type' value="Recebido"/>
                            <label htmlFor="Recebido">Recebido</label>   

                            <input type="radio" id='Pendente' name='releases-type' value="Pendente"/>
                            <label htmlFor="Pendente">Pendente</label>  
                        </article>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </section>
        </Base>
        </>
    )
}

export default NovoLancamento