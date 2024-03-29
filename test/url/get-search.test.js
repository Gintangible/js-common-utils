import expect from 'must';
import { getSearch } from '../../lib';
/**
 * 单元测试 'getSearch'
 *
 * @author gintangible
 */
describe('getSearch', () => {
  it('01 参数为字符串，querystring在hash后面', () => {
    const url = 'http://192.168.199.2:8081/#/?source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D';
    expect(getSearch(url))
      .equal('source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D');
  });
  it('02 参数为字符串，querystring在hash前面', () => {
    const url = 'http://192.168.199.2:8081/?source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D#/';
    expect(getSearch(url))
      .equal('source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D');
  });
  it('03 参数为URL对象，querystring在hash后面', () => {
    const url = new URL('http://192.168.199.2:8081/#/?source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D');
    expect(getSearch(url))
      .equal('source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D');
  });
  it('04 参数为URL对象，querystring在hash前面', () => {
    const url = new URL('http://192.168.199.2:8081/?source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D#/');
    expect(getSearch(url))
      .equal('source=nanjing-bank'
        + '&params=eyJuYW1lIjoi5p6X5YWJ5LquIiwiY3JlZGVudGlhbCI6eyJ0eXBlIjoiSU'
        + 'RFTlRJVFlfQ0FSRCIsIm51bWJlciI6IjMyMTMyMjE5OTAxMDAxMDExNiJ9LCJtb2Jp'
        + 'bGUiOiIxNTg1MjkxMTM0MyJ9&signature=zkeAp3LNpFRcpdmlcGGlQx5uK6PyXzD'
        + 'qwZrcsLzB25GJMyW46zGPmc%2F1%2F9pWe9J%2BBxMIdj8T%2FuZCAwupHuSrDQjD9'
        + 'hhFkw5au0D2J1MsV098kufyfn1NVsoU9ddP8HaNFa0ySv1v1q6aMhwrpdqstDC8Yc%'
        + '2Ba%2FrJvwEazc3agMzo%3D');
  });
  it('05 参数为字符串，queryString在hash前后都有', () => {
    const url = 'http://192.168.199.2:8081/?VTBSs=66252160765305489865824&'
        + 'VTBSq=26#/finish?source=picc_default&td_channelid=picc_default&'
        + 'product=ninghuibao-2021-picc-standard';
    expect(getSearch(url))
      .equal('VTBSs=66252160765305489865824&VTBSq=26&source=picc_default&td'
        + '_channelid=picc_default&product=ninghuibao-2021-picc-standard');
  });
  it('06 参数为URL对象，queryString在hash前后都有', () => {
    const url = new URL('http://192.168.199.2:8081/?VTBSs=66252160765305489'
        + '865824&VTBSq=26#/finish?source=picc_default&td_channelid=picc_de'
        + 'fault&product=ninghuibao-2021-picc-standard');
    expect(getSearch(url))
      .equal('VTBSs=66252160765305489865824&VTBSq=26&source=picc_default&td'
        + '_channelid=picc_default&product=ninghuibao-2021-picc-standard');
  });
});
