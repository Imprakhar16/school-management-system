import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const StatCard = ({ title, value, active }) => (
  <Card sx={{ minWidth: 200 }}>
    <CardContent>
      {/* Title */}
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>

      {/* Total + subscript-style active */}
      <Box display="flex" alignItems="flex-end">
        <Typography variant="h4" fontWeight={600} sx={{ lineHeight: 1 }}>
          {value}
        </Typography>

        {active !== undefined && (
          <Typography
            component="sub"
            sx={{
              fontSize: "1 rem",
              color: "text.secondary",
              ml: 0.3,
              position: "relative",
              bottom: "-0.3em",
            }}
          >
            ( {active} Active )
          </Typography>
        )}
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
