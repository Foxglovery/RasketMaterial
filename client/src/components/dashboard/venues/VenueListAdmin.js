import { useEffect, useState } from "react";
import { GetVenues } from "../../managers/venueManager";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function VenueListAdmin() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    GetVenues().then(setVenues);
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
        <Link to={`/admin/services`}>Services</Link>
      </div>

      <Typography variant="h3" gutterBottom>Venues</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Max Occupancy</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.venueName}</TableCell>
                <TableCell>{v.address}</TableCell>
                <TableCell>{v.contactInfo}</TableCell>
                <TableCell>{v.maxOccupancy}</TableCell>
                <TableCell><Link to={`${v.id}`}>Details</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}