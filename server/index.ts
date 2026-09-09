import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { inquiryRouter } from './routes/inquiries';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3005;
const isProduction = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));
app.use(
  helmet({
    contentSecurityPolicy: isProduction
      ? {
          directives: {
            baseUri: ["'self'"],
            defaultSrc: ["'self'"],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            formAction: ["'self'"],
            frameAncestors: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          },
        }
      : false,
    crossOriginEmbedderPolicy: false,
  }),
);

app.use('/api', inquiryRouter);

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/start-project', (_req, res) => {
      res.setHeader('X-Robots-Tag', 'noindex, follow');
      res.sendFile(path.join(distPath, 'index.html'));
    });
    app.get('/', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    app.use((_req, res) => {
      res.status(404).type('text').send('Not Found');
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
