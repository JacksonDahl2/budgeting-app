import express, { Request, Response } from 'express';
import redis, { createClient } from 'redis'
const redisClient = createClient({
  url: 'redis://redis:6379'
})
redisClient.connect()
redisClient.on('error', (err) => console.log('Redis Client Error', err));


const app = express();
const port = process.env.PORT || 3000;

app.post('/store', async (req: Request, res: Response) => {
  const key = 'blah'
  const value = 'blah blah'
  await redisClient.set(key, value)
  res.send(`Data stored for key ${key}`);
})

app.get('/start', async (req: Request, res: Response) => {
  const value = await redisClient.get('blah')
  res.send(value)
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});
app.get('/end', async (req: Request, res: Response) => {
  const key = 'blah'
  const value = 'blah blah'
  await redisClient.set(key, value, {
    EX: 10
  })
  res.send(`Data stored for key ${key}`);
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});