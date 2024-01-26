import { useEffect, useState } from "react";
import { AdminCancelEvent, ApproveEvent, DeleteEvent, GetEvents, RejectEvent } from "../../managers/eventManager";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function DashboardEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    GetEvents().then(setEvents);
  }, []);

  const handleApprove = (id) => {
    ApproveEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };

  const handleCancel = (id) => {
    AdminCancelEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };
  const handleReject = (id) => {
    RejectEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };
  const handleDelete = (id) => {
    DeleteEvent(id).then(() => {
      GetEvents().then(setEvents);
    });
  };

  return (
    <>
      <div>
        <Link to={`/userprofiles`}>Users</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
      <h3>Events</h3>
      <div>
        <Button variant="contained" color="success">Add Event</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.id}</TableCell>
                <TableCell>{e.eventName}</TableCell>
                <TableCell>{e.userProfile.firstName} {e.userProfile.lastName}</TableCell>
                <TableCell>{e.venue.venueName}</TableCell>
                <TableCell>{e.venue.address}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(e.id)} disabled={e.status === "Approved"}>
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleCancel(e.id)} disabled={e.status !== "Approved"}>
                    Cancel
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleReject(e.id)} disabled={e.status !== "Pending"}>
                    Reject
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDelete(e.id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Link to={`${e.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}