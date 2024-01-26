import { useEffect, useState } from "react";
import { GetProfile } from "../../managers/userProfileManager";
import { Link, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function UserProfileDetails() {
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    GetProfile(id).then(setUserProfile);
  }, [id]);

  return (
    <>
      <Typography variant="h2" gutterBottom>User</Typography>

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>IsAdmin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{userProfile.firstName} {userProfile.lastName}</TableCell>
              <TableCell>{userProfile.address}</TableCell>
              <TableCell>{userProfile.isAdmin ? "Yes" : "No"}</TableCell>
            </TableRow>
            {/* ... other user properties */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Event Information Table */}
      <Typography variant="h2" gutterBottom>User's Events</Typography>
      {userProfile.events && userProfile.events.map((event, index) => (
        <div key={index}>
          <Typography variant="h3" gutterBottom>
            Event {index + 1}: {event.eventName}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>{event.eventName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Expected Attendees</TableCell>
                  <TableCell>{event.expectedAttendees}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{event.eventDescription}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>{event.status}</TableCell>
                </TableRow>
                {/* ... other event properties */}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Event Services Sub-Table */}
          <Typography variant="h4" gutterBottom>Event Services</Typography>
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
                {event.eventServices.map((service, serviceIndex) => (
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
        </div>
      ))}
    </>
  );
}