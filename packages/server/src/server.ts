import app  from './app';
import socket from './socket'
const server = socket(app)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})