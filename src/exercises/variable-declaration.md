===
title=Variable Decalration
section=Scope and Closures
created=134234221
===

#### Variable Declaration

Variable are declared with `var` keyword. Variables declared with `var` are hoisted.

```javascript
var a = 5;
assert(a !== undefined, "A is not undefined")
```

As `a` is hoised, it will be defined even before it's declared.

```javascript
assert(a === undefined, "a is not undefined")
var a;
```

Variables with `let` and `const` are not hoisted.

```javascript
try{
    console.log(a)
} catch(e){
    assert(e !== undefined, "Variable is not defined.")
}
let a;
```