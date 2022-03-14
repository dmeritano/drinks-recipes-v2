import { Modal, Image } from 'react-bootstrap'
import useDrinks from '../hooks/useDrinks'

const DrinkModal = () => {

  const { modal, handleModalClick, recipe } = useDrinks()

  

  return (
    <Modal show={modal} onHide={handleModalClick}>
        <Modal.Body>
          <p>{recipe.strInstructions}</p>

          <h4>Ingredients</h4>


        
        </Modal.Body>
    </Modal>
  )
}

export default DrinkModal