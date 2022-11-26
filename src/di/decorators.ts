import 'reflect-metadata';

export const INJECTION_TOKENS = 'injectionTokens';

export function inject(token: string) {
  return function (target: Object, _: string, index: number) {
    const descriptors = Reflect.getMetadata(INJECTION_TOKENS, target) || {};

    descriptors[index] = token;
    Reflect.defineMetadata(INJECTION_TOKENS, descriptors, target);
  };
}
