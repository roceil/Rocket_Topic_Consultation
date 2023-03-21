/* eslint-disable import/prefer-default-export */
const IS_BROWSER = typeof window !== 'undefined';

export const setupMocks = async () => {
  if (IS_BROWSER) {
    const { worker } = await import('./browser');
    worker.start();
  } else {
    const { mswServer } = await import('./server');
    mswServer.listen();
  }
};
