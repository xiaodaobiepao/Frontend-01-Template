const fsevents = require('fsevents')
const stop = fsevents.watch(__dirname, (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id)
  stop()
})