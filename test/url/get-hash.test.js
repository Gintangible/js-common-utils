import expect from 'must';
import { getHash } from '../../lib';

/**
 * 单元测试 'getHash'
 *
 * @author gintangible
 */
describe('getHash', () => {
  it('01 参数为字符串，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('/');
  });
  it('02 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('finish/');
  });
  it('03 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('/finish/');
  });
  it('04 参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('');
  });
  it('05 参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('finish');
  });
  it('06 参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/';
    expect(getHash(url))
      .equal('/');
  });
  it('07 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/';
    expect(getHash(url))
      .equal('finish/');
  });
  it('08 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/';
    expect(getHash(url))
      .equal('/finish/');
  });
  it('09 参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#';
    expect(getHash(url))
      .equal('');
  });
  it('10 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    expect(getHash(url))
      .equal('finish');
  });
  it('11 参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal(null);
  });
  it('12 参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    expect(getHash(url))
      .equal(null);
  });

  it('13 参数为URL对象，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('/');
  });
  it('14 参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('finish/');
  });
  it('15 参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('/finish/');
  });
  it('16 参数为URL对象，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('');
  });
  it('17 参数为URL对象，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('finish');
  });
  it('18 参数为URL对象，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/');
    expect(getHash(url))
      .equal('/');
  });
  it('19 参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/');
    expect(getHash(url))
      .equal('finish/');
  });
  it('20 参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/');
    expect(getHash(url))
      .equal('/finish/');
  });
  it('21 参数为URL对象，querystring在hash前面，hash为空URL对象，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#');
    expect(getHash(url))
      .equal('');
  });
  it('22 参数为URL对象，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish');
    expect(getHash(url))
      .equal('finish');
  });
  it('23 参数为URL对象，没有hash，只有参数', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal(null);
  });
  it('24 参数为URL对象，没有hash，没有参数', () => {
    const url = new URL('http://192.168.199.2:8081/');
    expect(getHash(url))
      .equal(null);
  });
});
