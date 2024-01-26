import { useEffect, useState } from "react";
import { GetProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    GetProfiles().then(setUserProfiles);
  }, []);

  return (
    <>
      <div>
        <Link to={`/admin/events`}>Events</Link>
      </div>
      <div>
        <Link to={`/admin/venues`}>Venues</Link>
      </div>
      <div>
        <Link to={`/admin/services`}>Services</Link>
      </div>
      <Typography variant="h3" gutterBottom>Users</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>IsAdmin</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProfiles.map((up) => (
              <TableRow key={up.id}>
                <TableCell>{up.id}</TableCell>
                <TableCell>{up.firstName}</TableCell>
                <TableCell>{up.lastName}</TableCell>
                <TableCell>{up.userName}</TableCell>
                <TableCell>{up.email}</TableCell>
                <TableCell>{up.address}</TableCell>
                <TableCell>{up.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Link to={`${up.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}