import React from 'react'
import Maps from '../Components/Maps/Maps'
import Aside from '../Aside/Aside'
import Header from '../Components/Header/Header'
import { CheckIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
  const normalUser = false

  return (
    <main className="homepage">
    <Header/>
      <Maps>

      </Maps>
      <section>
        <h3>Announcements</h3>
        <textarea></textarea>
        <div>
        <input></input>
        <button><CheckIcon width={24} /></button>
        </div>
      </section>
    </main>
  
  )
}

export default HomePage
