import expect from 'must';
import queryString from 'query-string';
import { getSearch, removeSearchParam } from '../../lib';

/**
 * 单元测试 'removeSearchParam'
 *
 * @author gintangible
 */
describe('removeSearchParam', () => {
  it('01 参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
  });
  it('02 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('03 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?value=zzz&source=nanjing-bank&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('04 参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('05 参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&value=zzz&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('06 参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#/';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('07 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&value=zzz&params=xxxx#finish/';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('08 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&source=value2&value=zzz&params=xxxx#/finish/';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('09 参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=&value&params=xxxx#';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).is.null();
  });
  it('10 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source&value=v1&params=xxxx&value=v2#finish';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?params=xxxx&value=v1&value=v2#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.value).is.array();
    expect(args.value).eql(['v1', 'v2']);
  });
  it('11 参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&%24value=zzz%26yyy&params=xxxx';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/?%24value=zzz%26yyy&params=xxxx');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('12 参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = removeSearchParam('source', url);
    expect(result).equal('http://192.168.199.2:8081/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).is.undefined();
    expect(args.value).is.undefined();
  });
});
