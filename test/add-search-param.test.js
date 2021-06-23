import expect from 'must';
import queryString from 'query-string';
import { urlUtils } from '../main';
const { getSearch, addSearchParams } = urlUtils;
/**
 * 单元测试 'addSearchParams'
 *
 * @author gintangible
 */
describe('addSearchParams', () => {
  it('参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({'value': 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish/';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#/finish/';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#';
    const result = addSearchParams({'value': 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({value: 'zzz'}, url);
    expect(result).equal('http://192.168.199.2:8081/?value=zzz');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.value).equal('zzz');
  });

  it('参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({ '$value': 'zzz&yyy'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish/');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx#finish';
    const result = addSearchParams({'$value': 'zzz&yyy'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('参数为字符串，没有hash，只有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx';
    const result = addSearchParams({'$value': 'zzz&yyy'}, url);
    expect(result).equal('http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('参数为字符串，没有hash，没有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({'$value': 'zzz&yyy'}, url);
    expect(result).equal('http://192.168.199.2:8081/?%24value=zzz%26yyy');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).equal('zzz&yyy');
  });

  it('参数为字符串，没有hash，没有参数，新参数值为空字符串', () => {
    const url = 'http://192.168.199.2:8081/';
    const result = addSearchParams({'$value': ''}, url);
    expect(result).equal('http://192.168.199.2:8081/?%24value=');
    const search = getSearch(result);
    const args = queryString.parse(search);
    expect(args.$value).equal('');
  });
});
