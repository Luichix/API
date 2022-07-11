import express from 'express';
import diaryRouter from './routes/diaries';

const app = express();
app.use( express.json())

const PORT =  3000;

app.get('/', (_req, res) => {
    console.log('Hello World');
    res.send('Hello World!' );
})

app.use('/api/diaries', diaryRouter); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})