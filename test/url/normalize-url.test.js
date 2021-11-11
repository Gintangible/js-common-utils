import expect from 'must';
import queryString from 'query-string';
import { getSearch, normalizeUrl } from '../../tmp/guxw-util';
/**
 * 单元测试 'normalizeUrl'
 *
 * @author gintangible
 */
describe('normalizeUrl', () => {
  it('01 参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('02 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('03 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('04 参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('05 参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('06 参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('07 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('08 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('09 参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('10 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('11 参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('12 参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/');
  });

  it('13 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('14 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('15 参数为字符串，没有hash，只有querystring，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('16 参数为字符串，没有hash，没有querystring', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/');
  });

  it('17 参数为字符串，没有hash，querystring参数值为空字符串，querystring参数为URL编码', () => {
    const url = 'http://192.168.199.2:8081/?%24value=';
    const result = normalizeUrl(url);
    expect(result).equal('http://192.168.199.2:8081/?%24value=');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).equal('');
  });
});
