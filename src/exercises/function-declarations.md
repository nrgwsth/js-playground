===
title=What is scope?
section=Scope and Closures
created=134234221
===

Scope of a variable is execution context for which varialble is valid.

```js
function a(){
	var b = 5;
}

try {
	console.log(b)
} catch(e) {
	assert(e !== undefined, "b is not defined outside function a")
}
```

`let` and `const` are block scoped whereas `var` is function scoped.