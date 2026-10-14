import Base from '../components/Base'
import Card from '../components/Card'
import MyCards from '../components/MyCards'
import TotalBalance from '../components/TotalBalance'

import './dashboard.css'

function Dashboard () {
    return (
        <>
        <Base>
            <>
                <header className='page-header'>
                    <h1>Dashboard</h1>
                </header>
                <div className='dashboard'>
                    <div className='content-card'>
                        <div className='important-card'>
                            <Card name_card="Income" value="41,200" percentage="7.1%"/> 
                            <Card name_card="Expenses" value="23,200" percentage="2.3%"/> 
                            <Card name_card="Savings" value="9,800" percentage="1.8%"/> 
                        </div>
                        <div className='important-card'>
                            <TotalBalance/>
                        </div>
                        
                    </div>
                    <MyCards/>
                </div>
            </>
        </Base>
        </>
    )
}

export default Dashboard