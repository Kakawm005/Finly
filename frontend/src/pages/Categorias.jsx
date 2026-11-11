import Base from '../components/Base'

import './categorias.css'

import { useState } from "react";
import { useCategory } from "../hooks/useCategory";
import { useParams } from "react-router-dom";

function Categorias () {

    const { id } = useParams();
    const { dados, erro, carregando } = useCategory(id);

    const [newCategory, setnewCategory] = useState(false);

    return (
        <>
        <Base>
            <nav>
                <h1>Categorias</h1>
            </nav>
            <section className='categories'>
                <header>
                    <h2>Organize receitas e despesas</h2>
                    <button onClick={() => setnewCategory(true)}>+ Nova</button>
                </header>

                {newCategory && (
                                <div className="modal-overlay">
                                    <div className="modal">
                                        <h2>Cadastrar categoria</h2>

                                        <input
                                            type="text"
                                            placeholder="Nome da categoria"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Descrição da categoria"
                                        />

                                        <div>
                                            <button onClick={() => setModalAberto(false)}>
                                                Cancelar
                                            </button>

                                            <button>
                                                Salvar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                <section className='categories-content'>
                    <div>
                        <h4>{dados?.categorias_despensas}</h4>
                        <p>Despesas</p>
                    </div>
                    <div>
                        <h4>{dados?.categorias_receitas}</h4>
                        <p>Receitas</p>
                    </div>
                    <div>
                        <h4>{dados?.total_categorias}</h4>
                        <p>Total</p>
                    </div>
                </section>
                <hr />
                <section>
                    
                </section>
            </section>
        </Base>
        </>
    )
}

export default Categorias