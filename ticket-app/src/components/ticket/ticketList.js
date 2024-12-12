import React, { useState, useEffect } from 'react';
import { Button, Checkbox } from 'antd';
import ticketsData from '../../data/ticket.json';
import airlinesData from '../../data/airlines.json'
import './TicketList.scss';
import TicketCard from './ticketCard';
import { filterTickets, getAirlineDetails, getPrice } from '../../utils/utils';

const TicketList = () => {
    const airlines = airlinesData?.airlines;
    const tickets = ticketsData?.tickets;
    const [filteredTickets, setFilteredTickets] = useState(tickets);
    const [filters, setFilters] = useState({
        all: true,
        noStop: false,
        oneStop: false,
        twoStops: false,
        threeStops: false,
    });
    const [currency, setCurrency] = useState('RUB');

    useEffect(() => {
        setFilteredTickets(filterTickets(tickets, filters));
    }, [filters, currency, tickets])

    const handleFilterChange = (filter) => {
        const updatedFilters = { ...filters, [filter]: !filters[filter], };
        if (filter === 'all') {
            updatedFilters.all = true;
            updatedFilters.noStop = false;
            updatedFilters.oneStop = false;
            updatedFilters.twoStops = false;
            updatedFilters.threeStops = false;
        } else {
            updatedFilters.all = false;
            if (!updatedFilters.noStop && !updatedFilters.oneStop && !updatedFilters.twoStops && !updatedFilters.threeStops) {
                updatedFilters.all = true;
            }
        }
        setFilters(updatedFilters);
    };

    return (
        <div className='main-container'>
            <div>
                <img src='/assets/airplan.png' alt='ticket-app' />
            </div>
            <div className="ticket-list">

                <div className="ticket-list__filters">
                    <h4>Валюта</h4>
                    <div className="currency-buttons">
                        <Button type={currency === 'RUB' ? 'primary' : 'default'} onClick={() => setCurrency('RUB')}>RUB</Button>
                        <Button type={currency === 'USD' ? 'primary' : 'default'} onClick={() => setCurrency('USD')}>USD</Button>
                        <Button type={currency === 'EUR' ? 'primary' : 'default'} onClick={() => setCurrency('EUR')}>EUR</Button>
                    </div>
                    <div className='ticket-list__stops'>
                        <h4>количество пересадок</h4>

                        <Checkbox
                            checked={filters.all}
                            onChange={() => handleFilterChange('all')}
                        >
                            All
                        </Checkbox>
                        <Checkbox
                            checked={filters.noStop}
                            onChange={() => handleFilterChange('noStop')}
                        >
                            No stops
                        </Checkbox>
                        <Checkbox
                            checked={filters.oneStop}
                            onChange={() => handleFilterChange('oneStop')}
                        >
                            1 stop
                        </Checkbox>
                        <Checkbox
                            checked={filters.twoStops}
                            onChange={() => handleFilterChange('twoStops')}
                        >
                            2 stops
                        </Checkbox>
                        <Checkbox
                            checked={filters.threeStops}
                            onChange={() => handleFilterChange('threeStops')}
                        >
                            3 stops
                        </Checkbox>
                    </div>
                </div>
                <div>{filteredTickets.map((ticket) => (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        getPriceFn={(ticket) => getPrice(ticket, currency)}
                        getAirlineDetails={(code) => getAirlineDetails(code, airlines)}
                    />
                ))}
                </div>
            </div>
        </div>

    );
};

export default TicketList;
