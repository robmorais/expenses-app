import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import API from "../utils/API"
import "./Transactions.css";
import { LinkContainer } from "react-router-bootstrap";

export default function Home(props) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const resultData = await loadTransactions();
        console.log(resultData);
        console.log(resultData.data.transactions);
        setTransactions(resultData.data.transactions);
      } catch (e) {
        console.log(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadTransactions() {
    return API.get("transactions");
  }

  const formatPrice = ({cents, currency_iso}) => {
    var formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency_iso,
    });
    
    return formatter.format(cents/100);
  }

  // const formatDate = ({cents, currency_iso}) => {
  //   var formatter = new Intl.NumberFormat(undefined, {
  //     style: 'currency',
  //     currency: currency_iso,
  //   });
    
  //   return formatter.format(cents/100);
  // }

  function renderTransactionsList(transactions) {
    return [{}].concat(transactions).map((transaction, i) =>
    i !== 0 ? (
      <LinkContainer key={transaction.id} to={`/transactions/${transaction.id}`}>
        <ListGroupItem>
            
          <div className="details">
            <p className="description">{transaction.description}</p>
            <p className="price">{formatPrice(transaction.price)}</p>
          </div>
          <span className="date">{transaction["paid_on"]}</span>
        </ListGroupItem>
      </LinkContainer>
    ) : (
      <LinkContainer key="new" to="/transaction/new">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Create a new transaction
          </h4>
        </ListGroupItem>
      </LinkContainer>
    )
  );
  }

  return (
    <div className="transactions">
      {/* <PageHeader>Your Notes</PageHeader> */}
      <h1>Transactions</h1>
      <ListGroup>
        {!isLoading && renderTransactionsList(transactions)}
      </ListGroup>
    </div>
  );
  // return (
  //   <div className="Home">
  //     {props.isAuthenticated ? renderNotes() : renderLander()}
  //   </div>
  // );
}