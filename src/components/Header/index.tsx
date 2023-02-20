import { HeaderContainer } from "./styles";
import LogoIgnite from "../../Assets/LogoIgnite.svg"
import {NavLink} from "react-router-dom"

import { Timer, Scroll} from "phosphor-react"

export function Header (){
    return (
      <HeaderContainer>
        <img src={LogoIgnite} alt="" />
        <nav>
            <NavLink to="/" title="Time">
                <Timer size={22} />
            </NavLink>
            <NavLink to="/History" title="Histórico">
                <Scroll size={22} />
            </NavLink>
        </nav>
      </HeaderContainer>
    )
}