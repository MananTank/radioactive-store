> This readme file is not ready yet, Project is still in v0.x and API may change. 🔨
>
> Your Feedback is very much appreciated 🙏

<br/>

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

☢ Deeply Reactive, Mutate the State directly !

⚡ Blazing Fast: Fastest State Management Library !

😍 Dead Simple API

♻ Super Efficient : No Extra Re-Renders

🍀 Always Fresh State

⚛ Reactive Props

✒ Reactive Input Bindings


<br />

> ### This library is a superset of [radioactive-state](https://github.com/MananTank/radioactive-state) for global state management. All its features are available in `radioactive-store` as well.

<br/>




## 🛠 Installation

```bash
npm i radioactive-store
```
<br/>





## ☢ Create Global State with `createState`

You can call `createState` with an object. Doing this, `radioactive-store` will create a reactive global state and attach it to window as `window.state`

Components in App will use `window.state` so its important to create the state before rendering the App

**Example**

```js
// index.js
import { createState } from 'radioactive-store'

// after doing this global state is available as window.state
createState({
  count: 0
})

// after creating global state, render App
ReactDOM.render(<App />, root);
```
<br/>






## 📂 Using the Global State in Component

You can you global state anywhere using `window.state`

When using some part of `window.state` in a component to render UI, we have to re-render component when that part of state changes. To do that we use `$` hook to create a dependency

`$` function takes one or more strings that represents  parts of `window.state` the component depends on to render it's UI. This is used to re-render Component when any of these parts changes

#### Example

```js
// if Foo's UI depends on window.state.a and window.state.b.c
// declare this dependency using $ like this

import { $ } from 'radioactive-store'

const Foo = () => {
  $('a', 'b.c')
  ...
}
```

<br/>





## ⚡ Updating Global State

`radioactive-store`'s state is deeply reactive and is available anywhere in code as `window.state`. To update the state, you just directly mutate `window.state` and components that needs to re-render will re-render automatically


> ### You can mutate `window.state` not only from components but any piece of code and even from browser's console and after doing so, components that needs to be re-rendered will re-render automatically. 😍

<br/>

## 🧁 Counter Example

[Open Live Demo](https://codesandbox.io/s/counter-example-radioactive-store-1yly9?file=/src/Counter.js)

<!-- <p align='center'>
  <img src='img/counter.gif' width='600'/>
</p> -->

```jsx
// index.js
import { createState } from 'radioactive-store'

createState({
  count: 0
});
```


```jsx
// Counter.js
import { $ } from "radioactive-store";

const increment = () => window.state.count++
const reset = () => window.state.count = 0

const Counter = () => {
  $('count');
  return (
    <>
      <div onClick={increment}> {state.count} </div>
      <div onClick={reset}> Reset </div>
    </>
  );
};
```
> Since state is available in window, We can directly use global state as `state` instead of `window.state`
>
> But if you have ESlint setup, linter will complain that `state` is not defined. To fix this, add the `state` as a global variable in `eslint.config`

 `increment` and `reset` functions are defined outside of component. It's always a good idea of define the functions outside of component whenever possible for better performance, because functions defined inside of components are created every time the component is rendered.

We can also put these functions in a separate file and re-use the same function in multiple components


<br/>


> To be Continued ...


<!-- ## 🌟 Creating Actions

Creating actions is completely optional and radioactive-store does not provide any APIs to do so, however since global state is available in the global object, I th -->

<!-- ### What is an action ?

In other state management libraries an `action` is an object that represents a user action by a string and payload. But In this library I will refer to the functions that actually performs the action as `action`. I think this makes more sense since an action - as the name suggests is something that happens - it's a function.

So, According to this definition, we have already defined various actions such as `increment` and `reset` in the counter example
`
As we saw in Counter Example, we defined the actions `increment` and `reset` outside of the component. Let's take this a step further and store it in a global object so they can be called from anywhere.

`radioactive-store` does not have any opinions about how and where you store your actions. But here's my recommendation:

I recommend putting related actions in one object and saving them in `window.actions` object. But this is just a suggestion and you don't *have* to do it.

#### Example

```js
// index.js

createState({
  count: 0
})

const {state} = window

window.actions = {
  count: {
    increment: () => state.count++,
    reset: () => state.count = 0,
  }
}
```

Now we can refactor the Counter Component like to use global actions like this

```jsx
// Counter.js
import { useDeps } from "radioactive-store";
const { state } = window
const { increment, reset } = window.actions.count

const Counter = () => {
  useDeps([ "count" ])
  return (
    <>
      <div onClick={increment}> {state.count} </div>
      <div onClick={reset}> Reset </div>
    </>
  );
};
``` -->