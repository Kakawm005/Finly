import './card.css'

function Card ({name_card, value, percentage}) {
    return (
        <>
        <section className='card'>
            <div className='nav-money'>
                <p className='card-name'>{name_card}</p>
                <p className='card-value'>${value}</p>
            </div>
            <div>
                <div className='btn'>
                    <a href=''><div className='link'>↗</div></a>
                </div>
                <p className='card-percentage'>{percentage}</p>
            </div>
        </section>
        </>
    )
}

export default Card