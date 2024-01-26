import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetEventById } from "../../managers/eventManager";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from "@mui/material";

export default function EventDetailsAdmin() {
  const { id } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    GetEventById(id).then(setEvent);
  }, [id]);

  return (
    <>
      <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
      
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>Event</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th">Name</TableCell>
              <TableCell>{event?.eventName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Venue</TableCell>
              <TableCell>{event?.venue.venueName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Description</TableCell>
              <TableCell>{event?.eventDescription}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th"># Attendees</TableCell>
              <TableCell>
                {event?.expectedAttendees} / {event?.venue.maxOccupancy}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Submitted On</TableCell>
              <TableCell>{event?.submitedOn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Event Start</TableCell>
              <TableCell>{event?.eventStart}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Event End</TableCell>
              <TableCell>{event?.eventEnd}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Is Public</TableCell>
              <TableCell>{event?.isPublic ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Total Cost</TableCell>
              <TableCell>${event?.totalCost}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" style={{ marginTop: "1rem" }}>Event Services</Typography>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        <Table>
          <TableBody>
            {event?.eventServices.map((service, serviceIndex) => (
              <TableRow key={serviceIndex}>
                <TableCell>{serviceIndex + 1}</TableCell>
                <TableCell>{service.service.serviceName}</TableCell>
                <TableCell>{service.service.description}</TableCell>
                <TableCell>${service.service.price}</TableCell>
                <TableCell>{service.service.isActive ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}