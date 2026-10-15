import './expense.css'


const despesas = [
    { nome: 'Moradia', valor: 480, cor: '#3075e5' },
    { nome: 'Alimentação', valor: 320, cor: '#e9a128' },
    { nome: 'Transporte', valor: 180, cor: '#82a4c1' },
    { nome: 'Lazer', valor: 160, cor: '#9b72d0' },
    { nome: 'Outros', valor: 140, cor: '#8996a5' },
];

const maiorValor = Math.max(...despesas.map(d => d.valor))

function Expense() {

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