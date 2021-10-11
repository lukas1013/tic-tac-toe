import { app } from './app';
const PORT = 5000

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})