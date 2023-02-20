import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CycleContext";

export function NewCycleForm(){

  const { register } = useFormContext(); 
  // dó funciona caso tenha um provider envolta do componetnte que esta sendo usado o use form context

  const { activeCycle } = useContext(CyclesContext)
  // useforma é como se tivesse criando um novo formulario 
  /**
   * register metodo que adiciona um input pra o formulario, e fala quais os campos que vão ter no formulario
   * function register(name:string) recebe o nome do input {
   *  return ( rotorna esses metodos 
   *    onchange: () => void,
   *    onBlur: () => 
   * )
   * }
   *  
   */

    return(
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
        id="task" 
        placeholder="Dê um nome ao seu projeto" 
        list="task-suggestions"
        disabled={!!activeCycle}// !! significa se tiver um valor dentro converte para true senão para false
        {...register('task')} // ... pega todas os metodos que a funça pode retornar
        />

        <datalist id="task-suggestions"> 
        {/* para sugerir nomes de projetos */}
          <option value="Projeto 1"></option> 
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
          <option value="Projeto 4"></option>
          <option value="Projeto Banana"></option>
        </datalist>

        <label htmlFor="minutesAmount">Durante</label>
        <MinutesAmountInput
         type="number" 
         id="minutesAmount" 
         placeholder="00" 
         step={5} // o contador de numeros sera de 5 em 5 
         min={5}
         disabled={!!activeCycle}  
         {...register('MinutesAmount', {valueAsNumber: true})}
         />

        <span>minutos.</span>

      </FormContainer>
    )
}