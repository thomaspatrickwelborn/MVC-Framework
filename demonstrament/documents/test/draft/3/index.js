import { Core } from '/dependencies/mvc-framework.js'

document.addEventListener('DOMContentLoaded', ($event) => {
  const core = new Core({
    events: [{
      path: 'body',
      type: 'click',
      listener: function bodyClick($event) {
        this.clicks++; console.log(`this.clicks: ${this.clicks}`)
      },
      enable: true,
    }]
  }, {
    // enableEvents: true,
    assign: [{ clicks: 0 }],
    defineProperties: {
      body: { get() { return document.querySelector('body') } }
    },
  })
})
const core = new Core({
  events: [{
    path: 'body',
    type: 'click',
    listener: function bodyClick($event) {
      this.clicks++; console.log(`this.clicks: ${this.clicks}`)
    },
    enable: true,
  }]
}, {
  // enableEvents: true,
  assign: [{ clicks: 0 }],
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  },
})
// core.addEvents()
const coreC = new Core({}, {
  // enableEvents: true,
  assign: [{ clicks: 0 }],
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  }
})
coreC.addEvents([{
  path: 'body',
  type: 'click',
  listener: function bodyClick($event) {
    this.clicks++; console.log(`coreC.clicks: ${this.clicks}`)
  },
  enable: true,
}])
const coreB = new Core({
  events: [{
    path: 'body',
    type: 'click',
    listener: function bodyClick($event) {
      this.clicks++; console.log(`coreB clicks: ${this.clicks}`)
    },
  }]
}, {
  enableEvents: false,
  assign: [{ clicks: 0 }],
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  }
})

const coreA = new Core({
  events: { 'body click': function bodyClick($event) {
    console.log(this)
    this.clicks++; console.log(`coreA clicks: ${this.clicks}`)
    // coreB.enableEvents()
  } }
}, {
  enableEvents: true,
  assign: [{ clicks: 0 }],
  defineProperties: {
    body: { get() { return document.querySelector('body') } }
  }
})
