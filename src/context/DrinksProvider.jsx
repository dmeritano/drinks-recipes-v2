import { useState, useEffect, createContext } from "react"
import axios from "axios"

const DrinksContext = createContext()

const DrinksProvider = ({ children }) => {

  const [drinks, setDrinks] = useState([])
  const [modal, setModal] = useState(false)
  const [drinkId, setDrinkId] = useState(null)
  const [recipe, setRecipe] = useState({})
  const [loading, setLoading] = useState(false)


  useEffect( () => {    
    setLoading(true)
    const getRecipe = async () => {
      if (!drinkId) return //null

      try {
        const url = `${
          import.meta.env.VITE_APP_DRINKS_URL_API_BASE
        }lookup.php?i=${drinkId}` 
        const { data } = await axios.get(url)
        if (data?.drinks?.length > 0) {
          setRecipe(data.drinks[0])
        }        
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }
    getRecipe()

  },[drinkId])

  const getDrinks = async searchData => {
    try {
      const url = `${
        import.meta.env.VITE_APP_DRINKS_URL_API_BASE
      }filter.php?i=${searchData.ingredient}&c=${searchData.category}`

      const { data } = await axios.get(url)
      if (data?.drinks?.length > 0) {
        setDrinks(data.drinks)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalClick =  () => {
    setModal(!modal)
  }

  const handleDrinkIdClick = id => {
    setDrinkId(id)
  }

  return (
    <DrinksContext.Provider
      value={{
        drinks,
        getDrinks,
        handleModalClick,
        modal,
        handleDrinkIdClick,
        recipe,
        loading
      }}
    >
      {children}
    </DrinksContext.Provider>
  )
}

export { DrinksProvider }

export default DrinksContext
