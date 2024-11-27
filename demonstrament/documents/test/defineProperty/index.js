import { Model } from '/dependencies/mvc-framework.js'
const eventLog = ($event) => {
  console.log(
    "\n", $event.type, $event.type
  )
}
const { schema, content } = new Model({
  schema: [{ type: {
    propertyA: { type: {
      propertyB: { type: String }
    } } }
  }],
  content: [{
    propertyA: {
      propertyB: "BBB"
    }
  }],
  events: {
    "change": eventLog
  },
}, {
  changeEvents: true
})

console.log(content)