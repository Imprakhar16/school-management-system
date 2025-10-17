import { Box } from "@mui/material";

export const renderArrayChips = (items, getLabel) => {
  console.log(items);

  if (!items || items.length === 0) return "-";

  return items.map((item, idx) => (
    <Box
      key={item._id || item.id || idx}
      sx={{
        display: "inline-block",
        background: "#f0f4ff",
        color: "#1e3c72",
        px: 1.5,
        py: 0.5,
        borderRadius: "12px",
        fontSize: "0.8rem",
        fontWeight: 500,
        mr: 0.5,
        mb: 0.5,
      }}
    >
      {getLabel ? getLabel(item) : item}
    </Box>
  ));
};
