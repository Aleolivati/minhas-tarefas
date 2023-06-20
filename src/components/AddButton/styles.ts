import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Circle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 64px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: #44bd32;
  color: #fff;
  border-radius: 50%;
  font-size: 40px;
  text-decoration: none;
`
