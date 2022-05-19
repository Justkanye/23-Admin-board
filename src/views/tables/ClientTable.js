import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_CLIENTS, LOAD_CLIENTS, LOAD_CLIENTS_ERROR } from '../../store/actions';
import BootstrapTable from './BootstrapTable';

const ClientTable = () => {
    const dispatcher = useDispatch();
    const clients = useSelector((state) => state.clients);
    const [allowedRows, setAllowedRows] = useState(10);
    const num = clients.clients.length && clients.clients.length > allowedRows ? 50 : allowedRows;
    useEffect(() => {
        if (!clients.clients.length || allowedRows > clients.clients.length || !(clients.isLoading && clients.hasLoaded)) {
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
    }, [num]);
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
