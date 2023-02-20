import styled from "styled-components"

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap; /* para que quando dinuir a tela as linhas sejam quebradas e não crie uma barra de scroll */
`

const BaseInput = styled.input` // é uma estilização que sera usada para os dois inputs e foi chamada dentro do componete
// depois do styled
    background: transparent ;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme["gray-100"]};

    &:focus {
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }
    

    &::placeholder {
        color: ${props => props.theme["gray-500"]};
    }
`

export const TaskInput = styled(BaseInput)`
    flex: 1; // como o formconatainer tem display flex quando coloca flex 1 diz que o elemento tera que caber no espaço onde estiver

    &::-webkit-calendar-picker-indicator { // para tirar a flexinha das opções
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`