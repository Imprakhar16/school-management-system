import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Box, Paper, Stack, Divider } from "@mui/material";
import StatCard from "../../components/statcard";
import ChartCard from "../../components/chartCard";
import EventList from "../../components/eventList";
import { fetchAllTeachers } from "../../services/teacherServices";
import { fetchStudent } from "../../services/studentServices";

const Home = () => {
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const role = localStorage.getItem("role");
  useEffect(() => {
    const getTeachers = async () => {
      const data = await fetchAllTeachers({ page: 1, limit: 1000 });
      setTotalTeachers(data?.meta?.totalTeachers || 0);
    };
    getTeachers();
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchStudent({ page: 1, limit: 1000 });
      setTotalStudents(data?.meta?.totalStudents || 0);
    };
    getStudents();
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
          Welcome, {role}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          Here’s what’s happening today at your school
        </Typography>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Students" value={totalStudents} color="#42a5f5" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Teachers" value={totalTeachers} color="#66bb6a" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Fees Collected" value="$25,000" color="#ffb74d" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Attendance" value="1,050" color="#ab47bc" />
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
          mt: 4,
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
