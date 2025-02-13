import { memo } from 'react'
import './header.css'


export function Header({ name }) {
  console.log("COMPONENTE HEADER RENDERIZOU")
  return (
   <h3 className='header'>Bem-vindo(a) {name}</h3>
  )
}

export const MemorizeHeader = memo(Header);

// SE NÃO QUISER FAZER EM FORMA DE FUNCTION, PODE FAZER DA FORMA DE BAIXO:
// - atraves de uma const, utilizando função anonima. 

// export const Header = memo(({name}) => {
//   console.log("COMPONENTE HEADER RENDERIZOU")
//   return (
//     <h3 className='header'>Bem-vindo(a) {name}</h3>
//   )
// })