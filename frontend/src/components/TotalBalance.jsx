import { useState } from 'react'
import './totalbalance.css'

import { useDashboard } from "../hooks/useDashboard";
import { useParams } from "react-router-dom";

const MAX = 7500
const TICKS = [7500, 6000, 4500, 3000, 1500, 0]


const fmt = (n) => 'R$' + (n ?? 0).toLocaleString('pt-BR')

function TotalBalance({ balance = 102489, variation = 1.77 }) {

    // pegar dados da api
    const { id } = useParams();
    const { dados, erro, carregando } = useDashboard(id);


    const getBarHeight = (value) => {
    const numericValue = Number(value) || 0;
    return Math.min(Math.max(numericValue / MAX, 0), 1);
    };

    const YEARLY = [
        { month: 'Jan', value: dados?.Movement?.despenses_year?.Jan?.value},
        { month: 'Fev', value: dados?.Movement?.despenses_year?.Fev?.value},
        { month: 'Mar', value: dados?.Movement?.despenses_year?.Mar?.value},
        { month: 'Abr', value: dados?.Movement?.despenses_year?.Abr?.value},
        { month: 'Maio', value: dados?.Movement?.despenses_year?.Maio?.value},
        { month: 'Jun', value: dados?.Movement?.despenses_year?.Jun?.value},
        { month: 'Jul', value: dados?.Movement?.despenses_year?.Jul?.value},
        { month: 'Ago', value: dados?.Movement?.despenses_year?.Ago?.value},
        { month: 'Set', value: dados?.Movement?.despenses_year?.Set?.value},
        { month: 'Out', value: dados?.Movement?.despenses_year?.Out?.value},
        { month: 'Nov', value: dados?.Movement?.despenses_year?.Nov?.value},
        { month: 'Dez', value: dados?.Movement?.despenses_year?.Dez?.value},
    ]

    const PERIODS = {
        yearly: { label: 'Ano', data: YEARLY, year: 2025 },
        semester: { label: 'Ultimos 6 meses', data: YEARLY.slice(6), year: 2025 },
        trimester: { label: 'Ultimos 3 meses', data: YEARLY.slice(9), year: 2025 },
    }

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
                    <p className="tb-title">Saldo Total</p>
                    <div className="tb-amount">
                        <h2>{balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
                        <span className="tb-badge">▲ {variation}</span>
                    </div>
                </div>
                <div className="tb-actions">
                    <div className="tb-select">
                        <button type="button" className="tb-pill" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
                            {PERIODS[period].label} <span className="tb-chevron">⌄</span>
                        </button>
                        {open && (
                            <ul className="tb-menu" role="listbox">
                                {Object.entries(PERIODS).map(([key, p]) => (
                                    <li key={key}>
                                        <button type="button" role="option" aria-selected={key === period} onClick={() => { setPeriod(key); setHover(null); setOpen(false) }}>
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
                        style={{ '--p': getBarHeight(current.value) }}
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
                                        style={{ '--p': getBarHeight(d.value) }}
                                        onMouseEnter={() => setHover(i)}
                                        onFocus={() => setHover(i)}
                                        onClick={() => setHover(i)}
                                        aria-label={`${d.month}: ${fmt(d.value)}`}
                                    >
                                        <span className="tb-bar" />
                                        {i === active && (
                                            <span className={`tb-tooltip ${edge}`} role="status">
                                                <strong>{fmt(d.value)}</strong>
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
