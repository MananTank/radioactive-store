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

## ☢ Create a global reactive state

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



## 🍕 Use a Slice of the global state in components

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

### useSlice API

get slice of state

```js
const a = useSlice('a') // returns state.a
```

get deeply nested slice of state

```js
const d = useSlice('a.b.c.d') // returns state.a.b.c.d
```

When you ask for a simple value type data from state, it returns an `obj` instead containing the value in `obj.value`

```js

/*
state = {
  count: 0
}
*/


const count = useSlice('count') // returns { value: state.count }

// you can use the state.count like this
count.value

// you can mutate the state.count like this
count.value++
count.value = 100
count.value += 10
// etc..

// it does not return 0 it returns { value: 0 }
// why ?
// well if count is assigned value 0, it can be mutated
// but now that count === { value: 0} it can be mutated by count.value++ or count.value = 100 etc..

```