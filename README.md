> This Library is still in v0.x and API may change.
>
> README is incomplete 🔨


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


## ☢ Creating global state with `createState`

Call the `createState` function with the state object and a reactive global state will be created. This global state is attached to window object as `window.state`

**Example**

```js
import { createState } from 'radioactive-store'

createState({
  foo: 'lorem ipsum',
  bar: {
    baz: [1,2,3]
  },
  buzz: 10,
})

ReactDOM.render(<App />, root);
```
<br/>




## 📂 Using the global state in components

Global state of app is as `window.state`

When a component uses **some part** of `window.state` in a component to render UI, we have to re-render that component when **that part** of state changes. To do that we create a dependency using the `$` function.

`$` function is called with **one or more strings** that represents  parts of `window.state` the component depends on to render it's UI. This is used to re-render the component when any of these parts changes

#### Example

if `Foo` component's UI depends on `window.state.foo` and `window.state.bar.baz`, declare these dependencies using `$` like this:

```js
import { $ } from 'radioactive-store'

const Foo = () => {
  $('foo', 'bar.baz')

  return (
    <>
      <div> {window.state.foo} </div>
      <div> {window.state.bar.baz} </div>
    </>
  )
}
```
<br/>

> Note that you only need to include the parts of state in dependency which the UI ( `jsx` ) depends on not the component as a whole. for example if Foo uses `window.state.buzz` but does not use them in jsx, then it does not need to be included in dependency

<br/>


## ⚡ Updating global state

`radioactive-store`'s state is deeply reactive. To update the global state, you just directly mutate `window.state` and **components that needs to re-render will re-render automatically**


>  You can mutate `window.state` not only from components but from any piece of code and even from browser's console !

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

In `radioactive-store`, an action is a function that mutates the `window.state`. So from our previous example, `increment` is an action.

In our previous counter example, I defined the `increment` function (action) in Counter.js but if `increment` needs to be used in other components, we should store this action globally in `window` object so that it is globally available just like `window.state`

> Saving actions globally is completely optional and you shouldn't do it until it's necessary.

`radioactive-store` does not have any opinions about how you do this, So you can do this however you like.

#### For example, I like to do this:

I like to save actions in `window.actions` and put similar actions together in an object for example `window.state.count` related actions stored in `window.actions.count` object:

 ```js
// index.js

createState({
  count: 0
})

window.actions = {
  count: {
    increment: () => window.state.count++,
    set: value => window.state.count = value,
    reset: () => window.state.count = 0
  }
}

ReactDOM.render(<App/>, root)
 ```
And then any component can use these actions like this

 ```jsx
const Counter = () => {
  const {increment} = window.actions.count
  return <> ... </>
}
 ```




<br/>


> To be Continued ...

> I am currently working on README ...

