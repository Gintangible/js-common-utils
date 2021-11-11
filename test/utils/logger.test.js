import logger from '../../tmp/logger';

/**
 * 单元测试 'logger'
 *
 * @author gintangible
 */
describe('logger', () => {
  it('01 logger.debug', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.debug('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('02 logger.info', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.info('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('03 logger.warn', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.warn('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
  it('04 logger.error', () => {
    const arg1 = 'hello';
    const arg2 = {
      name: 'world',
      value: 123,
    };
    logger.error('This is a debug statement: {0}, and another is {1} that is all.', arg1, arg2);
  });
});
