import { useDashboard } from "../hooks/useDashboard";
import { useParams } from "react-router-dom";

import './expense.css'


function Expense() {

    const { id } = useParams();
    const { dados, erro, carregando } = useDashboard(id);

    const categorias = Object.values(dados?.Categorys ?? {});

    const despesas = []

    categorias.map((categoria, index) => (
        despesas[index] = {nome: categoria.name, valor: categoria.value, cor: '#1b5cd4'}
    ))

    const maiorValor = Math.max(...despesas.map(d => d.valor))

    return (
        <>
        {despesas.map((despesa) => (
            <div className='expense'>
                <div className='expense-text'>
                    <span>{despesa.nome}</span>
                    <strong>R$ {despesa.valor}</strong>
                </div>
                <div className='total-bar'>
                    <div className='progress' style={{width: `${(despesa.valor / maiorValor) * 100}%`, backgroundColor: `${(despesa.cor)}`}}></div>
                </div>
            </div>        
        ))}
   


        </>
    )
}

export default Expense