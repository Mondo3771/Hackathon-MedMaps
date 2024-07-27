import React from 'react'
import Maps from '../../Components/Maps/Maps'
import Aside from '../../Aside/Aside'
import News from '../../Components/News/News'
import Header from '../../Components/Header/Header'
import { Wrapper } from './HomePage.styles'

const HomePage = () => {
  return (
    <>
    <Header></Header>
    <Wrapper>
    <Maps></Maps>
    </Wrapper>
     
    </>
  
  )
}

export default HomePage
