import { differenceInSeconds } from "date-fns";
import { useContext } from "react";
import { useEffect } from "react";
import { CyclesContext } from "../../../../contexts/CycleContext";

import { CountdownContainer, Separator } from "./styles";


export function Countdown (){
  const { 
    activeCycle, 
    activeCycleId, 
    markCurrentCycleAsFinished, 
    amountSecondsPassed,
    setSecondsPassed, 
  } =  useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  // se o ciclo for ativo a variavel vai ser o numero de minutos do ciclo vezes 60 se não a var vai ser 0

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
      )

      if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else { // se nao continua o ciclo
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      //essa função serve para quando o useeffect for executado novamente pois houve alguma mudança nas dependencias 
      // para que seja feito algo para limpar o que estava sendo feito no useeffect anterior e para que ele não seja
      // feito novamente. pois como foi criado um intervalo dentro do useeffect eles sempre criar um novo quando um
      // novo projeto é executado, essa fução serve também para deletar os intervalos que não são mais necessarios 
      // ou seja o setinterval que havia sido exacutado anteriomente precisa ser deletado 
      clearInterval(interval)

    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, ]) // quando estiver usando uma var externa como active cycle precisa 
  // passa-la como dependencia  

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60// pega o resto da divisão

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')
  // padstart é um metodo que preenche uma string com o tamanho especifico caso ela não tenha aquele tamanho 
  // nesse caso as duas consts queremos que tenham dois caracteres se não tiver esses dois ira acrescentar um 0 no começo

  useEffect(() => { // se houver um ciclo ativo o countdown sera exibido no titulo da página 
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

    return(
        <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>

    )
}
/**
 * Prop Driling -> quando a gente tem Muitas propriedades APENAS para comunicação entre componentes 
 * Contex API -> Permite compartilharmos informações entres Vários componentes ao mesmo tempo 
 */


