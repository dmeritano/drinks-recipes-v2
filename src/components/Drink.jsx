import { useEffect, useState } from "react"
import { Col, Card, Button } from "react-bootstrap"
import useDrinks from "../hooks/useDrinks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"

const Drink = ({ drink }) => {
  const {
    handleModalClick,
    handleDrinkIdClick,
    favDrinksList,
    setFavDrinksList,
  } = useDrinks()

  //Local state
  const [faved, setFaved] = useState(false)

  useEffect(() => {
    //Check if is faved
    const objIsFaved = favDrinksList.find((o) => o.idDrink === drink.idDrink)
    if (objIsFaved) {
      setFaved(true)
    }
  }, [])

  const handleFavClick = () => {
    //Check if is faved
    const objIsFaved = favDrinksList.find((o) => o.idDrink === drink.idDrink)
    if (objIsFaved) {
      //Remove from LS
      const updatedFavs = favDrinksList.filter(
        (p) => p.idDrink !== drink.idDrink
      )
      setFavDrinksList(updatedFavs)
      setFaved(false)
    } else {
      const updatedFavs = [
        ...favDrinksList,
        {
          idDrink: drink.idDrink,
          strDrink: drink.strDrink,
          strDrinkThumb: drink.strDrinkThumb,
        },
      ]
      setFavDrinksList(updatedFavs)
      setFaved(true)
    }
  }

  return (
    <Col md={6} lg={3}>
      <Card className='mb-4'>
        <Card.Img
          variant='top'
          src={drink.strDrinkThumb}
          alt={`Image of ${drink.strDrink}`}
        />

        <Card.Body>
          <Card.Title>
            <div className='row'>
              <div className='col-md-10'>{drink.strDrink}</div>
              <div className='col-md-2'>
                <FontAwesomeIcon
                  icon={faved ? faHeartSolid : faHeart}
                  className='text-danger fa-effects'
                  onClick={handleFavClick}
                />
              </div>
            </div>
          </Card.Title>
          <Button
            variant='outline-success'
            className='w-100'
            onClick={() => {
              handleModalClick()
              handleDrinkIdClick(drink.idDrink)
            }}
          >
            View
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Drink
