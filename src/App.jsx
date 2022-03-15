import { Container } from "react-bootstrap"
import SearchForm from "./components/SearchForm"
import DrinksList from "./components/DrinksList"
import DrinkModal from "./components/DrinkModal"
import Favorites from "./components/Favorites"
import { CategoriesProvider } from "./context/CategoriesProvider"
import { DrinksProvider } from "./context/DrinksProvider"

function App() {
  return (
    <CategoriesProvider>
      <DrinksProvider>
        <header className='py-5'>
          <h1>Drinks Recipes Finder</h1>
        </header>

        <Container className='mt-4'>
          <Favorites />

          <SearchForm />

          <DrinksList />

          <DrinkModal />
        </Container>
      </DrinksProvider>
    </CategoriesProvider>
  )
}

export default App
