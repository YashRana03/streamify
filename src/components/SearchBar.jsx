import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function SearchBar() {

    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate()

    function handleChange(e) {
        setSearchQuery(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSearchQuery("")
        console.log("data submitted")
        sessionStorage.setItem("searchQuery", searchQuery)
        navigate("/results", {refresh:  Math.random })


    }
    return (
        <div className="search-box">
            <div className="relative">
                <img src="/images/search-icon.svg" alt="search-icon" className="serach-icon"/>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search here" 
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    )
}