import Link from "next/link";
import Dashboard from "./dashboard/page";

export default function Header() {
    return(
        <header>
            <h1>Pagina nao encontrada</h1>
            <p>Essa página não existe</p>
            <Link href='/dashboard'>Voltar para home</Link>
        </header>
)}