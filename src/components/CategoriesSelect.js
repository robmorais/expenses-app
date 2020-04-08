import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import "./CategoriesSelect.css"; 
import API from '../utils/API';

const CategoriesSelect = ({title, value, onChange}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        const resultData = await loadCategories();
        console.log(resultData.data.categories);
        setCategories([{ id: "", name: "Select the category"}].concat(resultData.data.categories));
      } catch (e) {
        console.log(e);
      }
  
      //setIsLoading(false);
    }
    onLoad();
  }, []);

  const loadCategories = () => {
    
    return API.get('categories');
  }

  return (
    <Form.Group controlId="category">
      <Form.Label>{title}</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </Form.Control>
    </Form.Group>
  );
}
 
export default CategoriesSelect;