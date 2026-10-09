import Base from '../components/Base'
import Card from '../components/Card'

import './dashboard.css'

function Dashboard () {
    return (
        <>
        <Base>
            <main>
                <header>
                    <h1>Dashboard</h1>
                </header>
                <div className='set-card'>
                    <Card/>                             
                    <Card/>                             
                    <Card/>                             
                </div>
                <Card/>   
            </main>
        </Base>
        </>
    )
}

export default Dashboard