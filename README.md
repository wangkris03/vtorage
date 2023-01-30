# vtorage

是一个简化的 localStorage 及 sessionStorage 方法

## Feature

- gzip 0.2kb, 仅仅是一个工具方法
- 直接下标取值，取值直接走对象缓存
- 自动持久化
- 支持 Typescript
- 支持版本规划

## Use

Vtorage 第一个参数是 storage 的 key，第二个参数是初始化对象，Vtorage 会以初始化对象为范型作为后续的对象提示，为了项目对象更好的理解，建议所有使用的对象都有一个初始化的值

```js
import { Vtorage } from "vtorage";
const store = Vtorage('app_name', {
  name:'dog';
  age: 20,
});

console.log(store.val.name); // "dog"
console.log(store.val.age); // 20

// 更新内容
store.assign({name:'fish'});
console.log(store.val.name); // "fish"

// 还原初始化内容
store.clear();
```

## 使用 sessionStorage

默认使用 localstorage, 若要使用 sessionStorage 可以设置 storage 为 'sessionStorage':

```js
const store = Vtorage('user-data', {
  name:'dog';
  age: 20,
}, {
  storage: 'sessionStorage',
});
```

## 统一设置版本

所有 Vtorage 的 key 等于 key + version

```js
Vtorage.version = "_0.0.1";
```

## 个别对象单独版本

Vtorage.version 是所有 对象都设置的版本号，若有个别对象希望不一样的版本号，可以设置 version 对象

```js
const store = Vtorage('user-data', {
  name:'dog';
  age: 20,
}, {
  version: '0.0.2'
});
```
