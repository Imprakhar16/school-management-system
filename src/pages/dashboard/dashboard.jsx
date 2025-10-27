import React, { useEffect } from "react";
import { Grid, Typography, Button, Box, Paper, Stack, Divider } from "@mui/material";
import StatCard from "../../components/statcard";
import ChartCard from "../../components/chartCard";
import EventList from "../../components/eventList";
import { useDispatch, useSelector } from "react-redux";
import { dashboardThunk } from "../../features/dashboard/dashboardThunk";

const Home = () => {
  const dispatch = useDispatch();

  const role = localStorage.getItem("role");

  const { data, loading } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(dashboardThunk());
  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Welcome, {role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : ""}
        </Typography>

        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Here’s what’s happening today at your school
        </Typography>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={loading ? "-" : data.students.total}
            active={loading ? undefined : data.students.active}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={loading ? "-" : data.teachers.total}
            active={loading ? undefined : data.teachers.active}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Classes" value={data.classes.total} />
        </Grid>
      </Grid>

      {/* Charts + Events */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Analytics Overview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ChartCard />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Upcoming Events
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <EventList />
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Links */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mt: { xs: 5, md: 9 },
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Quick Links
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
          <Button variant="contained" color="primary" size="large" href="/create-student">
            Add Student
          </Button>
          <Button variant="outlined" color="primary" size="large" href="/classes">
            Manage Classes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
