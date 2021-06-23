import expect from 'must';
import { urlUtils } from '../main';
const { getHash } = urlUtils;

/**
 * 单元测试 'getHash'
 *
 * @author gintangible
 */
describe('getHash', () => {
  it('参数为字符串，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('/');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('finish/');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('/finish/');
  });
  it('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal('finish');
  });
  it('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/';
    expect(getHash(url))
      .equal('/');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/';
    expect(getHash(url))
      .equal('finish/');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/';
    expect(getHash(url))
      .equal('/finish/');
  });
  it('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#';
    expect(getHash(url))
      .equal('');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    expect(getHash(url))
      .equal('finish');
  });
  it('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    expect(getHash(url))
      .equal(null);
  });
  it('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    expect(getHash(url))
      .equal(null);
  });

  it('参数为URL对象，querystring在hash后面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('/');
  });
  it('参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('finish/');
  });
  it('参数为URL对象，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('/finish/');
  });
  it('参数为URL对象，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('');
  });
  it('参数为URL对象，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal('finish');
  });
  it('参数为URL对象，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/');
    expect(getHash(url))
      .equal('/');
  });
  it('参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/');
    expect(getHash(url))
      .equal('finish/');
  });
  it('参数为URL对象，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/');
    expect(getHash(url))
      .equal('/finish/');
  });
  it('参数为URL对象，querystring在hash前面，hash为空URL对象，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#');
    expect(getHash(url))
      .equal('');
  });
  it('参数为URL对象，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish');
    expect(getHash(url))
      .equal('finish');
  });
  it('参数为URL对象，没有hash，只有参数', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx');
    expect(getHash(url))
      .equal(null);
  });
  it('参数为URL对象，没有hash，没有参数', () => {
    const url = new URL('http://192.168.199.2:8081/');
    expect(getHash(url))
      .equal(null);
  });
});
