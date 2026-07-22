import express from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./routes";
import { requestIdMiddleware } from "./middlewares/requestId.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { notFoundMiddleware } from "./middlewares/notFound.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

// Runs for EVERY fucking request
app.use(requestIdMiddleware);

// Logs every request
app.use(loggerMiddleware);

// API routes
app.use("/api/v1", routes);

// Runs only if no route matched
app.use(notFoundMiddleware);

// Must always be last
app.use(errorMiddleware);

export default app;