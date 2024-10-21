import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row , Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import noimg from "./assets/noimage.jpeg"

function App() {

    const [tesla, settesla] = useState([]);
    const [search,setsearch]=useState('');
    const [filteredsearch,setfilteredsearch]=useState([]);
    const apikey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
      axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-09-21&sortBy=publishedAt&apiKey=e465ec060b1f41c7a11a4f007b63f5b7`)

      .then(response => {
        settesla(response.data.articles)
        setfilteredsearch(response.data.articles)
        console.log(response.data.articles)
      })
      .catch(error => {
        console.error('error fetching data', error);
      })
      console.log("API KEY:", apikey);

    }, [apikey]);

    useEffect(() => {
      const filtered = tesla.filter(item =>
        item.title && item.title.toLowerCase().includes(search.toLowerCase())
      );
      setfilteredsearch(filtered);
    }, [search, tesla]);

  return (
    <div>
      <Container>
      <Row>
      <h1 className='text-center mt-3 mb-3 md={12}'>Tesla App </h1>
      <input type='text' className='mt-1 mb-3' placeholder='Search by Title' value={search} onChange={e => setsearch(e.target.value)} />
      {filteredsearch.map(item => ( 
        
        <Col lg={3}>
         <Card lg={3} md={4} sm={6} xs={12} className='  ' style={{ width: "277px" }}>
         <Card.Img variant="top" src={item.urlToImage ? item.urlToImage : noimg} style={{ height: "300px", width: "277px" }} />
            <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                  {item.content}<br /><br />

                  {item.description ? (item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description)
                      : 'No description available.'}
                  </Card.Text>
                  <div>
                    <div className='flex text-center news-ref'>
                      <h6 className='publish '>Published At:          {item.publishedAt}</h6><small className='publish'></small>
                    </div>
                    <div>

                    </div>
                  </div>
                  <a href={item.url} className='btn btn-primary'>Learn More</a>
                </Card.Body>
              </Card>

        </Col>
          ))}
      </Row>
      </Container>
    </div>
  )
}

export default App