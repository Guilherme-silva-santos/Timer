import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { History } from "./pages/History"
import { DefaultLayouts } from "./layouts/DefaultLayout"

export function Router () {
    return(
        <Routes>
            <Route path="/" element={<DefaultLayouts />}>
            <Route path="/" element={<Home />} />
            <Route path="/History" element={<History />} />
            </Route>
        </Routes>
    )
    //  <Route path="/" element={<DefaultLayouts />}> todas as rotas que tiverem o path / vão ter o DefaultLayouts
}