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

⚡ Fastest State Management Library

❌ No Boilerplate

⚛ Deeply Reactive, Mutate the State directly !

😙 Dead Simple API

♻ No Extra Re-Renders

🍀 Always Fresh State


<br/>

## ⚛ Create A Global State

Create a Global State for your app by calling `globalState`. That's it ! 🙌

Example

```js
// index.js

import { globalState } from 'radiactive-store'

globalState({
  todos: []
})

ReactDOM.render(<App />, root);
```
<br/>


## ☢ Using the Global State in Components

Use the `useGS` hook to get the global state

`useGS` takes a dependency array as argument. It is an array of keys of state that the Component uses to render UI. when any of the dependencies change, Component is re-rendered to reflect the changes in UI

**Example**

```jsx
import { useGS } from "radioactive-store";

const Foo = () => {
  const GS = useGS(['a', 'b.c.d'])
  // GS is the entire global State
  // whenever GS.a or GS.b.c.d changes, Foo is re-rendered

  return <> ... </>
}
```

<br/>

## ⚡ Updating the Global State

`radioactive-store`'s state is deeply reactive.

To update the global state, you just mutate it! That's it

**You can also update the state from console and it will automatically update the UI 😍**

### Counter Example

[Live Demo](https://codesandbox.io/s/counter-example-radioactive-store-1yly9?file=/src/Counter.js)

<p>
  <img src='img/counter.gif'/>
</p>

```jsx
// index.js

globalState({
  count: 0
});
```


```jsx
// Counter.js
import { useGS } from "radioactive-store";

const Counter = () => {
  const GS = useGS(["count"]);
  const increment = () => GS.count++;

  return (
    <div className="count" onClick={increment}>
      {GS.count}
    </div>
  );
};
```


<br/>

**Todos Example**

```jsx
import { useGS } from "radioactive-store";

const Todos = () => {

  const GS = useGS( ["todos"] );

  // GS is deeply reactive, just mutate the state to update state !
  const removeTodo = i => GS.todos.splice(i, 1);
  const addTodo = todo => GS.todos.push(todo);

  return <> ... </>
};
```
<br/>


[Live Demo](https://codesandbox.io/s/todos-radioactive-store-x412g?file=/src/Todos.js)

<p align='center'>
  <img src='img/todos.gif' width='400'>
</p>





## README in progress !