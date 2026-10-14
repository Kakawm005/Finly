import Base from '../components/Base'
import Card from '../components/Card'
import MyCards from '../components/MyCards'
import TotalBalance from '../components/TotalBalance'
import dayjs from '../lib/dayjs'

import './dashboard.css'

function Dashboard () {

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
                        <Card name_card={`Receita de ${mes()}`} value="41,200" percentage="7.1%"/> 
                        <Card name_card={`Despesas de ${mes()}`} value="23,200" percentage="2.3%"/> 
                        <Card name_card={`Poupado em ${mes()}`} value="9,800" percentage="1.8%"/> 
                    </div>
                    <div className='important-card'>
                        <TotalBalance/>
                    </div> 
                </div>
                <MyCards/>
            </div>
        </Base>
        </>
    )
}

export default Dashboard