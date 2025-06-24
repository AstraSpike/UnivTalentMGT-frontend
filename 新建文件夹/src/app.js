import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import personnelRouter from './routes/personnel.js';
import demandRouter from './routes/demand.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/personnel', personnelRouter);
app.use('/api/demand', demandRouter);
app.use('/api/user', userRouter);
app.use('/api', authRouter);

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
});

export default app;    