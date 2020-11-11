import ExtendedRequest from './ExtendedRequest';

export default interface Context {
  req: ExtendedRequest;
  user: { userId: string; iat: number };
}
