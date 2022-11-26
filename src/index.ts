import { Application } from './Application';
import { Logger } from './log/Logger';
import { container } from './di/container';

container.register({ token: 'Logger', useClass: Logger });
const application = container.resolve<Application>(Application);

application.server();
