import { logger } from '../main';

/**
 * 单元测试 'logger'
 *
 * @author gintangible
 */
describe('logger', () => {
  it('logger.debug', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.debug('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('logger.info', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.info('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('logger.warn', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.warn('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('logger.error', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.error('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
});
