import React, { useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

const BootstrapTable = ({ data, allowedRows, handleClick, title, isLoading }) => {
    useEffect(() => {}, [data]);
    const body =
        data && data.length
            ? data.slice(0, allowedRows).map((item) => {
                  return (
                      <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>
                              <img src={item.image} alt="" style={{ maxWidth: 100 }} />
                          </td>
                          <td>
                              {(item.contact && item.contact.firstname) || item.firstname}{' '}
                              {(item.contact && item.contact.lastname) || item.lastname}
                          </td>
                          <td>{(item.contact && item.contact.email) || item.email}</td>
                          <td>{(item.contact && item.contact.phone) || item.phone}</td>
                          <td>{(item.contact && item.contact.gender) || item.gender}</td>
                      </tr>
                  );
              })
            : null;
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">{title && title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover variant="dark">
                                <thead className="bg-dark">
                                    <tr>
                                        <th>#</th>
                                        <th>Image</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>{body}</tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card className={isLoading && 'card-load'}>
                        <Card.Body>
                            {isLoading && (
                                <div className="card-loader">
                                    <i className="pct-loader1 anim-rotate" />
                                </div>
                            )}
                            {data && data.length && allowedRows && (
                                <div className="text-center">
                                    <button className="text-center btn btn-outline-primary" onClick={handleClick}>
                                        Load more...
                                    </button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default BootstrapTable;
