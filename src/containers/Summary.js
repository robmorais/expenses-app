import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import API from '../utils/API';

const Summary = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    async function onLoad() {
      const summaryData = await loadSummary();
      console.log(summaryData.data.summary);
      setSummary(summaryData.data.summary);
      setLoading(false);
    } 
    onLoad();
  },[]);

  const loadSummary = () => {
    return API.get("summary");
  }

  const renderSummaryList = (summary) => {
    console.log(summary);
    function compare( a, b ) {
      if ( a.year < b.year ){
        return -1; // a é menor
      } else if ( a.year > b.year ){
        return 1; // a é maior
      } else {
        if ( a.month > b.month ) {
          return 1; // a é maior
        } else if ( a.month < b.month ) {
          return -1; // a é menor
        }
      }
      
      return 0;
    }
    if (summary.length > 0) {
      const orderedSummary = summary.sort(compare);
      return orderedSummary.map((item, i) =>
        <ListGroupItem key={item.total_cents}>
          <p className="month">{item.month}</p>
          <p className="year">{item.year}</p>
          <p className="total">{item.total_cents}</p>          
        </ListGroupItem>
      );
    } 
    
  }
  return ( 
    <div className="summary">
      <h1>Summary</h1>
      <ListGroup>
        {!isLoading && renderSummaryList(summary)}
      </ListGroup>
    </div>
   );
}
 
export default Summary;