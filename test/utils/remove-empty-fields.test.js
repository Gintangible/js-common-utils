import expect from 'must';
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import ShallowObject from '../model/ShallowObject';
import DeepObject from '../model/DeepObject';
import Insurant from '../model/Insurant';
import Credential from '../model/Credential';
import CredentialType from '../model/CredentialType';
import Guardian from '../model/Guardian';
import Kinship from '../model/Kinship';
import Gender from '../model/Gender';
import removeEmptyFields from '../../tmp/removeEmptyFields';

/**
 * 单元测试 'removeEmptyFields'
 */
describe('removeEmptyFields', () => {
  it('01 参数为undefined', () => {
    const obj = undefined;
    expect(removeEmptyFields(obj)).is.undefined();
  });
  it('02 参数为null', () => {
    const obj = null;
    expect(removeEmptyFields(obj)).is.undefined();
  });
  it('03 参数为非空字符串', () => {
    const obj = 'abc';
    expect(removeEmptyFields(obj)).equal('abc');
  });
  it('04 参数为空字符串', () => {
    const obj = '';
    expect(removeEmptyFields(obj)).is.undefined();
  });
  it('05 参数为数字', () => {
    const obj = 123;
    expect(removeEmptyFields(obj)).equal(123);
  });
  it('06 参数为布尔', () => {
    const obj = true;
    expect(removeEmptyFields(obj)).equal(true);
  });
  it('07 参数为BigInt', () => {
    const obj = 123n;
    expect(removeEmptyFields(obj)).equal(123n);
  });
  it('08 参数为RegExp', () => {
    const obj = /[abc]/;
    expect(removeEmptyFields(obj)).eql(/[abc]/);
  });
  it('09 参数为Date', () => {
    const now = new Date();
    const obj = new Date(now);
    expect(removeEmptyFields(obj)).eql(now);
  });
  it('10 参数为普通浅层对象，不包含空字符串属性', () => {
    const obj = new ShallowObject('abc', 123);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('11 参数为普通浅层对象，包含空字符串属性', () => {
    const obj = new ShallowObject('', 123);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    expect(result.name).is.undefined();
    expect(result.value).equal(123);
  });
  it('12 参数为复杂嵌套对象，不包含空字符串属性', () => {
    const obj = new DeepObject('abc', 123, 'def', 456);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('13 参数为复杂嵌套对象，包含空字符串属性和null属性', () => {
    const obj = new DeepObject('', 123, null, 456);
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    expect(result.description).is.undefined();
    expect(result.price).equal(123);
    expect(result.shallow).not.null();
    expect(result.shallow.name).is.undefined();
    expect(result.shallow.value).equal(456);
  });
  it('14 参数为数字类型数组', () => {
    const obj = [1, 2, 3];
    const result = removeEmptyFields(obj);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('15 参数为字符串类型数组，不包含空字符串', () => {
    const obj = ['a', 'b', 'c'];
    const result = removeEmptyFields(obj);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('16 参数为字符串类型数组，包含空字符串', () => {
    const obj = ['a', 'b', ''];
    const result = removeEmptyFields(obj);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    expect(result).eql(['a', 'b']);
  });
  it('17 参数为浅层对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('def', 456)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('18 参数为浅层对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new ShallowObject('abc', 123), new ShallowObject('', 456)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    const s = new ShallowObject(null, 456);
    delete s.name;
    expect(result).eql([new ShallowObject('abc', 123), s]);
  });
  it('19 参数为嵌套对象数组，每个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('c', 3, 'd', 4)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).eql(obj);
  });
  it('20 参数为嵌套对象数组，某个对象不包含空字符串属性', () => {
    const obj = [new DeepObject('a', 1, 'b', 2), new DeepObject('', 3, null, 4)];
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    const s = new DeepObject(null, 3, null, 4);
    delete s.description;
    delete s.shallow.name;
    expect(result).eql([new DeepObject('a', 1, 'b', 2), s]);
  });
  it('21 参数为无类型对象，某个属性包含空字符串', () => {
    const obj = {
      name: 'jack',
      prop: '',
      value: 123,
      val: null,
      child: {
        child_name: 'child',
        child_value: null,
      },
    };
    const result = removeEmptyFields(obj);
    expect(result.constructor.name).equal(obj.constructor.name);
    expect(result).not.equal(obj);
    expect(result).not.eql(obj);
    expect(result).eql({
      name: 'jack',
      value: 123,
      child: {
        child_name: 'child',
      },
    });
  });
  const Wrapper = Vue.extend({
    data() {
      const obj = new Insurant();
      obj.id = '0';
      obj.name = 'name';
      obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
      obj.gender = Gender.MALE.value;
      obj.birthday = '1990-01-01';
      obj.mobile = '12039495';
      obj.email = '';
      obj.kinship = Kinship.PARENT.value;
      obj.guardian = new Guardian();
      obj.guardian.id = '1';
      obj.guardian.name = 'guardian';
      obj.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '');
      obj.guardian.gender = Gender.FEMALE.value;
      obj.guardian.birthday = '1970-02-03';
      obj.guardian.mobile = null;
      obj.guardian.email = null;
      return {
        insurant: obj,
      };
    },
    template: '<div>name = {{insurant.name}}</div>',
  });
  it('22 参数为一个Vue组件内部数据', () => {
    const wrapper = mount(Wrapper);
    expect(wrapper.vm.insurant).is.not.undefined();
    expect(wrapper.vm.insurant).is.not.null();
    const result = removeEmptyFields(wrapper.vm.insurant);
    expect(result.constructor.name).equal('Insurant');
    expect(result.id).equal('0');
    expect(result.name).equal('name');
    expect(result.credential).eql(new Credential(CredentialType.IDENTITY_CARD.value, '123'));
    expect(result.gender).equal(Gender.MALE.value);
    expect(result.birthday).equal('1990-01-01');
    expect(result.mobile).equal('12039495');
    expect(result.email).is.undefined();
    expect(result.kinship).equal(Kinship.PARENT.value);
    expect(result.guardian.constructor.name).equal('Guardian');
    expect(result.guardian.id).equal('1');
    expect(result.guardian.name).equal('guardian');
    expect(result.guardian.credential.constructor.name).equal('Credential');
    expect(result.guardian.credential.type).equal(CredentialType.IDENTITY_CARD.value);
    expect(result.guardian.credential.number).is.undefined();
    expect(result.guardian.gender).equal(Gender.FEMALE.value);
    expect(result.guardian.birthday).equal('1970-02-03');
    expect(result.guardian.mobile).is.undefined();
    expect(result.guardian.email).is.undefined();
  });
});
