import { useState } from 'react'
import { Container } from 'react-bootstrap'
import SearchForm from './components/SearchForm'
import DrinksList from './components/DrinksList'
import DrinkModal from './components/DrinkModal'
import { CategoriesProvider } from './context/CategoriesProvider'
import { DrinksProvider } from './context/DrinksProvider'

function App() {

  return (
    <CategoriesProvider>
      <DrinksProvider>
        
        <header className='py-5'>
          <h1>Drinks Recipes Finder</h1>
        </header>

        <Container className='mt-5'>
          <SearchForm/>

          <DrinksList />

          <DrinkModal />
        </Container>    

      </DrinksProvider>
    </CategoriesProvider>
  )
}

export default App
