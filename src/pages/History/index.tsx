import { useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
import  ptBR  from "date-fns/locale/pt-BR";
import { CyclesContext } from "../../contexts/CycleContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {

  const {cycles} = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>{cycle.minutesAmount} minutos</td>
              <td>{formatDistanceToNow(new Date(cycle.startDate), {
                // new Date(cycle.startDate) new date tranforma todo o valor que for passado em uma data 
                addSuffix:true,
                locale: ptBR,
                // formatDistanceToNow date fns para formatação da data 
                // passou o cycle.starteddate para fazer um cauculo de a quanto tempo a tarefa começou
              })}</td>
              <td>
              { cycle.finishedDate && <Status statusColor="green">Concluído</Status> }
              { cycle.interruptedDate && <Status statusColor="red">Interrompido</Status> }
              { (!cycle.finishedDate && !cycle.interruptedDate) && (<Status statusColor="yellow">Em andamento</Status> )}
              {/* se o ciclo nao tiver uma data de termino e nem uma de interrupção o stts color = em andamento */}
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>

    </HistoryContainer>
  )
}
