const { CronJob } = require('cron');
const app = require('./app');
const { emailVideosToEveryUser } = require('./jobs/videos');

const job = new CronJob('0 0 * * *', async () => {
  try {
    console.log('Cron job started');
    await emailVideosToEveryUser();
    console.log('Cron job completed successfully');
  } catch (error) {
    console.error('Cron job failed', error);
  }
}, null, true, 'America/Los_Angeles');

job.start();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
