import { Modal, Image } from "react-bootstrap"
import useDrinks from "../hooks/useDrinks"

const DrinkModal = () => {
  const { modal, handleModalClick, recipe, loadingRecipe } = useDrinks()

  const showIngredients = () => {
    let ingredients = []
    //API returns up to 15 ingredientes
    for (let i = 1; i <= 15; i++) {
      if (recipe[`strIngredient${i}`]) {
        //if not null
        ingredients.push(
          <li key={i}>
            {recipe[`strIngredient${i}`]} " - " {recipe[`strMeasure${i}`]}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    !loadingRecipe && (
      <Modal show={modal} onHide={handleModalClick}>
        <Image src={recipe.strDrinkThumb} alt={`Image of ${recipe.strDrink}`} />

        <Modal.Header>
          <Modal.Title>{recipe.strDrink}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='p-3'>
            <h2>Instructions</h2>
            {recipe.strInstructions}
            <h2 className='mt-3'>Ingredients and quantities</h2>
            {showIngredients()}
          </div>
        </Modal.Body>
      </Modal>
    )
  )
}

export default DrinkModal
