import './card.css'

function Card ({name_card, value, percentage}) {
    return (
        <>
        <section className='card'>
            <p>{name_card}</p>
            <p>{value}</p>
            <p>{percentage}</p>
        </section>
        </>
    )
}

export default Card