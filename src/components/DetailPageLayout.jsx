import MovieDetails from "../pages/MovieDetails"
import { Outlet } from "react-router-dom"

export default function DetailPageLayout() {
    return (
        <>
            <MovieDetails />
            <Outlet />
        </>
    )
}