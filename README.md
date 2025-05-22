# ⁜&ensp;MVC Framework
&ensp;▴&ensp;**[PAC Framework](https://en.wikipedia.org/wiki/Presentation%E2%80%93abstraction%E2%80%93control) With [MVC Framework](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) Subpatterns**  
&ensp;&ensp;&ensp;&ensp;▵&ensp;**Manage Simplex/Complex *Browser Applications &amp; Websites* With Familiar Plain JS Notation**  
&ensp;&ensp;&ensp;&ensp;▵&ensp;**Mediate Model, View, Router, And Control Events With Event-Driven Core Architecture**  
&ensp;&ensp;&ensp;&ensp;▵&ensp;**Capture Detailed Object/Array Mutator Method Events Including Subproperty Events**  

&ensp;⁘&ensp;Uses [**Core-Plex**](https://www.npmjs.com/package/core-plex) - **Event Listener Management System**  
&ensp;❂&ensp;Uses [**Objecture**](https://www.npmjs.com/package/objecture) - **Object Watcher, Property Manager**  

## ※&ensp;Independent Classes
| SYM | NAME | DESCRIPT | GUIDE | API |
| -----: | :--- | :------- | :--: | :--: |
| M | Model | Manage schematized content. | [▶](./document/guide/model/index.md) | [▶](./document/api/model/index.md) |
| X | Schema | Manage data schema. | [▶](./document/guide/model/schema/index.md) | [▶](./document/api/schema/index.md) |
| V | View | Manage templated markup elements. | [▶](./document/guide/view/index.md) | [▶](./document/api/view/index.md) |
| R<sup>L</sup> | Router (Location) | Manage window location. | [▶](./document/guide/routers/location/index.md) | [▶](./document/api/location/index.md) |
| R<sup>F</sup> | Router (Fetch) | Manage AJAX connection. | [▶](./document/guide/routers/fetch/index.md) | [▶](./document/api/fetch/index.md) |
| R<sup>S</sup> | Router (Socket) | Manage Socket connection. | [▶](./document/guide/routers/socket/index.md) | [▶](./document/api/socket/index.md) |
| C | Control | Manage Model, View, Control, Location/fetch Routers. | [▶](./document/guide/control/index.md) | [▶](./document/api/control/index.md) |

## ※&ensp;Interdependent Class Structures
| FORMULA | NAME | ACRONYM | DESCRIPT |
| ------: | :--- | :------ | :------- |
|**C**<sub>MVRC<sub>\*</sub></sub> | Control (Model, View, Router, Controls) | CMVRC | Control class instances contain model, view, router, and subcontrol class instances. |
|**M**<sub>VRM<sub>\*</sub></sub> | Model (View, Router, Models) | MVRM | Model class instances contain view, router, and submodel class instances. |
|**V**<sub>MRV<sub>\*</sub></sub> | View (Model, Router, Views) | VMRV | View class instances contain model, router, and subview class instances. |
|**R**<sub>MVR<sub>\*</sub></sub> | Router (Model, View, Routers) | RMVR | Router class instances contain model, view, and subrouter class instances. |

## ※&ensp;Illustrations
### PAC
```
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
      templates: { default: ($models) => {
        const { ui, content } + $models
        return `
          <product data-selected="${ui.selected}">
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
        'product': ':scope'
      } },
    })
  },
}, {
  events: {
    'models.ui setProperty:selected': function($event) {
      this.views.qs.product.setAttribute($event)
    }
  },
})
```
