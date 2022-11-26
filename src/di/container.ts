import 'reflect-metadata';
import { INJECTION_TOKENS } from './decorators';

interface IContainer {
  token: string;
  useClass: Function;
}

interface IProdiver {
  [key: string]: any;
}

export class Container {
  private static instance: Container;
  readonly providers: IProdiver = {};

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  register({ token, useClass }: IContainer): void {
    this.providers[token] = useClass;
  }

  resolve<T = unknown>(targetClass: any): T {
    const hasDependencies = Reflect.getMetadata(INJECTION_TOKENS, targetClass);
    const tokens = (hasDependencies && Object.values(hasDependencies)) || [];

    const injections = tokens.map((token: string) => {
      const provider = this.providers[token];

      if (provider.prototype) {
        return this.resolve(provider);
      }

      return provider;
    });

    this.providers[targetClass.name] = new targetClass(...injections);

    return this.providers[targetClass.name];
  }
}

export const container = Container.getInstance();
