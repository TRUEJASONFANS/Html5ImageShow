var util = require("util"),
  neuron = require("neuron");

//
// Create the manager and set the job.
//
var manager = new neuron.JobManager();
manager.addJob("task1", {
  dirname: __dirname,
  concurrency: 25,
  work: function(dirname) {
    var self = this;
    console.log("task1 finished");
    self.finished = true;
  }
});

manager.addJob("task2", {
  dirname: __dirname,
  work: function(dirname) {
    var self = this;
    console.log("task2 finished");
    self.finished = true;
  }
});

//
// Start a worker and listen for finish
//
manager.on("finish", function(job, worker) {
  //
  // Log the result from the worker (the directory listing for '/')
  //
  console.dir(worker.stdout);
});

//
// All arguments passed to the enqueue() function after the job name
// are consumed by the work() function passed to the job.
//
manager.enqueue("task1", "/");
manager.enqueue("task2", "/");
