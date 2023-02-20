import { differenceInSeconds } from "date-fns";
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
// usereducer é utilizado para fazer alterações no estado que depende de uma alteração baseada no estado anterior 
// e acaba sendo de uma forma menos trabalhosa, e possui um local fixo onde podem ser feitas as alterações 


interface CreateCycleData {
  task: string
  MinutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined // activecicle sera cycle mas se não ouver ciclos ativos eles será undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  iterrupuptCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode // para se referir qualquer html valido dentro do 
  // CyclesContextProvider no app.tsx
}




export const CyclesContext = createContext({} as CyclesContextType)
// as CyclesContextType para dizer que o contexto é baseado no CyclesContextType

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {

  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [], // inicia o cycles como um array vazio 
    activeCycleId: null,
  }, () => { // o use reducer pode receber um terceiro parametro que é uma function 
    // que será disparada assim que o reducer for criado para que seja possivel recuperar 
    // os dados iniciais do meu reducer de algum outro lugar 
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
      // retorna um JSON.parse no (storedStateAsJSON)
    }

  }) // usereducer recebe no primeiro parametro uma função e no segundo  qual o valor inicial da var

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
  // percorre o vetor cycle e vai encontrar um vetor em que o id do ciclo seja igual ao id do ciclo ativo 

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCycle.startDate),
      )
    }

    return 0
  })
  // armazena o tanto de segundos foi passado desde que o ciclo começou, totalSeconds subtraindo daqui o tanto de segundos
  // que ja passaram 

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])// toda vez que p cyclesstate mudar vai salvar no local storege 

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    /** 
     * para que não fosse preciso passar todas a função set cicles dendro do CyclesContextType
     * criou-se esta função e passou-a dentro da interface apenas como sem retorno 
     * esssa função markCurrentCycleAsFinished ela foi definida no componente home pois 
     * ela usa da dfunção setcicles que so existe no componente home 
     * então enviou essa função dentro do contexto assim todos os compomponentes dentro do contexto tem acessoa a ela 
     *e quando o countdown cham essa função eles ta chamando na verdade a função que está na 
     home markCurrentCycleAsFinished que vai alterar o etado de ciclos 
 
    */

    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) { // data = dados dos inputs do form 

    const id = String(new Date().getTime()) // pegou a data atual e gettime pega a data atual em milisegundos 
    // para que se a pessoa crie dois ciclos seguidos eles não possuam o mesmo id

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.MinutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    // toda vez que eu estiver alterando o estado e esse estado depender 
    //da versão anterior o valor do estado precisa ser setado em função
    // neste caso com state ele pegou o estado atual e com newcycle add o novo estado 
    setAmountSecondsPassed(0)// para que quando um novo ciclo for criado os segundos zerem 
  }

  function iterrupuptCycle() {

    dispatch(interruptCurrentCycleAction())

  }


  return (
    <CyclesContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed,
      createNewCycle,
      iterrupuptCycle

    }} >
      {children}
    </CyclesContext.Provider>
  )
}