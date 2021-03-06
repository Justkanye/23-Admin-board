import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_TEAM, LOAD_TEAM, LOAD_TEAM_ERROR } from '../../store/actions';
import BootstrapTable from './BootstrapTable';

const ClientTable = () => {
    const dispatcher = useDispatch();
    const teamMembers = useSelector((state) => state.team);
    const [allowedRows, setAllowedRows] = useState(10);
    const handleClick = () => setAllowedRows(allowedRows + 10);
    let num = 50;
    if (allowedRows > num) {
        num = allowedRows;
    } else {
        num = 50;
    }
    useEffect(() => {
        if (num > teamMembers.teamMembers.length) {
            try {
                dispatcher({ type: LOADING_TEAM });
                axios.get(`https://fakerapi.it/api/v1/companies?_quantity=${num}`).then((response) => {
                    if (response.data.status === 'OK') {
                        dispatcher({ type: LOAD_TEAM, payload: response.data.data });
                    } else {
                        dispatcher({ type: LOAD_TEAM_ERROR });
                    }
                });
            } catch (error) {
                dispatcher({ type: LOAD_TEAM_ERROR });
            }
        }
    }, [num, dispatcher, teamMembers.teamMembers, teamMembers.isLoading, teamMembers.hasLoaded]);

    return (
        <BootstrapTable
            data={teamMembers.teamMembers}
            isLoading={teamMembers.isLoading}
            handleClick={handleClick}
            title="Team Members"
            allowedRows={allowedRows}
        />
    );
};

export default ClientTable;
