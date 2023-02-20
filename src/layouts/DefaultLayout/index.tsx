import { Header } from "../../components/Header";
import { Outlet } from "react-router-dom"
import { LayoutContainer } from "./styles";

export function DefaultLayouts() {
    return(
      <LayoutContainer>
        <Header />
        <Outlet /> 
      </LayoutContainer>
    )
    //<Outlet /> serve como um espaço para ser inserido um  conteudo expecifico de cada pagina 
  }
  