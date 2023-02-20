import { ActionTypes } from "./actions";

import { produce } from 'immer'

interface CyclesState {
    cycles: Cycle[], // dentro do state tera um array de ciclos, como ja tem na interface que foi passada Cycle[]
    activeCycleId: string | null; // e tera um activecycleid como string ou null de não houver nada preechido  
}

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}


export function cyclesReducer(state: CyclesState, action: any) {
    // o metodo dispatch é serve para disparar a ação antes ele era setcycles mas agora não sera 
    // usado para alterar diretamente o valor de cycles. dispatch nome dado para uma função que vai 
    // disparar uma ação 
    // state: cycle[] quer dizer o tipo de dado que sera armazenado dentro do reducer, neste caso um array de cycles 
    // a funçe dentro doão d usereducer recebe dois parametros state o valor em tempo real da variavel de ciclos neste
    // caso e uma action que é qual a ação quo reale o user esta querem dizar de alteração de dentro da var  

    // dentro do reducer tem uma função que agrega todas as ações de modificações deste estado 

    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            // return {
            //     ...state, // retorna um objeto com todos os dados que eu já tenho no estado 
            //     cycles: [...state.cycles, action.payload.newCycle], // atualiza o valor dos ciclos
            //     // dizendo que ele é uma copia dos ciclos que eu ja tenho e adicionando um novo ciclo no final 
            //     activeCycleId: action.payload.newCycle.id, // novo valor da activeCycleId
            //     // ou seja no cycles pega o valor do id do novo ciclo que estou inserindo e depois activeCycleId
            //     // seta ela como ciclo ativo 
            // } // https://ts-error-translator.vercel.app desvendar erros do ts 

            return  produce(state, draft => {
                // state é a informação que eu quero modificar e no segundo parametro recebe uma variavel 
                // draft que seria um rascunho e eu faço as alterações que eu quero fazer 
                // o draft acaba sendo uma copia do state possuindo as mesmas informações contidas dentro dele 
                draft.cycles.push(action.payload.newCycle)
                // add um novo ciclo 
                draft.activeCycleId = action.payload.newCycle.id
                
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
            // return {
            //     ...state,
            //     cycles: state.cycles.map(cycle => {  //percorre cada ciclo
            //         if (cycle.id === state.activeCycleId) {
            //             return { ...cycle, interruptedDate: new Date() }// vai retornar ... = todos os dados do cyclo porem add
            //             // uma nova informação que é interruptedDate: new Date() e com a data atual 
            //         } else {
            //             return cycle
            //         }
            //     }),
            //     activeCycleId: null
            // }

            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
                // percorre cycles usa o findindex para procurar dentro do ciclo 
                // qual o ciclo que o id é igual a activeCycleId
            })

            if (currentCycleIndex < 0 ) {
                return state
                // o findindex por se so caso não encontre uma condição que satisfaça o que foi pedido
                // neste caso um id com o ciclo ativo ele retorna -1 
                // então este if serve para que caso o currentCycleIndex seja menor que 0 ele retorne 
                // o estado padrão 
            }

            return produce (state, draft => {
                draft.activeCycleId = null
                // setou como nulo 
                draft.cycles[currentCycleIndex].interruptedDate = new Date()
                // modifica o interrupted date para a data atual 
                
            })}

        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex < 0 ) {
                return state
            }

            return produce (state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        default:
            return state
    };
}