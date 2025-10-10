import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const events = [
  { date: "Oct 12", title: "Parent-Teacher Meeting" },
  { date: "Oct 18", title: "Sports Day" },
];

const EventList = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Upcoming Events
      </Typography>
      <List>
        {events.map((event, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={event.title} secondary={event.date} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default EventList;
