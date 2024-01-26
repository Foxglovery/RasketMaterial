import { useEffect, useState } from "react"
import { GetServices } from "../../managers/serviceManager";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function ServiceListAdmin() {
  const [services, setServices] = useState([]);

  const renderVenueNames = (venueServices) => {
    return venueServices.map(vs => vs.venue.venueName).join(", ");
  }

  useEffect(() => {
    GetServices().then(setServices);
  }, [])

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

      <Typography variant="h3" style={{ marginBottom: "1rem" }}>Services</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Available At</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((s, index) => (
              <TableRow key={s.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{s.serviceName}</TableCell>
                <TableCell>{s.description}</TableCell>
                <TableCell>{renderVenueNames(s.venueServices)}</TableCell>
                <TableCell>${s.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}