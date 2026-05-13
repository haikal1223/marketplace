import Grid from "@mui/material/Grid";
// LOCAL CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import StockOutProducts from "../stock-out-products";
// API FUNCTIONS
import api from "utils/__api__/dashboard";
// DATA TYPES
import { Card } from "../types";

export default async function AdminDashboardPageView() {
  const cardList: Card[] = await api.getAllCard();
  const metrics = await api.dashboardMetrics();

  return (
    <div className="pt-2 pb-2">
      <Grid container spacing={3}>
        <Grid size={{ md: 6, xs: 12 }}>
          <WelcomeCard
            userName={metrics.welcome.userName}
            todayVisit={metrics.welcome.todayVisit}
            todaySales={metrics.welcome.todaySales}
          />
        </Grid>

        <Grid container spacing={3} size={{ md: 6, xs: 12 }}>
          {cardList.map((item) => (
            <Grid size={{ sm: 6, xs: 12 }} key={item.id}>
              <Card1
                title={item.title}
                color={item.color}
                amount1={item.amount1}
                amount2={item.amount2}
                percentage={item.percentage}
                status={item.status === "down" ? "down" : "up"}
              />
            </Grid>
          ))}
        </Grid>

        <Grid size={12}>
          <Sales summary={metrics.salesSummary} />
        </Grid>

        <Grid size={12}>
          <Analytics
            categories={metrics.analytics.categories}
            sales={metrics.analytics.sales}
            expense={metrics.analytics.expense}
          />
        </Grid>

        <Grid size={{ md: 7, xs: 12 }}>
          <RecentPurchase />
        </Grid>

        <Grid size={{ md: 5, xs: 12 }}>
          <StockOutProducts />
        </Grid>
      </Grid>
    </div>
  );
}
