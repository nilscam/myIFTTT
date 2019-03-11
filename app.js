const appApi = require('./api/app');

if (process.env.NODE_ENV === 'production') {
  console.log('production')
  appApi.launch_api(80)
} else {
  appApi.launch_api(8080)
}
