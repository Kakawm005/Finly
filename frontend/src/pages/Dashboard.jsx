import Base from '../components/Base'
import Card from '../components/Card'
import MyCards from '../components/MyCards'
import TotalBalance from '../components/TotalBalance'
import Expense from '../components/Expense'
import dayjs from '../lib/dayjs'

import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import { useParams } from "react-router-dom";


import './dashboard.css'

function Dashboard () {

    const { id } = useParams();

    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      async function carregarDados() {
        try {
          const resultado = await apiGet(`/dashboard/${id}`);
          setDados(resultado);
        }catch (error) {
          setErro(error.menssage);
        } finally {
          setCarregando(false)
        }
      }

      carregarDados();
    }, []);


      if (carregando) {
    return <p>Carregando dashboard...</p>;
    }


    if (erro) {
      return <p>Erro ao carregar: {erro}</p>;
    }


    const mes = () => dayjs().format('MMMM');

    return (
        <>
        <Base>
            <header className='page-header'>
                <h1>Dashboard</h1>
            </header>
            <div className='dashboard'>
                <div className='content-card'>
                    <div className='important-card'>
                        <Card name_card={`Receitas de ${mes()}`} value={Number(dados?.Movement?.total_expenses ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} percentage="7.1%"/> 
                        <Card name_card={`Despesas de ${mes()}`} value={Number(dados?.Movement?.total_despenses ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} percentage="2.3%"/> 
                        <Card name_card={`Poupado em ${mes()}`} value={Number(dados?.Movement?.savings ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})} percentage="1.8%"/> 
                    </div>
                    <TotalBalance balance={Number(dados?.Account?.total_balance ?? 0).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}/>
                    <div className='total-expenses'>
                        <h2>Onde você gastou</h2>
                        <p>Despesas efetivadas no mês de {mes()}</p>
                        <Expense/>

                    </div> 
                </div>
                <MyCards/>
            </div>
        </Base>
        </>
    )
}

export default Dashboard