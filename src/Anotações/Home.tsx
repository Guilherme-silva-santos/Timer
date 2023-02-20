import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({

    /**
     * se criar um contexto onde sera armazenado o valor inicial do contexto 
     * neste caso armazena a informação do meu ciclo ativo 
     * o contexto sempre tera o mesmo valor a não ser que criemos um estado 
     * para que ele possa ser alterado com o click do botão 
     * e tal estado precisa ser dentro do componete pai 
     * que neste caso é a home 
     */
} as any) // para que possa ser enviado qualquer coidsa dentro do contexto 

function NewCycleForm() {
    let { activeCycle, setActiveCycle} = useContext(CyclesContext)
    /**
     * para usar o context se usa um hook usecontext 
     * buscou de dentro do CyclesContext o activeCycle 
     */

    return (
        <h1>
            NewCycleForm: {activeCycle}
           <button
           onClick={() => {
            setActiveCycle(2)
           }}
            >
                Alterar numero
            </button>     
        </h1>
    )
}

function Countdown() {
    const { activeCycle} = useContext(CyclesContext)
    return (
        <h1>Countdown: {activeCycle}</h1>
    )
}

export function Home () {
    const [activeCycle, setActiveCycle] = useState(0)

    return(
        /**
         * para que as informações do cyclescontext possam ser alteradas precisa-se usar 
         * o .Provaider para que os componentes dentro dele tenham acesso as informações de dentro dele 
         * no value do provider é passado quais informações que ue quero que sejam compatilhadas 
         * para aqueles componentes que dentro dele estão 
         * e passou setActiveCycle para que os outro componentes pudessem ter acesso ao estado 
         */

        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
        <div>
            <NewCycleForm />
            <Countdown />
        </div>
        </CyclesContext.Provider>
    )
}