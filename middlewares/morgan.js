//Morgan Middleware
const path = require("path");
const rfs = require("rotating-file-stream");

const logsDir = path.resolve(process.cwd(), "access_logs")
let accessLogStream = rfs.createStream("access.log", {
    interval: "1h",
    path: logsDir
  });

module.exports = { accessLogStream };
      