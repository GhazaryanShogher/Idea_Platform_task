export const getPrice = (ticket, currency) => {
  switch (currency) {
    case 'USD':
      return `${(ticket.price / 74).toFixed(2)}$`; // Conversion rate from RUB to USD
    case 'EUR':
      return `${(ticket.price / 88).toFixed(2)}€`; // Conversion rate from RUB to EUR
    case 'RUB':
    default:
      return `${ticket.price}₽`;
  }
};

export const filterTickets = (tickets, filters) => {
  let updatedTickets = [...tickets];

  if (!filters.all) {
    updatedTickets = updatedTickets.filter((ticket) => {
      if (filters.noStop && ticket.stops === 0) return true;
      if (filters.oneStop && ticket.stops === 1) return true;
      if (filters.twoStops && ticket.stops === 2) return true;
      if (filters.threeStops && ticket.stops === 3) return true;
      return false;
    });
  }

  updatedTickets.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  return updatedTickets;
};

export const getAirlineDetails = (code, airlines) => {
  const airline = airlines.find((airline) => airline.code === code);
  return airline ? airline : { name: code, logo: '' };
};

export const getStopsText = (stops) => {
  switch (stops) {
    case 0:
      return 'Без пересадок';
    case 1:
      return '1 пересадка';
    case 2:
      return '2 пересадки';
    default:
      return `${stops} пересадки`;
  }
}

export const formatDateWithDay = (dateStr) => {
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  // Adding prefix '20' to the year for correct date parsing
  const parts = dateStr.split('.');
  const formattedDateStr = `20${parts[2]}-${parts[1]}-${parts[0]}`;

  const date = new Date(formattedDateStr);

  if (isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateStr}`);
    return 'Invalid date';
  }

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  return `${dateStr} ${dayOfWeek}`;
};
