import { Button, Card } from "antd";
import "./TicketCard.scss";
import { formatDateWithDay, getStopsText } from "../../utils/utils";
const TicketCard = ({ ticket, getPriceFn, getAirlineDetails }) => {
    const { name, logo } = getAirlineDetails(ticket.carrier);
    return (
        <div key={ticket.id}>
            <Card className="cardContainer">
                <div className="ticketCard">
                    <div className="ticketCard__aside">
                        <div className="ticketCard__logo">
                            <div className="airlines">{name}</div>
                            <img src={logo} alt={`${name} logo`} className="airline-logo" width={50} height={50} />
                        </div>
                        <Button color={"#ff6d00"}>
                            <div>
                                <p>Купить</p>
                                <p> за {getPriceFn(ticket)}</p>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <div className="infoAboutTime">
                            <h2>{ticket.departure_time}</h2>
                            <div className="airlineVector">
                                <div>{getStopsText(ticket.stops)}</div>
                                <div> <img src={"/assets/airlineVector.png"} className="airline-logo" width={100} /></div>
                            </div>
                            <h2>{ticket.arrival_time}</h2>
                        </div>
                        <div className="infoAboutDate">
                            <div>
                                <p className="airportName">{ticket.origin},{ticket.origin_name}</p>
                                <p>{formatDateWithDay(ticket.departure_date)}</p>
                            </div>

                            <div>
                                <p className="airportName">{ticket.destination},{ticket.destination_name}</p>
                                <p>{formatDateWithDay(ticket.arrival_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TicketCard;