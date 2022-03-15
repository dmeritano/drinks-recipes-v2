import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import useDrinks from "../hooks/useDrinks"

const Favorites = () => {
  const { favDrinksList, getDrinks } = useDrinks()
  const [modalAlertShow, setModalAlertShow] = useState(false)

  const handleClick = () => {
    if (favDrinksList.length === 0) {
      setModalAlertShow(true)
    } else {
      getDrinks(favDrinksList, true)
    }
  }

  return (
    <>
      <div className='row px-3 py-3'>
        <div className='col text-end'>
          <FontAwesomeIcon
            icon={faHeart}
            className='text-danger fa-effects'
            onClick={handleClick}
          />
        </div>
      </div>

      {favDrinksList.length === 0 && (
        <Modal show={modalAlertShow} onHide={() => setModalAlertShow(false)}>
          <Modal.Header>
            <Modal.Title>Advise</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>There is not favorites drinks stored</p>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default Favorites
