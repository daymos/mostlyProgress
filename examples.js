'use strict'
const  _ = require('ramda')
//basic composition

var compose = (f1,f2) => (x) => f1(f2(x))
var capitalize = (str) => str.toUpperCase()

var exclamation = (str) => str+'!'
var shout = compose(capitalize, exclamation)
console.log(shout('hello'))


// ------------------ //
//associativity of composition
// it is guaranteed but types must match

var head = (arr)=> arr[0]
var reverse = (arr)=> arr.reduce((acc,el)=>[el].concat(acc),[])

var tail = compose(head, reverse)
var tail1 = compose(reverse, head)

console.log(tail([1,2,4,5]))
//console.log(tail1([1,2,4,5]))

// ------------------- //
//debugging composed functions - tracing

var trace = (tag)=>{
  return (x)=>{
    console.log(tag, x)
    return x
  }
}
// following line will fail because head return a non array, reverse takes in an array
var tail2 = _.compose(reverse,trace('what is head returning?'), head)
// I debug by putting in my trace function that pass along the relevant value and console.logs it 
// trace must be curried !!

var tail2 = _.compose(head,trace('what is head returning?'), reverse)
console.log(tail2([1,2,4,5]))





