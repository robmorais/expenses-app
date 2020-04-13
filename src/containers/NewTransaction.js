import React, { useState } from "react";
import { FormGroup, Form, Col } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewTransaction.css";
import { useFormFields } from "../libs/hooksLib";
import CategoriesSelect from "../components/CategoriesSelect";
import API from "../utils/API";

export default function NewTransaction(props) {
  //const [transaction, setTransaction] = useState("");
  const [fields, handleFieldChange] = useFormFields({
    description: "",
    price: 0,
    paidOn: "",
    category: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return true; // TODO
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(fields.description);
    console.log(fields.price);
    console.log(fields.paidOn);
    console.log(fields.category);

    setIsLoading(true);
    //const results = await saveTransaction();
    API.post('transactions', 
    {
      "transaction": {
        "paid_on": fields.paidOn,
        "currency": "euro",
        "price_cents": fields.price * 100,
        "description": fields.description,
        "category_id": fields.category
      }
    }).then(results => {
      console.log(results);
      setIsLoading(false);
      props.history.push("/");
      // handleFieldChange({
      //   description: "",
      //   price: 0,
      //   paidOn: "",
      //   category: 0
      // });

    }).catch(error => { 
      console.log(error)
      setIsLoading(false);
    });
    // TODO
    // if (true) {
    //   // Error message
    //   return;
    // }

    //setIsLoading(true);
  }

  // const saveTransaction = () => {
    
  // }

  return (
    <div className="NewTransaction">
      <h1>New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            autoFocus
            value={fields.description}
            type="text"
            onChange={handleFieldChange}
          />
        </FormGroup>
        <CategoriesSelect title="Category" value={fields.category} onChange={handleFieldChange}/>
        <Form.Row>
          <Form.Group as={Col} controlId="paidOn">
            <Form.Label>PaidOn</Form.Label>
            <Form.Control
              value={fields.paidOn}
              type="date"
              onChange={handleFieldChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
            value={fields.price}
            type="number"
            placeholder="0,0"
            onChange={handleFieldChange}
          />
          </Form.Group>
        </Form.Row>
        <LoaderButton
          block
          type="submit"
          size="large"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
}