import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_CLIENTS, LOAD_CLIENTS, LOAD_CLIENTS_ERROR } from '../../store/actions';
import BootstrapTable from './BootstrapTable';

const ClientTable = () => {
    const dispatcher = useDispatch();
    const clients = useSelector((state) => state.clients);
    const [allowedRows, setAllowedRows] = useState(10);
    let num = 50;
    if (allowedRows > num) {
        num = allowedRows;
    } else {
        num = 50;
    }
    useEffect(() => {
        if (num > clients.clients.length) {
            try {
                dispatcher({ type: LOADING_CLIENTS });
                axios.get(`https://fakerapi.it/api/v1/persons?_quantity=${num}`).then((response) => {
                    if (response.data.status === 'OK') {
                        dispatcher({ type: LOAD_CLIENTS, payload: response.data.data });
                    } else {
                        dispatcher({ type: LOAD_CLIENTS_ERROR });
                    }
                });
            } catch (error) {
                dispatcher({ type: LOAD_CLIENTS_ERROR });
            }
        }
    }, [num, clients.clients.length, clients.isLoading, clients.hasLoaded, dispatcher]);
    const handleClick = () => setAllowedRows(allowedRows + 10);
    return (
        <BootstrapTable
            data={clients.clients}
            isLoading={clients.isLoading}
            handleClick={handleClick}
            title="Clients"
            allowedRows={allowedRows}
        />
    );
};

export default ClientTable;
