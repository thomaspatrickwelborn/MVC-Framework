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
        let { ui, content } = $models
        ui = ui.valueOf()
        content = content.valueOf()
        return `
          <product>
            <text>
              <name>${content.name}</name>
              <descript>${content.descript}</descript>
              <price>${content.price}</price>
              <a href="${content.anchor}" target="_blank">${ui.anchor.text}</a>
            </text>
            <graphic>
              <img src="${content.graphic}" />
            </graphic>
          </product>
        `
      } },
      querySelectors: { querySelector: {
        'product': 'product'
      } },
    })
  },
}, {
  events: {
    'models.ui setProperty:selected': function($event) {
      this.views.qs.product.setAttribute('data-selected', $event.detail.value)
    },
  },
})
control.views.default.render(control.models, 'default')