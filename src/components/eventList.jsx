import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";

const events = [
  { date: "Oct 12", title: "Parent-Teacher Meeting" },
  { date: "Oct 18", title: "Sports Day" },
  { date: "Oct 25", title: "Science Exhibition" },
  { date: "Oct 30", title: "Annual Function" },
];

const EventList = () => (
  <Card
    elevation={4}
    sx={{
      borderRadius: 4,
      p: 1,
      background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,255,0.9))",
      backdropFilter: "blur(12px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 10px 30px rgba(63,81,181,0.2)",
        transform: "translateY(-3px)",
      },
    }}
  >
    <CardContent>
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{
          background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        Upcoming Events
      </Typography>

      <List disablePadding>
        {events.map((event, idx) => (
          <React.Fragment key={idx}>
            <ListItem
              sx={{
                px: 1,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  background: "rgba(63,81,181,0.05)",
                  transform: "scale(1.01)",
                  transition: "0.2s ease",
                },
              }}
            >
              <Box
                sx={{
                  minWidth: 70,
                  height: 36,
                  borderRadius: 2,
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #3f51b5, #5c6bc0)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {event.date}
              </Box>
              <ListItemText
                primary={
                  <Typography fontWeight={600} fontSize={15}>
                    {event.title}
                  </Typography>
                }
              />
            </ListItem>

            {idx < events.length - 1 && <Divider sx={{ my: 1, opacity: 0.3 }} />}
          </React.Fragment>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default EventList;
