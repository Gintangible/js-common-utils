import expect from 'must';
import { getParsedSearch } from '../../lib';
/**
 * 单元测试 'getParsedSearch'
 *
 * @author gintangible
 */
describe('getParsedSearch', () => {
  it('01 参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank&params=xxxx';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
  });
  it('02 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('03 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#/finish/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('04 参数为字符串，querystring在hash后面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('05 参数为字符串，querystring在hash后面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/#finish?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('06 参数为字符串，querystring在hash前面，hash为空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('07 参数为字符串，querystring在hash前面，hash为非空字符串，hash以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish/';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('08 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#/finish';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('09 参数为字符串，querystring在hash前面，hash为空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('10 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz#finish';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('11 参数为字符串，没有hash，只有参数', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&value=zzz';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.value).equal('zzz');
  });
  it('12 参数为字符串，没有hash，没有参数', () => {
    const url = 'http://192.168.199.2:8081/?value=zzz';
    const args = getParsedSearch(url);
    expect(args.value).equal('zzz');
  });

  it('13 参数为字符串，querystring在hash后面，hash为非空字符串，hash以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/#finish/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('14 参数为字符串，querystring在hash前面，hash为非空字符串，hash不以反斜杠结尾，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy#finish';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('15 参数为字符串，没有hash，只有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank&params=xxxx&%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.source).equal('nanjing-bank');
    expect(args.params).equal('xxxx');
    expect(args.$value).equal('zzz&yyy');
  });
  it('16 参数为字符串，没有hash，没有参数，需要URL编码新参数和值', () => {
    const url = 'http://192.168.199.2:8081/?%24value=zzz%26yyy';
    const args = getParsedSearch(url);
    expect(args.$value).equal('zzz&yyy');
  });

  it('17 参数为字符串，没有hash，没有参数，新参数值为空字符串', () => {
    const url = 'http://192.168.199.2:8081/?%24value=';
    const args = getParsedSearch(url);
    expect(args.$value).equal('');
  });
});
