import 'styled-components'
import { defaultTheme } from '../styles/Theme/default'

type ThemeType = typeof defaultTheme // apenas armazena as informações do defaultheme dentro do Themetype

declare module 'styled-components' {
  // cria uma tipagem para o modulo styled-components
  export interface DefaultTheme extends ThemeType {} // DefaultTheme vem do arquivo index.d.ts
}
/* 
    o arquivo d.ts so pode conter codigos de definição
    neste por exemplo esta acrescentando dentro do styled-components uma definição 
*/
