import Base from '../components/Base'
import Card from '../components/Card'
import MyCards from '../components/MyCards'
import TotalBalance from '../components/TotalBalance'
import Expense from '../components/Expense'
import dayjs from '../lib/dayjs'

import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboard";

import './dashboard.css'

function Dashboard () {


  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard(1);
        setDashboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!dashboard) return <p>Nenhum dado disponível.</p>;

  const { Account, Categorys, Movement } = dashboard;

  const formatCurrency = (value) =>
    Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    function mes() {
        const mes = dayjs().format('MMMM')
        return mes
    }

    return (
        <>
        <Base>
            <header className='page-header'>
                <h1>Dashboard</h1>
            </header>
            <div className='dashboard'>
                <div className='content-card'>
                    <div className='important-card'>
                        <Card name_card={`Receitas de ${mes()}`} value={formatCurrency(Movement.total_expenses)} percentage="7.1%"/> 
                        <Card name_card={`Despesas de ${mes()}`} value={formatCurrency(Movement.total_despenses)} percentage="2.3%"/> 
                        <Card name_card={`Poupado em ${mes()}`} value={formatCurrency(Movement.savings)} percentage="1.8%"/> 
                    </div>
                    <TotalBalance balance={formatCurrency(Account.total_balance)}/>
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