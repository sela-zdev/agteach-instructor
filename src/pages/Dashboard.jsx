import Grid from '@mui/material/Grid2';

import TopPerformance from '../components/dashboard/TopPerformance';
import Overview from '../components/dashboard/Overview';
import { ApplicationSubmitted } from '../components/dashboard/ApplicationSubmitted';
import { ApplicationRejected } from '../components/dashboard/ApplicationRejected';
import { Typography } from '@mui/material';

export default function DashboardPage() {
  const isApproved = false;
  const isRejected = false;
  const isFormSubmitted = false;

  if (!isApproved) {
    if (isFormSubmitted && !isRejected) {
      return <ApplicationSubmitted />;
    }
    if (isFormSubmitted && isRejected) {
      return <ApplicationRejected />;
    }
    return <Typography>Add Application Form Component and Application Instruction Here</Typography>;
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 12 }}>
        <Overview />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TopPerformance />
      </Grid>
    </Grid>
  );
}
