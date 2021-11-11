import expect from 'must';
import CredentialType from '../model/CredentialType';
import Credential from '../model/Credential';
import Gender from '../model/Gender';
import Kinship from '../model/Kinship';
import Person from '../model/Person';
import Buyer from '../model/Buyer';
import Guardian from '../model/Guardian';
import Insurant from '../model/Insurant';
import cloneVue from '../../tmp/cloneVue';

// 单元测试 'cloneVue' 函数，针对内置 primitive 类型
describe('cloneVue primitive', () => {
  it('01 cloneVue(undefined)', () => {
    expect(cloneVue(undefined)).is.undefined();
  });
  it('02 cloneVue(null)', () => {
    expect(cloneVue(null)).is.null();
  });
  it('03 cloneVue(number)', () => {
    expect(cloneVue(1)).equal(1);
    expect(cloneVue(-1)).equal(-1);
    expect(cloneVue(+0)).equal(+0);
    expect(cloneVue(-0)).equal(-0);
    expect(cloneVue(Number.INFINITY)).equal(Number.INFINITY);
    expect(cloneVue(Number.NEGATIVE_INFINITY)).equal(Number.NEGATIVE_INFINITY);
    expect(cloneVue(Number.NaN)).is.nan();
  });
  it('04 cloneVue(string)', () => {
    expect(cloneVue('')).equal('');
    expect(cloneVue('abc')).equal('abc');
  });
  it('05 cloneVue(boolean)', () => {
    expect(cloneVue(false)).equal(false);
    expect(cloneVue(true)).equal(true);
  });
  it('06 cloneVue(symbol)', () => {
    const symbol = Symbol('symbol');
    expect(cloneVue(symbol)).equal(symbol);
  });
  it('07 cloneVue(bigint)', () => {
    expect(cloneVue(0n)).equal(0n);
    expect(cloneVue(100n)).equal(100n);
    expect(cloneVue(-100n)).equal(-100n);
  });
});

function expectAlike(var1, var2) {
  expect(var1).not.equal(var2);
  expect(var1).eql(var2);
}

function expectInstanceOf(obj, type) {
  expect(Object.getPrototypeOf(obj)).equal(type.prototype);
}

function testMonkeyPatching(obj) {
  const prop = Symbol('monkeypatched');
  obj[prop] = 'prop value 1';
  obj.prop2 = 'prop value 2';
  it('MonkeyPatched attributes are preserved', () => {
    const cloneVued = cloneVue(obj);
    expect(cloneVued[prop]).equal(obj[prop]);
    cloneVued[prop] = 'different';
    expect(cloneVued[prop]).not.equal(obj[prop]);
    expect(cloneVued.prop2).equal(obj.prop2);
    cloneVued.prop2 = 'different';
    expect(cloneVued.prop2).not.equal(obj.prop2);
  });
  it('MonkeyPatched attributes donot break correctness', () => {
    const cloneVued = cloneVue(obj);
    expectAlike(cloneVued, obj);
  });
}

// 单元测试 'cloneVue' 函数，针对内置对象
describe('cloneVue objects', () => {
  describe('Number', () => {
    it('08 simple', () => {
      const obj = new Number(3.14);
      expectAlike(cloneVue(obj), obj);
    });
    testMonkeyPatching(new Number(3.14));
  });
  describe('String', () => {
    it('09 simple', () => {
      const obj = new String('hello world');
      expectAlike(cloneVue(obj), obj);
    });
    testMonkeyPatching(new String('hello world'));
  });
  describe('Boolean', () => {
    it('10 simple', () => {
      const obj = new Boolean(true);
      expectAlike(cloneVue(obj), obj);
    });
    testMonkeyPatching(new Boolean(false));
  });
  describe('Date', () => {
    it('11 simple', () => {
      const obj = new Date();
      expectAlike(cloneVue(obj), obj);
    });
    testMonkeyPatching(new Date());
  });
  describe('Function', () => {
    it('12 simple', () => {
      const obj = function foo(x) {
        return x + 1;
      };
      expect(cloneVue(obj)).equal(obj);
    });
    it('13 arrow', () => {
      const obj = (x) => x + 1;
      expect(cloneVue(obj)).equal(obj);
    });
    it('14 generator', () => {
      // TODO
      // const obj = (x) => x + 1;
      // expect(cloneVue(obj)).equal(obj);
    });
  });
  describe('Promise', () => {
    // TODO
  });
  describe('RegExp', () => {
    it('simple', () => {
      const obj = /x/g;
      expectAlike(cloneVue(obj), obj);
    });
    testMonkeyPatching(/x/g);
  });
});

// 单元测试 'cloneVue' 函数，针对内置容器对象

describe('cloneVue containers', () => {
  describe('Array', () => {
    it('empty', () => {
      const empty = [];
      expectAlike(cloneVue(empty), empty);
    });
    it('nonempty', () => {
      const nonempty = [Number.INFINITY, 0, undefined, Symbol('sym'), 12];
      expectAlike(cloneVue(nonempty), nonempty);
    });
    it('nested', () => {
      const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const cloneVued = cloneVue(nested);
      expectAlike(cloneVued, nested);
      for (let i = 0; i < nested.length; ++i) {
        expectAlike(cloneVued[i], nested[i]);
      }
    });
    it('cyclic', () => {
      const cyclic = ['before', undefined, 'after'];
      cyclic[1] = cyclic;
      const cloneVued = cloneVue(cyclic);
      expect(cloneVued[0]).equal('before');
      expect(cloneVued[1]).equal(cloneVued);
      expect(cloneVued[2]).equal('after');
    });
    it('diamond', () => {
      const child = ['im', 'child'];
      const parent = ['before', child, 'between', child, 'after'];
      const cloneVued = cloneVue(parent);
      expectAlike(cloneVued, parent);
      expect(cloneVued[1]).not.equal(parent[1]);
      expect(cloneVued[3]).equal(cloneVued[3]);
    });
    it('sparse', () => {
      const sparse = [1, , 3, , 5];  // eslint-disable-line no-sparse-arrays
      expectAlike(cloneVue(sparse), sparse);
    });
    testMonkeyPatching([3, 1, 4]);
  });
  describe('Map', () => {
    it('empty', () => {
      const empty = new Map();
      expectAlike(cloneVue(empty), empty);
    });
    it('nonempty', () => {
      const nonempty = new Map([['ping', 'x'], ['y', 'pong']]);
      const cloneVued = cloneVue(nonempty);
      expectAlike(cloneVued, nonempty);
    });
    it('nested', () => {
      const nested = new Map([['m', new Map([['mx', 0]])]]);
      const cloneVued = cloneVue(nested);
      expectAlike(cloneVued, nested);
      expectAlike(cloneVued.get('m'), nested.get('m'));
    });
    it('cyclic', () => {
      const cyclic = new Map();
      cyclic.set('self', cyclic);
      const cloneVued = cloneVue(cyclic);
      expect(cloneVued).not.equal(cyclic);
      expect(cloneVued.size).equal(cyclic.size);
      expect(cloneVued.get('self')).equal(cloneVued);
    });
    it('diamond', () => {
      const child = new Map([['i am', 'child']]);
      const diamond = new Map([['a', child], ['b', child]]);
      const cloneVued = cloneVue(diamond);
      expectAlike(cloneVued, diamond);
    });
    testMonkeyPatching(new Map([['ping', 'x'], ['y', 'pong']]));
  });
  describe('Set', () => {
    it('empty', () => {
      const empty = new Set([]);
      expectAlike(cloneVue(empty), empty);
    });
    it('nonempty', () => {
      const nonempty = new Set([1, 2, 3]);
      expectAlike(cloneVue(nonempty), nonempty);
    });
    it('nested', () => {
      const child = new Set(['child']);
      const parent = new Set([child]);
      expectAlike(cloneVue(parent), parent);
    });
    it('cyclic', () => {
      const cyclic = new Set();
      cyclic.add(cyclic);
      const cloneVued = cloneVue(cyclic);
      expect(cloneVued).not.equal(cyclic);
      expect(cloneVued.has(cloneVued)).is.true();
    });
    testMonkeyPatching(new Set([1, 2, 3]));
  });
  it('WeakMap', () => {
    const map = new WeakMap();
    const k1 = {};
    const k2 = function () {};    //  eslint-disable-line func-names
    const k3 = window;
    map.set(k1, 1);
    map.set(k2, 2);
    map.set(k3, 3);
    expect(cloneVue(map)).equal(map); // WeakMap cannot be cloneVued, just return the source.
  });
  it('WeakSet', () => {
    const set = new WeakSet();
    const k1 = {};
    const k2 = function () {};  //  eslint-disable-line func-names
    const k3 = window;
    set.add(k1);
    set.add(k2);
    set.add(k3);
    expect(cloneVue(set)).equal(set);// WeakSet cannot be cloneVued, just return the source.
  });
});

// 单元测试 'cloneVue' 函数，针对内置带类型数组
describe('cloneVue typed arrays et al', () => {
  describe('ArrayBuffer', () => {
    it('simple', () => {
      const buffer = new ArrayBuffer(32);
      expectAlike(cloneVue(buffer), buffer);
    });
    testMonkeyPatching(new ArrayBuffer(16));
  });
  describe('SharedArrayBuffer', () => {
    // Doesn't really seem to be any way to it these? :/
  });
  describe('DataView', () => {
    it('simple', () => {
      const buffer = new ArrayBuffer(32);
      const view = new DataView(buffer, 1, 16);
      const cloneVued = cloneVue(view);
      expectAlike(cloneVued, view);
      expect(cloneVued.buffer).not.equal(view.buffer);
      cloneVued.setInt16(0, 12);
      expect(view.getInt16(0)).not.equal(12);
      expect(view.getInt16(1)).not.equal(12);
    });
    testMonkeyPatching(new DataView(new ArrayBuffer(16)));
  });

  function testTypedArray(constructor, sampleValue) {
    describe(constructor.name, () => {
      it('empty', () => {
        const empty = new constructor(32);
        expectAlike(cloneVue(empty), empty);
      });
      it('nonempty', () => {
        const nonempty = new constructor(32);
        nonempty[0] = sampleValue;
        nonempty[15] = sampleValue;
        nonempty[31] = sampleValue;
        expectAlike(cloneVue(nonempty), nonempty);
      });
      const array = new constructor(32);
      array[0] = sampleValue;
      array[15] = sampleValue;
      array[31] = sampleValue;
      testMonkeyPatching(array);
    });
  }

  describe('typed arrays', () => {
    testTypedArray(BigInt64Array, 12n);     // eslint-disable-line no-undef
    testTypedArray(BigUint64Array, 12n);    // eslint-disable-line no-undef
    testTypedArray(Float32Array, 3.14);
    testTypedArray(Float64Array, 3.14);
    testTypedArray(Int8Array, 12);
    testTypedArray(Int16Array, 12);
    testTypedArray(Int32Array, 12);
    testTypedArray(Uint8Array, 12);
    testTypedArray(Uint8ClampedArray, 12);
    testTypedArray(Uint16Array, 12);
    testTypedArray(Uint32Array, 12);
  });
});

// 单元测试 'cloneVue' 函数，针对内置Error类
describe('cloneVue(Error)', () => {
  function testError(error) {
    describe(error.constructor.prototype.name, () => {
      it('simple', () => {
        expectAlike(cloneVue(error), error);
      });
      testMonkeyPatching(error);
    });
  }
  describe('errors', () => {
    testError(new Error('message', 'filename', 50));
    testError(new EvalError('message', 'filename', 50));
    testError(new RangeError('message', 'filename', 50));
    testError(new ReferenceError('message', 'filename', 50));
    testError(new SyntaxError('message', 'filename', 50));
    testError(new TypeError('message', 'filename', 50));
    testError(new URIError('message', 'filename', 50));
  });
});

// 单元测试 'cloneVue' 函数，针对对象
describe('cloneVue plain and custom objects', () => {
  it('empty', () => {
    const empty = {};
    expectAlike(cloneVue(empty), empty);
  });
  it('nonempty', () => {
    const nonempty = { left: 'right', up: 'down', red: 'blue' };
    expectAlike(cloneVue(nonempty), nonempty);
  });
  it('nested', () => {
    const nested = { child: { val: 'val!' } };
    expectAlike(cloneVue(nested), nested);
  });
  it('cyclic', () => {
    const object = { };
    object.self = object;
    const cloneVued = cloneVue(object);
    expect(cloneVued).not.equal(object);
    expect(cloneVued.self).equal(cloneVued);
  });
  it('diamond', () => {
    const child = { i_am: 'child' };
    const parent = { left: child, right: child };
    const cloneVued = cloneVue(parent);
    expectAlike(cloneVued, parent);
    expect(cloneVued.left).equal(cloneVued.right);
  });
  it('with non-string keys', () => {
    const key = Symbol('kk');
    const nonempty = { [key]: 'val' };
    expectAlike(cloneVue(nonempty), nonempty);
  });
  it('function prototype instances with no hierarchy', () => {
    function Pair(left, right) {
      this.left = left;
      this.right = right;
    }
    const pair = new Pair(3, 4);
    expectAlike(cloneVue(pair), pair);
  });
  it('with prototype from Object.create', () => {
    const proto = {
      delimiter: ', ',
      toString() {
        return this.items.join(this.delimiter);
      },
    };
    const object = Object.create(proto);
    object.items = [1, 2, 3];
    expectAlike(cloneVue(object), object);
  });
  it('with prototype from Object.create(null)', () => {
    const object = Object.create(null);
    object.items = [1, 2, 3];
    expect(Object.getPrototypeOf(object)).is.null();
    expectAlike(cloneVue(object), object);
  });
  it('ES6 class instances with no hierarchy', () => {
    class Pair {
      constructor(left, right) {
        this.left = left;
        this.right = right;
      }
    }
    const pair = new Pair(3, 4);
    expectAlike(cloneVue(pair), pair);
  });
  it('ES6 classes with hierarchy', () => {
    class Parent {
      constructor(pValue) {
        this.pValue = pValue;
      }
    }
    class Child extends Parent {
      constructor(pValue, cValue) {
        super(pValue);
        this.cValue = cValue;
      }
    }
    const child = new Child('pValue', 'cValue');
    expectAlike(cloneVue(child), child);
  });
  it('with getters, include accessor, include non enumerable', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      get() { return this.val; },
    });
    const cloneVued = cloneVue(object, {
      includeAccessor: true,
      includeNonEnumerable: true,
    });
    expectAlike(cloneVued, object);
    cloneVued.val = 'not';
    expect(cloneVued.getter).equal('not');
  });
  it('with getters, default options', () => {
    const object = { val: 'got' };
    Object.defineProperty(object, 'getter', {
      configurable: true,
      enumerable: true,
      get() { return this.val; },
    });
    const cloneVued = cloneVue(object);
    expectAlike(cloneVued, object);
    cloneVued.val = 'not';
    expect(cloneVued.getter).equal('got');
  });
});

// 单元测试 'cloneVue' 函数，针对用户自定义对象
describe('cloneVue customized class', () => {
  it('cloneVue(Person)', () => {
    const obj = new Person();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = cloneVue(obj);
    expectInstanceOf(result, Person);
    expectAlike(result, obj);
  });
  it('cloneVue(Buyer)', () => {
    const obj = new Buyer();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = cloneVue(obj);
    expectInstanceOf(result, Buyer);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  it('cloneVue(Guardian)', () => {
    const obj = new Guardian();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    const result = cloneVue(obj);
    expectInstanceOf(result, Guardian);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
  });
  it('cloneVue(Insurant)', () => {
    const obj = new Insurant();
    obj.id = '0';
    obj.name = 'name';
    obj.credential = new Credential(CredentialType.IDENTITY_CARD.value, '123');
    obj.gender = Gender.MALE.value;
    obj.birthday = '1990-01-01';
    obj.mobile = '12039495';
    obj.email = 'i@i.com';
    obj.kinship = Kinship.PARENT.value;
    obj.guardian = new Guardian();
    obj.guardian.id = '1';
    obj.guardian.name = 'guardian';
    obj.guardian.credential = new Credential(CredentialType.IDENTITY_CARD.value, '456');
    obj.guardian.gender = Gender.FEMALE.value;
    obj.guardian.birthday = '1970-02-03';
    obj.guardian.mobile = '383789904';
    obj.guardian.email = 'c@c.com';
    const result = cloneVue(obj);
    expectInstanceOf(result, Insurant);
    expectAlike(result, obj);
    expectAlike(result.credential, obj.credential);
    expectAlike(result.guardian, obj.guardian);
    expectAlike(result.guardian.credential, obj.guardian.credential);
  });
});
