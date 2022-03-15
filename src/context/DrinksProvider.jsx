import { useState, useEffect, createContext } from "react"
import axios from "axios"

const DrinksContext = createContext()

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([])
  const [modal, setModal] = useState(false)
  const [drinkId, setDrinkId] = useState(null)
  const [recipe, setRecipe] = useState({})
  const [loadingRecipe, setLoadingRecipe] = useState(false)

  const [favDrinksList, setFavDrinksList] = useState([])

  useEffect(() => {
    setLoadingRecipe(true)
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
        setLoadingRecipe(false)
      }
    }
    getRecipe()
  }, [drinkId])

  useEffect(() => {
    const getLocalStorageFavs = () => {
      const lsFavs =
        JSON.parse(localStorage.getItem("drinks-recipes-favs")) ?? []
      setFavDrinksList(lsFavs)
    }
    getLocalStorageFavs()
  }, [])

  useEffect(() => {
    localStorage.setItem("drinks-recipes-favs", JSON.stringify(favDrinksList))
  }, [favDrinksList])

  const getDrinks = async (searchData, showFavs) => {
    //showFavs == true means show faved drinks instead of performing a new request to de API
    try {
      if (!showFavs) {
        const url = `${
          import.meta.env.VITE_APP_DRINKS_URL_API_BASE
        }filter.php?i=${searchData.ingredient}&c=${searchData.category}`

        const { data } = await axios.get(url)
        if (data?.drinks?.length > 0) {
          setDrinks(data.drinks)
        }
      } else {
        setDrinks(favDrinksList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  const handleDrinkIdClick = (id) => {
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
        loadingRecipe,
        favDrinksList,
        setFavDrinksList,
      }}
    >
      {children}
    </DrinksContext.Provider>
  )
}

export { DrinksProvider }

export default DrinksContext
