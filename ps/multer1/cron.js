var cron = require('node-cron');
 
var task = cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
  var r=2*2;
  console.log(r)
});
 
//task.start();