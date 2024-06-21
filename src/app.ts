import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import notFound from './app/middlewars/notFound';
import route from './app/route';
import globalErrorHandler from './app/middlewars/globalErrorHandelar';

// parsors
app.use(express.json());
app.use(cors());

// here is the main functionality where all route called. to simplyfy and avoid DRY we creat a folder named rout and in the rout folder we have index.ts where we called all the rout and then it comes here as route

// present setup
app.use('/api', route);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'somthing went worng';

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// });
app.use(notFound);
export default app;
