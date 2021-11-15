import expect from 'must';
import { privacyMask } from '../../lib';

/**
 * 单元测试 'privacy-mask'
 *
 * @author gintangible
 */
describe('privacyMask', () => {
  it('01 privacyMask str的长度 1-18', () => {
    expect(privacyMask('1')).equal('1');
    expect(privacyMask('12')).equal('1*');
    expect(privacyMask('123')).equal('1*3');
    expect(privacyMask('1234')).equal('1**4');
    expect(privacyMask('12345')).equal('12**5');
    expect(privacyMask('123456')).equal('12***6');
    expect(privacyMask('1234567')).equal('12***67');
    expect(privacyMask('12345678')).equal('12****78');
    expect(privacyMask('123456789')).equal('123****89');
    expect(privacyMask('1234567890')).equal('123*****90');
    expect(privacyMask('12345678901')).equal('123*****901');
    expect(privacyMask('123456789012')).equal('123******012');
    expect(privacyMask('1234567890123')).equal('1234******123');
    expect(privacyMask('12345678901234')).equal('1234*******234');
    expect(privacyMask('123456789012345')).equal('1234*******2345');
    expect(privacyMask('1234567890123456')).equal('1234********3456');
    expect(privacyMask('12345678901234567')).equal('12345********4567');
    expect(privacyMask('123456789012345678')).equal('12345*********5678');
  });

  it('02 privacyMask maskLength = 2', () => {
    expect(privacyMask('12', { maskLength: 2 })).equal('1**');
    expect(privacyMask('123', { maskLength: 2 })).equal('1**3');
    expect(privacyMask('1234', { maskLength: 2 })).equal('1**4');
    expect(privacyMask('1234567890123', { maskLength: 2 })).equal('1234**123');
    expect(privacyMask('123456789012345678', { maskLength: 2 })).equal('12345**5678');
  })

  it('03 privacyMask mask = #', () => {
    expect(privacyMask('12', { mask: '#' })).equal('1#');
    expect(privacyMask('123', { mask: '#' })).equal('1#3');
    expect(privacyMask('1234', { mask: '#' })).equal('1##4');
    expect(privacyMask('12345', { mask: '#' })).equal('12##5');
    expect(privacyMask('123456', { mask: '#' })).equal('12###6');
  })

  it('04 privacyMask maskLength = 2 mask = #', () => {
    expect(privacyMask('12', { maskLength: 2, mask: '#' })).equal('1##');
    expect(privacyMask('123', { maskLength: 2, mask: '#' })).equal('1##3');
    expect(privacyMask('1234', { maskLength: 2, mask: '#' })).equal('1##4');
    expect(privacyMask('1234567890123', { maskLength: 2, mask: '#' })).equal('1234##123');
    expect(privacyMask('123456789012345678', { maskLength: 2, mask: '#' })).equal('12345##5678');
  })
});
