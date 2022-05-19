import React, { useState, useEffect } from 'react';
import { Row, Col, Card as ReactCard, Table } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import axios from 'axios';
import { LOADING_PRODUCTS, LOAD_PRODUCTS, LOAD_PRODUCTS_ERROR } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const SamplePage = () => {
    const dispatcher = useDispatch();
    const products = useSelector((state) => state.products);
    const [allowedProducts, setAllowedProducts] = useState(10);
    const handleClick = () => setAllowedProducts(allowedProducts + 10);
    let num = 50;
    if (allowedProducts > num) {
        num = allowedProducts;
    } else {
        num = 50;
    }

    useEffect(() => {
        if (num > products.products.length) {
            console.log('num: ', num);
            console.log('products.products.length: ', products.products.length);
            try {
                dispatcher({ type: LOADING_PRODUCTS });
                axios.get(`https://fakerapi.it/api/v1/products?_quantity=${num}`).then((response) => {
                    if (response.data.status === 'OK') {
                        dispatcher({ type: LOAD_PRODUCTS, payload: response.data.data });
                    } else {
                        dispatcher({ type: LOAD_PRODUCTS_ERROR });
                    }
                });
            } catch (error) {
                dispatcher({ type: LOAD_PRODUCTS_ERROR });
            }
        }
    }, [num, dispatcher, products.products.length]);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Row>
                        {products.products && products.products.length
                            ? products.products.slice(0, allowedProducts).map((product) => {
                                  return (
                                      <div className="col-12 col-md-6 d-flex" key={product.id}>
                                          <Card title={`${product.id}. ${product.name}`} isOption className=" align-items-end ">
                                              <img className="img-fluid" src={product.image} alt="" />
                                              <p>{product.description}</p>
                                              <Table responsive hover column variant="dark">
                                                  <thead className="bg-">
                                                      <tr>
                                                          <th className="text-success text-center">Price ($)</th>
                                                          <th className="text-warning text-center">Tax (%)</th>
                                                          <th className="text-primary text-center">Net price ($)</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr>
                                                          <td className="text-center">{product.price}</td>
                                                          <td className="text-center">{product.taxes}</td>
                                                          <td className="text-center">{product.net_price}</td>
                                                      </tr>
                                                  </tbody>
                                              </Table>
                                          </Card>
                                      </div>
                                  );
                              })
                            : null}
                    </Row>

                    <ReactCard className={products.isLoading ? 'card-load' : null}>
                        <ReactCard.Body>
                            {products.isLoading ? (
                                <div className="card-loader">
                                    <i className="pct-loader1 anim-rotate" />
                                </div>
                            ) : null}
                            {products.products.length && allowedProducts ? (
                                <div className="text-center">
                                    <button className="text-center btn btn-outline-primary" onClick={handleClick}>
                                        Load more...
                                    </button>
                                </div>
                            ) : null}
                        </ReactCard.Body>
                    </ReactCard>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SamplePage;
