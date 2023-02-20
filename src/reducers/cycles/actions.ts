import { Cycle } from "./reducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
} 

export function addNewCycleAction(newCycle: Cycle){
    return{ // o que for passado para o dispatch entrara no lugar de action 
        type: ActionTypes.ADD_NEW_CYCLE, // o type é a ação que eu quero que seja realizada 
        payload: { // dentro de payload serão enviados os dados do meu novo ciclo 
          newCycle,
        }
      }
}

export function markCurrentCycleAsFinishedAction() {
    return { // o que for passado para o dispatch entrara no lugar de action 
        type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED, // o type é a ação que eu quero que seja realizada 
      }
}

export function interruptCurrentCycleAction() {
    return { // o que for passado para o dispatch entrara no lugar de action 
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE, // o type é a ação que eu quero que seja realizada 
      }
}