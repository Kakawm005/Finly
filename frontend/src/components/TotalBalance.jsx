import { useState } from 'react'
import './totalbalance.css'

const MAX = 7500
const TICKS = [7500, 6000, 4500, 3000, 1500, 0]

const YEARLY = [
    { month: 'Jan', value: 2400, pct: 16 },
    { month: 'Fev', value: 3800, pct: 21 },
    { month: 'Mar', value: 1500, pct: 36 },
    { month: 'Abr', value: 700, pct: 19 },
    { month: 'Maio', value: 2100, pct: 25 },
    { month: 'Jun', value: 5980, pct: 14 },
    { month: 'Jul', value: 2700, pct: 8 },
    { month: 'Ago', value: 4500, pct: 11 },
    { month: 'Set', value: 6600, pct: 9 },
    { month: 'Out', value: 3700, pct: 20 },
    { month: 'Nov', value: 1800, pct: 7 },
    { month: 'Dez', value: 700, pct: 4 },
]

const PERIODS = {
    yearly: { label: 'Ano', data: YEARLY, year: 2025 },
    semester: { label: 'Ultimos 6 meses', data: YEARLY.slice(6), year: 2025 },
    trimester: { label: 'Ultimos 3 meses', data: YEARLY.slice(9), year: 2025 },
}

const fmt = (n) => '$' + n.toLocaleString('en-US')

function TotalBalance({ balance = 102489, variation = 1.77 }) {
    const [period, setPeriod] = useState('yearly')
    const [open, setOpen] = useState(false)
    const { data, year } = PERIODS[period]

    // barra destacada por padrão: junho
    const junIndex = data.findIndex((d) => d.month === 'Jun')
    const defaultIndex = junIndex >= 0 ? junIndex : 0
    const [hover, setHover] = useState(null)
    const active = hover !== null && hover < data.length ? hover : defaultIndex
    const current = data[active]

    return (
        <section className="total-balance tb">
            <div className="tb-head">
                <div>
                    <p className="tb-title">Total Balance</p>
                    <div className="tb-amount">
                        <h2>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                        <span className="tb-badge">▲ {variation}</span>
                    </div>
                </div>
                <div className="tb-actions">
                    <div className="tb-select">
                        <button
                            type="button"
                            className="tb-pill"
                            aria-haspopup="listbox"
                            aria-expanded={open}
                            onClick={() => setOpen((o) => !o)}
                        >
                            {PERIODS[period].label} <span className="tb-chevron">⌄</span>
                        </button>
                        {open && (
                            <ul className="tb-menu" role="listbox">
                                {Object.entries(PERIODS).map(([key, p]) => (
                                    <li key={key}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={key === period}
                                            onClick={() => { setPeriod(key); setHover(null); setOpen(false) }}
                                        >
                                            {p.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="button" className="tb-pill tb-more" aria-label="Mais opções">⋮</button>
                </div>
            </div>

            <div className="tb-chart">
                <div className="tb-yaxis" aria-hidden="true">
                    {TICKS.map((t) => (
                        <span key={t} style={{ '--p': t / MAX }}>{fmt(t)}</span>
                    ))}
                </div>

                <div className="tb-plot" onMouseLeave={() => setHover(null)}>
                    <div
                        className="tb-guide"
                        style={{ '--p': current.value / MAX }}
                        aria-hidden="true"
                    />
                    <div className="tb-bars" style={{ '--n': data.length }}>
                        {data.map((d, i) => {
                            const edge = i === 0 ? 'left' : i === data.length - 1 ? 'right' : ''
                            return (
                                <div className="tb-col" key={d.month}>
                                    <button
                                        type="button"
                                        className={`tb-bar-wrap${i === active ? ' is-active' : ''}`}
                                        style={{ '--p': d.value / MAX }}
                                        onMouseEnter={() => setHover(i)}
                                        onFocus={() => setHover(i)}
                                        onClick={() => setHover(i)}
                                        aria-label={`${d.month}: ${fmt(d.value)} (${d.pct}%)`}
                                    >
                                        <span className="tb-pct">+{d.pct}%</span>
                                        <span className="tb-bar" />
                                        {i === active && (
                                            <span className={`tb-tooltip ${edge}`} role="status">
                                                <strong>{fmt(d.value)} ({d.pct}%)</strong>
                                                <small>{d.month === 'Jun' ? 'June' : d.month} {year}</small>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="tb-xaxis" style={{ '--n': data.length }}>
                    {data.map((d, i) => (
                        <span key={d.month} className={i === active ? 'is-active' : ''}>{d.month}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TotalBalance
