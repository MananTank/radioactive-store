Project and README is in early stage.
API is subject to change

# radioactive-store

Dead Simple, Reactive and High Performance State Management for React

<br/>

## Features

⚡ Fastest State Management Library

❌ No Boilerplate

⚛ Deeply Reactive

😙 Dead Simple API

♻ No Extra Re-Renders

🍀 Always Fresh State


<br/>

## ☢ Create A Global State

Your Global State is just an object.
You Provide this state to your `<App/>` by wrapping the `<App/>` with `<Provider />`

```js
import {Provider} from 'radiactive-store'

const state = {
  todos: []
};

ReactDOM.render(
  <Provider state={state}> <App /> </Provider>,
  root,
);
```
<br/>



## 🍕 Use A Slice Of Global State

Get the "slice" of the of the global state using the `useSlice` hook. Give the name of the "slice" you want from the state

The slice name you give as an argument also works as dependency, so whenever this slice of the state changes, component is re-rendered automatically. Pretty Cool, right ?


<!-- code -->
```js
import {useSlice} from 'radiactive-store'

const Todos = () => {
  const todos = useSlice("todos");

  // mutate directly to update global state ⚡
  const removeTodo = (i) => todos.splice(i, 1);
  const addTodo = (todo) => todos.push(todo);
  ...
};
```

[See Live Demo](https://codesandbox.io/s/todos-radioactive-store-x412g?file=/src/Todos.js:157-662)


<!-- gif -->
<p align='center'>
  <img src='img/todos.gif'  width='400'/>
</p>




<br/>

## 🍕 useSlice API

<details>
<summary> get slice of state </summary>

```js
const a = useSlice('a') // returns state.a
```
</details>


<details>
<summary> get deeply nested slice of state </summary>

```js
const d = useSlice('a.b.c.d') // returns state.a.b.c.d
```
</details>


<details>
<summary> Value Types are wrapped in Object </summary>

When you ask for a simple value type data from state, it does not return it direcly, but it wraps the value in an object and returns that object, so that you can mutate the value

```js
/*
*  state = {
*    count: 0
*  }
*/

const count = useSlice('count')
// returns { value: state.count }
// why not return state.count, why wrap in in an object ?

// well, value type data is immutable
// if count was a number, you would have no way of mutating it
// but if count is an object, you can mutate it and it will update the global state when you do so

// you can use the state.count like this
count.value

// you can mutate the state.count like this
count.value++
count.value = 100
count.value += 10
// etc..
```
</details>



<!--
<details>
<summary> </summary>
</details> -->