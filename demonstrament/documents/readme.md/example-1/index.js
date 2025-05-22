import { Model, View, Control } from '/dependencies/mvc-framework.js'
const control = new Control({
  models: {
    ui: new Model({
      selected: false,
      anchor: { text: "Product Detail" },
    }),
    content: new Model({
      id: "0246813579",
      name: "Some Product Name",
      price: "$235.78",
      descript: "Some product description.",
      graphic: "https://pbs.twimg.com/media/Grhfq0JaIAAPIqI?format=jpg&name=medium",
      anchor: "https://x.com/StellarManatee/status/1925394081796223237",
    }),
  },
  views: {
    default: new View({
      parentElement: document.querySelector('body'),
      templates: { default: ($models) => {
        const { content, ui } = $models
        return `
          <product>
            <graphic>
              <img src="${content.graphic}" width="100" />
            </graphic>
            <text>
              <name>${content.name}</name>
              <descript>${content.descript}</descript>
              <price>${content.price}</price>
              <a href="${content.anchor}" target="_blank">${ui.anchor.text}</a>
            </text>
          </product>
        `
      } },
      querySelectors: { querySelector: {
        'product': ':scope > product'
      } },
    })
  },
}, {
  events: {
    'models.ui setProperty:selected': function($event) {
      this.views.default.qs.product.setAttribute('data-selected', $event.detail.value)
    },
    'views.default.qs.product click': function($event) {
      this.models.ui.set('selected', !this.models.ui.get('selected'))
    }
  },
})
control.views.default.render({
  ui: control.models.ui.valueOf(),
  content: control.models.content.valueOf(),
}, 'default')