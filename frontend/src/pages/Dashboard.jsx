import Base from '../components/Base'
import './dashboard.css'

function Dashboard () {
    return (
        <>
        <Base>
            <main>
                <h1>Dashboard</h1>
                <div className='set-card'>
                    <div className="card"></div>
                    <div className="card"></div>                                
                </div>
                <div className='set-card'>
                    <div className="card"></div>
                    <div className="card"></div>                                
                </div>
            </main>
        </Base>
        </>
    )
}

export default Dashboard