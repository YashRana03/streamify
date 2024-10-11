import { Link } from "react-router-dom"

// Navbar component
export default function Navbar() {
    return (
        <nav>
            <Link to="/"><h1>Streamify</h1></Link>
        </nav>
    )
}