import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import StatCard from "../../components/statcard";
import ChartCard from "../../components/chartCard";
import EventList from "../../components/eventList";
import { useSelector } from "react-redux";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {role}
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Students" value="1,200" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Teachers" value="45" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Fees Collected" value="$25,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Attendance" value="1,050" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ChartCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <EventList />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" href="/add-student">
              Add Student
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" href="/manage-classes">
              Manage Classes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
