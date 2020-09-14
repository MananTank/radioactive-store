<p align='center'>
  <img src='img/logo.svg' width='300'/>
</p>

<p align='center'> Dead Simple, Reactive, Blazing Fast Global State Management for React </p>


<!-- primary badges -------------------------------------->
<p align="center">
  <!-- version -->
  <img src='https://img.shields.io/github/package-json/v/MananTank/radioactive-store?color=blue&label=npm&style=flat' />
  <!-- size -->
  <img src='https://img.shields.io/bundlephobia/minzip/radioactive-store?color=success&label=size' />
  <!-- downloads npm per week  -->
  <img src='https://img.shields.io/npm/dw/radioactive-store?color=blueviolet' />
  <!-- chat -->
  <a href='https://join.slack.com/t/radioactive-store/shared_invite/zt-gwd1rsvr-vkoizw5RG5rk9rwsdgT3gQ'>
    <img src='https://img.shields.io/badge/Chat-Slack-red'>
  </a>
  <!-- stars -->
  <img src='https://img.shields.io/github/stars/MananTank/radioactive-store?style=social&color=%23FFB31A' />
  <!-- follow -->
  <img src='https://img.shields.io/github/followers/MananTank?label=Follow&style=social&color=%23FFB31A' />
  <!-- Twitter intent -->
  <a href='https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2FMananTank%2Fradioactive-store&via=MananTank_&text=Make%20your%20@reactjs%20App%20Truly%20Reactive%20with%20radioactive-store&hashtags=react%2CradioactiveState' target='_blank'>
    <img src='https://img.shields.io/twitter/url/http/shields.io.svg?style=social'/>
  </a>
</p>

<!-- Coverage badges ---------------------------------- -->
<!-- <p align='center'>
  <img src='https://img.shields.io/badge/Stmts-100%25-success' />
  <img src='https://img.shields.io/badge/Branch-100%25-success' />
  <img src='https://img.shields.io/badge/Funcs-100%25-success' />
  <img src='https://img.shields.io/badge/Lines-100%25-success' />
</p>
<br/> -->


<br/>

## Features

⚛ Deeply Reactive, Mutate the State directly !

⚡ Fastest State Management Library

😍 Dead Simple API

♻ No Extra Re-Renders

🍀 Always Fresh State



<br/>

## ⚛ Create A Global State

Create a Global State in your main file (index.js) for your app by calling `createGS` with the state object, before rendering App.

That's it ! 🙌

**Example**

```js
// index.js
import { createGS } from 'radioactive-store'

createGS({
  count: 0
})

ReactDOM.render(<App />, root);
```
<br/>


## ☢ Using the Global State in Components

Use the `useGS` hook to get the entire global state

`useGS` takes a dependency array as argument. It is an array of keys that the Component depends on. when any of the dependencies change, Component is re-rendered.

**Example**

```jsx
import { useGS } from "radioactive-store";

const Counter = () => {
  const GS = useGS(['count'])
  // when Gs.count is changed by any component,
  // Counter is re-rendered

  // ...
}
```

<br/>

## ⚡ Updating the Global State

`radioactive-store`'s state is deeply reactive. To update the state, you just mutate it!

<br/>

> ### global state is also available in window object as `window.GS`,  So You can also mutate state from anywhere even from browser's console and UI will automatically update 😍 🙌


<br/>

## Counter Example

[See Live Demo](https://codesandbox.io/s/counter-example-radioactive-store-1yly9?file=/src/Counter.js)

<!-- <p>
  <img src='img/counter.gif'/>
</p> -->

```jsx
// index.js
import { createGS } from 'radioactive-store'

createGS({
  count: 0
});
```


```jsx
// Counter.js
import { useGS } from "radioactive-store";

const Counter = () => {
  const GS = useGS([ "count" ]);
  const increment = () => GS.count++; // directly mutate GS 🙌

  return (
    <div className="count" onClick={increment}>
      {GS.count}
    </div>
  );
};
```


<br/>

## Todos Example

<p align='center'>
  <img src='img/todos.gif' width='400'>
</p>

[Live Demo](https://codesandbox.io/s/todos-radioactive-store-x412g?file=/src/Todos.js)

```jsx
// index.js
import { createGS } from 'radioactive-store'

createGS({
  todos: []
});
```

```jsx
// Todos.js
import { useGS } from "radioactive-store";

const Todos = () => {

  const GS = useGS([ "todos" ]);

  const removeTodo = i => GS.todos.splice(i, 1);
  const addTodo = todo => GS.todos.push(todo);

  // ....
};
```
<br/>



### 🔧🔨 README is a work in progress ...