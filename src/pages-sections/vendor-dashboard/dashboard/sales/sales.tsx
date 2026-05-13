"use client";

import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";
// LOCAL CUSTOM COMPONENT
import Card2 from "./card-2";
// CHART OPTIONS
import * as options from "../chart-options";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton animation="wave" height={100} width={120} />
});

type SalesSummary = {
  weeklySales: number;
  weeklySalesPercent: string;
  totalOrder: number;
  totalOrderPercent: string;
  productShare: number;
  productSharePercent: string;
  marketShareTotal: number;
  marketSharePercent: string;
};

type Props = { summary: SalesSummary };

export default function Sales({ summary }: Props) {
  const theme = useTheme();
  const weeklySeries = [{ name: "Weekly Sales", data: [summary.weeklySales] }];
  const totalOrderSeries = [{ name: "Monthly Orders", data: [summary.totalOrder] }];
  const marketShareSeries = [
    Math.max(0, Math.min(100, summary.productShare)),
    Math.max(0, Math.min(100, 100 - summary.productShare))
  ];

  return (
    <div>
      <Grid container spacing={3}>
        {/* WEEKLY SALE CHART */}
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card2 title="Weekly Sales" percentage={summary.weeklySalesPercent} amount={currency(summary.weeklySales, 0)}>
            <ApexChart
              type="bar"
              width={150}
              height={130}
              series={weeklySeries}
              options={options.weeklyChartOptions(theme)}
            />
          </Card2>
        </Grid>

        {/* PRODUCT SHARE CHART */}
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card2 title="Product Share" percentage={summary.productSharePercent} amount={`${summary.productShare.toFixed(2)}%`}>
            <ApexChart
              width={140}
              height={200}
              series={[summary.productShare]}
              type="radialBar"
              options={options.productShareChartOptions(theme)}
            />
          </Card2>
        </Grid>

        {/* TOTAL ORDERS CHART */}
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card2 title="Total Order" percentage={summary.totalOrderPercent} amount={summary.totalOrder}>
            <ApexChart
              type="area"
              width={150}
              height={130}
              series={totalOrderSeries}
              options={options.totalOrderChartOptions(theme)}
            />
          </Card2>
        </Grid>

        {/* MARKET SHARE CHART */}
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card2 title="Market Share" percentage={summary.marketSharePercent} amount={currency(summary.marketShareTotal, 0)}>
            <ApexChart
              height={300}
              width={140}
              type="radialBar"
              series={marketShareSeries}
              options={options.marketShareChartOptions(theme)}
            />
          </Card2>
        </Grid>
      </Grid>
    </div>
  );
}
