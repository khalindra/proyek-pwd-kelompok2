import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bukuRoutes from './routes/bukuRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/buku', bukuRoutes)

app.get('/', (req, res) => res.json({ message: 'API Perpustakaan aktif' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))
