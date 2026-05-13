"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
// MUI
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import Select from "@mui/material/Select";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
// CHART OPTIONS
import { analyticsChartOptions } from "./chart-options";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton animation="wave" height={300} />
});

// STYLED COMPONENT
const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[600],
  "& fieldset": { border: "0 !important" },
  "& .MuiSelect-select": { padding: 0, paddingRight: "8px !important" }
}));

type Props = {
  categories: string[];
  sales: number[];
  expense: number[];
};

export default function Analytics({ categories, sales, expense }: Props) {
  const theme = useTheme();
  const [selectType, setSelectType] = useState("yearly");
  const series = [
    { name: "Sales", data: sales },
    { name: "Expense", data: expense }
  ];

  return (
    <Card sx={{ p: 3 }}>
      <FlexBetween>
        <Typography variant="h5">Analytics</Typography>

        <StyledSelect
          value={selectType}
          IconComponent={() => <KeyboardArrowDown />}
          onChange={(e) => setSelectType(e.target.value as string)}>
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
        </StyledSelect>
      </FlexBetween>

      <ApexChart
        type="bar"
        height={300}
        series={series}
        options={analyticsChartOptions(theme, categories)}
      />
    </Card>
  );
}
