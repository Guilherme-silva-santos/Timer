import { HandPalm, Play } from "phosphor-react";
import { createContext, useContext, useState } from "react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from 'date-fns'


import { useForm } from "react-hook-form";
import { number } from "zod/lib";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/Countdown";
import { FormProvider } from "react-hook-form";
import { CyclesContext } from "../../contexts/CycleContext";



const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  MinutesAmount: zod
    .number()
    .min(1, 'Ciclo precisa ser no mínimo 5 minutos')
    .max(60, 'Ciclo precisa ser no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // criou-se uma interface igual a de cima 
// atravez de uma função do zod que é a infer e para tranformar um objeto js em ts foi usado o typeof  


export function Home() {

  const { activeCycle, createNewCycle, iterrupuptCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      MinutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm // para que o newcycleform tenha acesso a todas as funções do 
  // react hook form 

  function handleCreateNewCycle(data: NewCycleFormData){
    console.log(createNewCycle);
    
    createNewCycle(data);
    reset()
  }

  const task = watch('task') // a function watch vai observar o campo de task
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      {/* onSubmit={handleSubmit(handleCreateNewCycle)} 
        passou metodo do useform e passou como parametro a 
        função que foi criada 
      */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
          {/* para que os components  <NewCycleForm />
            <Countdown /> consigam ter acesso as informações presentes no CyclesContext */}
            <FormProvider {...newCycleForm}>
            {/* {...newCycleForm} pega cada uma das propriedades do newCycleForm e passa elas como props do from
            provider */}
              <NewCycleForm />
             </FormProvider>
            <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={iterrupuptCycle} type="button">
            {/* {isSubmitDisabled} quando não hover uma task ou seja o valor o botaõ é desabilitado  */}
            <HandPalm size={22} />
            Interromper
          </StopCountdownButton >
        ) : (
          <StartCountdownButton disabled = {isSubmitDisabled}  type="submit">
            {/* {isSubmitDisabled} quando não hover uma task ou seja o valor o botaõ é desabilitado  */}
            <Play size={22} />
            Começar
          </StartCountdownButton >
        )}
      </form>
    </HomeContainer>
  )
}
