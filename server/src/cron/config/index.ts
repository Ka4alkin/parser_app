module.exports = {
  hello: {
    frequency: '*/30 * * * * *',
    handler: 'src/cron/handlers/sayhello',
  },
  loadRssPosts: {
    frequency: '*/30 * * * * *',
    handler: 'src/cron/handlers/loadRssPosts',
  },
};