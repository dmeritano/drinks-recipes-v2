import { useState } from 'react'
import { Button, Form, Row, Col, Alert } from "react-bootstrap"
import useCategories from "../hooks/useCategories"
import useDrinks from "../hooks/useDrinks"

const SearchForm = () => {
  const { categories } = useCategories()
  const { getDrinks } = useDrinks()

  //Local state
  const [searchFields, setSearchFields] = useState({
    ingredient:'',
    category:''
  })
  const [alert, setAlert] = useState('')
  
  const handleSubmit = evt => {
    evt.preventDefault()
    
    if (Object.values(searchFields).includes('')){
      setAlert("All fields are required. Try it again!")
      return
    }
    setAlert('')
    getDrinks(searchFields)
  
  }


  return (
    <Form
      onSubmit={handleSubmit}
    >
      {alert && <Alert variant='danger' className='py-1'>{alert}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='ingredient'>Ingredient Name</Form.Label>

            <Form.Control
              id='ingredient'
              type='text'
              placeholder='e.g. Ron'
              name='ingredient'
              value={searchFields.ingredient}
              onChange={evt => setSearchFields({
                ...searchFields,
                [evt.target.name] : evt.target.value
              })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='category'>Category</Form.Label>

            <Form.Select
              id='category'
              type='select'
              placeholder='e.g. Ron'
              name='category'
              value={searchFields.category}
              onChange={evt => setSearchFields({
                ...searchFields,
                [evt.target.name] : evt.target.value
              })}

            >
              <option value=''>--Select category--</option>
              {categories.map((category) => (
                <option key={category.strCategory} value={category.strCategory}>
                  {category.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className='justify-content-end'>
        <Col md={2}>
          <Button 
            variant='dark'
            className='w-100'
            type='submit'
          >Search!!</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
