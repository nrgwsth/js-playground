function func1(){};
var func2 = function(){};
window.func3 = function(){};
assert(func1!==undefined, 'func1 exists')
assert(func2!==undefined, 'func2 exists')
assert(func3!==undefined, 'func3 exists')