import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { GetVenueById } from "../../managers/venueManager";

export default function VenueDetailsAdmin() {
  const { id } = useParams();
  const [venue, setVenue] = useState([]);

  useEffect(() => {
    GetVenueById(id).then(setVenue);
  }, [id])
    
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
      
      <Typography variant="h3" gutterBottom>Venue</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell component="th">Name</TableCell>
              <TableCell>{venue?.venueName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Description</TableCell>
              <TableCell>{venue?.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Max Occupancy</TableCell>
              <TableCell>{venue?.maxOccupancy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Address</TableCell>
              <TableCell>{venue?.address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Contact Info</TableCell>
              <TableCell>{venue?.contactInfo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">Is Active</TableCell>
              <TableCell>{venue?.isActive ? "Yes" : "No"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom>Venue Services</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>IsActive</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venue.venueServices?.map((service, serviceIndex) => (
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
  )
}