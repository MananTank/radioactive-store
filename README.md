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

#### \+  All the features of [radioactive-state](https://github.com/MananTank/radioactive-state)

<br />


## 🛠 Installation

```bash
npm i radioactive-store
```
<br/>


### `radioactive-state` vs `radioactive-store`
 `radioactive-store` is a superset of [radioactive-state](https://github.com/MananTank/radioactive-state). It contains `radioactive-state`'s `useRS` hook for local state management, as well as `$` and `createState`  for global state management.


<br/>



## ☢ Create global state with `createState`

 create a reactive global state and attach it to window as `window.state` by calling `createState`

Components will then be able to use the global state via `window.state` so its important to create the global state before rendering the App

**Example**

```js
import { createState } from 'radioactive-store'

createState({
  count: 0
})

ReactDOM.render(<App />, root);
```
<br/>




## 📂 Using the global state in components

global state of app is available not only to component but anywhere as `window.state`

When a component uses **some part** of `window.state` in a component to render UI, we have to re-render that component when **that part** of state changes. To do that we use a `$` function to **create a dependency**

`$` function takes one or more strings that represents  parts of `window.state` the component depends on to render it's UI. This is used to re-render the component when any of these parts changes

#### Example

if `Foo` component's UI depends on `window.state.a` and `window.state.b.c`, declare this dependency using `$` like this:

```js
import { $ } from 'radioactive-store'

const Foo = () => {
  $('a', 'b.c')

  return <>
    <div> {window.state.a} </div>
    <div> {window.state.b.c} </div>
  </>
}
```
<br/>

Note that you only need to include the parts in dependency which the UI ( `jsx` ) depends on not the component as a whole. for example if Foo uses `window.state.x.y` but does not use them in jsx, then they do not need to be included in dependency

<br/>


## ⚡ Updating global state

`radioactive-store`'s state is deeply reactive and is available anywhere in code as `window.state`. To update the global state, you just directly mutate `window.state` and components that needs to re-render will re-render automatically


> ### You can mutate `window.state` not only from components but from any piece of code and even from browser's console !

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

const Counter = () => {
  $('count');
  return <div onClick={increment}> {state.count} </div>
};
```

 as the `increment` mutates global state, it can be defined outside of Counter component. It's always better to define the functions outside of component whenever possible for better performance, because functions defined inside of components are re-created every time the component is rendered.


### 👨‍🎤 Global Actions

I call functions that mutate the `window.state` **actions**
. We can store functions like these in the global object window, so that it could be used by any component.

### Example

 ```js
// index.js

createState({
  count: 0
})

window.actions = {
  incrementCount : () => window.state.count++,
  resetCount: () => window.state.count = 0
}

ReactDOM.render(<App/>, root)
 ```

 And then any component can use these actions like this

 ```jsx
const Counter = () => {
  const handleClick = window.actions.incrementCount
  return <> ... </>
}
 ```




<br/>


> To be Continued ...

