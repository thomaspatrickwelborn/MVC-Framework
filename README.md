> [!WARNING]  
> Early Stage Development  

> [!CAUTION]  
> Use At Own Risk  

> [!NOTE]  
> Interested in MVC Framework? 
> thomas.patrick.welborn@outlook.com

# MVC Framework
Javascript implementation of the **[Presentation-Abstraction-Control (PAC) Pattern](https://en.wikipedia.org/wiki/Presentation%E2%80%93abstraction%E2%80%93control)** that also supports **[Model-View-Control (MVC) Patterns](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)**.  

**Features**  
 - Practical web component, web page, or web application use.  
 - Simplistic configuration.  
 - Versatile patterning.  
 - Familiar programming interfaces promote plain Javascript.  
 - Event management system.  
 - Modeled content property modifier events, nested events.  
 - Window Location and Fetch Routers.  

## Class System
MVC Framework Classes may be instantiated independently or interdependently.  
### Independent Classes
| SYM | NAME | DESCRIPT | API | GUIDE |
| -----: | :--- | :------- | :--: | :--: |
| M | Model | Manage schematized content. | [▶](./document/ClassSystem/Model/index.md) | [▶](./document/Guide/Model/index.md) |
| X | Model Schema | Manage data schema. | [▶](./document/ClassSystem/Model//Schema/index.md) | [▶](./document/ClassSystem/Guide//Schema/index.md) |
| D | Model Content | Manage data content. | [▶](./document/ClassSystem/Model/Content/index.md) | [▶](./document/ClassSystem/Guide/Content/index.md) |
| V | View | Manage templated markup elements. | [▶](./document/ClassSystem/View/index.md) | [▶](./document/Guide/View/index.md) |
| R | Router | Window location router or fetch router. | [▶](./document/ClassSystem/Routers/index.md) | [▶](./document/Guide/Routers/index.md) |
| R<sup>L</sup> | Router (Location) | Manage window location. | [▶](./document/ClassSystem/Routers/Location/index.md) | [▶](./document/ClassSystem/Guide/Location/index.md) |
| R<sup>F</sup> | Router (Fetch) | Manage AJAX connection. | [▶](./document/ClassSystem/Routers/Fetch/index.md) | [▶](./document/ClassSystem/Guide/Fetch/index.md) |
| C | Control | Manage Model, View, Control, Location/Fetch Routers. | [▶](./document/ClassSystem/Control/index.md) | [▶](./document/Guide/Control/index.md) |
| E | Core | Manage Event Target Events. | [▶](./document/ClassSystem/Core/index.md) | [▶](./document/Guide/Core/index.md) |

### Interdependent Class Structures
| FORMULA | NAME | ACRONYM | DESCRIPT |
| ------: | :--- | :------ | :------- |
|**C**<sub>MVRC<sub>\*</sub></sub> | Control (Model, View, Router, Controls) | CMVRC | Control class instances contain model, view, router, and subcontrol class instances. |
|**M**<sub>VRM<sub>\*</sub></sub> | Model (View, Router, Models) | MVRM | Model class instances contain view, router, and submodel class instances. |
|**V**<sub>MRV<sub>\*</sub></sub> | View (Model, Router, Views) | VMRV | View class instances contain model, router, and subview class instances. |
|**R**<sub>MVR<sub>\*</sub></sub> | Router (Model, View, Routers) | RMVR | Router class instances contain model, view, and subrouter class instances. |

## References
### Other Frameworks
Other frameworks that alone or combined resemble MVC Framework class system.  
**MV\* Frameworks**  
 - [PureMVC](https://puremvc.org/)
 - [Backbone](https://backbonejs.org/)
 - [Marionette](https://marionettejs.com/)
 - [Knockout](https://knockoutjs.com/)
 - [Angular](https://angular.dev/)
 - [React](https://react.dev/)

**Modeled Data Frameworks**  
 - [Mongoose](https://mongoosejs.com/)
 - [Redux](https://redux.js.org/)

**Router Frameworks**  
 - [Express](https://expressjs.com/)
 - [Page.js](https://visionmedia.github.io/page.js/)
 

### Keywords 
 - Presentation-Abstraction-Control
 - Hierarchal Model-View-Control
 - Model-View-Control Framework
   - MV* Framework
   - MVC Framework
   - MVR Framework
   - MVVR Framework
   - MVVM Framework
   - MV Framework
 - Array, Object Events
   - Array, Object Event Bubbling
   - Array, Object Nested Events
 - Array Events
   - Array Concat Event
   - Array CopyWithin Event
   - Array Fill
   - Array Pop Event
   - Array Push Event
   - Array Reverse Event
   - Array Shift Event
   - Array Splice Event
   - Array Unshift Event
 - Object Events
   - Object Assign Event
   - Object Define Properties/Property Event
   - Object Freeze Event
   - Object Seal Event
 - Property Accessor Events
   - Get Event
   - Set Event
   - Delete Event
 - Data Model Validation
 - Query Selector
 - Plain/Vanilla JS Framework
