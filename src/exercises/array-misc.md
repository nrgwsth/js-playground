===
title=Array Misc
section=Misc
created=134234221
===

Different ways of emptying an array,

```js
var a = [1,2,3]
var b = a

//creates and assigns a new array [].
a = []

//old array is unaffected
assert(b.length === 3, "Old array is unaffected")

var c = [1,2, 3]
var d = c

//mutates the reference, all references are affected.
c.length = 0
assert(d.length === 0, "Old array is affected")

```

Simple function to output 0 or 1 randomly.
```js
function returnZeroorOneRandomly() {
  return Math.round(Math.random());
}

for (let i=0;i<10;i++) {
  let a = returnZeroorOneRandomly()
  assert(a === 0 || a === 1, `Value of a is ${a}`)
}
```
