import express, { Express } from 'express';
import { inject } from './di/decorators';

import { ILogger } from './log/ILogger';

class Application {
  private app: Express;

  constructor(
    @inject('Logger')
    private logger: ILogger
  ) {
    this.app = express();
    this.app.use(express.json());
  }

  server(): void {
    const PORT = process.env.APP_PORT || 4000;

    this.app.listen(PORT, () => {
      this.logger.info(`Server is running on PORT ${PORT}...`);
    });
  }
}

export { Application };
