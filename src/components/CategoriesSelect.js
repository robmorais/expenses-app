import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import "./CategoriesSelect.css"; 

const CategoriesSelect = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function onLoad() {
      try {
        const resultData = await loadCategories();
        setCategories([{ id: "", name: "Select the category"}].concat(resultData));
        console.log(resultData);
        //setTransactions(resultData.data.transactions);
      } catch (e) {
        console.log(e);
      }
  
      //setIsLoading(false);
    }
    onLoad();
  }, []);

  const loadCategories = () => {
    return [{id: 1, name: "eating out"}, {id:2, name: "supermarket"} ,{id: 3, name: "clothes"}, {id:4, name: "bills"}];
  }

  return (
    <Form.Group controlId="exampleForm.ControlSelect1" className="">
      <Form.Label>{props.title}</Form.Label>
      <Form.Control as="select">
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </Form.Control>
    </Form.Group>
  );
}
 
export default CategoriesSelect;