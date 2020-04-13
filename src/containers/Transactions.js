import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
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

  const startOfWeek = () =>
  {
    const _date = new Date((new Date()).setDate(7));
    _date.setHours(0,0,0,0);
    return  _date;
  }
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    date.setHours(0,0,0,0);
    const today = new Date();
    const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());
    if (today.toDateString() === date.toDateString()) {
      return "today";
    } else if (yesterday.toDateString() === date.toDateString()) {
      return "yesterday";
    } else if (date >= startOfWeek(date)) {
      const options = { weekday: 'long' };
      return date.toLocaleDateString("en-US",options);
    } else {
      //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const options = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString("en-US",options);
    }
  }

  function renderTransactionsList(transactions) {
    return [{}].concat(transactions).map((transaction, i) =>
      i !== 0 ? (
        // <LinkContainer key={transaction.id} to={`/transactions/${transaction.id}`}>
        <ListGroupItem key={transaction.id}>
            
          <div className="details">
            <p className="category">{transaction.category.name}</p>
            <p className="description">{transaction.description}</p>
          </div>
          <div className="details right">
            <p className="price">{formatPrice(transaction.price)}</p>
            <p className="date">{formatDate(transaction["paid_on"])}</p>  
          </div>
          
        </ListGroupItem>
        // </LinkContainer>
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
      <h1>{(new Date()).toLocaleString('default', { month: 'long' })}</h1>
      <ListGroup>
        {!isLoading ? 
          renderTransactionsList(transactions) 
          : 
          <ListGroupItem className="spinner" key="spinner"><Spinner animation="grow" /></ListGroupItem>
        }
      </ListGroup>
    </div>
  );
}