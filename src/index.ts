import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Job Tracker API running');
});

app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
