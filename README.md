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
 - Web component, web page, or web application use.  
 - Simplistic configuration.  
 - Versatile patterning.  
 - Familiar programming interfaces promote plain Javascript.  
 - Event management system.  
 - Modeled content property modifer events, nested events.  
 - Window Location and Fetch Routers.  

## Class System
MVC Framework Classes may be instantiated independently or interdependently.  
### Independent Classes
| SYMBOL | NAME | DESCRIPT |
| -----: | :--- | :------- |
| M | MODEL | Manage schematized content. |
| X | MODEL SCHEMA | Manage data schema. |
| D | MODEL CONTENT | Manage data content. |
| V | VIEW | Manage templated markup elements. |
| R | ROUTER | Window location router or fetch router. |
| R<sup>L</sup> | ROUTER (LOCATION) | Manage window location. |
| R<sup>F</sup> | ROUTER (FETCH) | Manage AJAX connection. |
| C | CONTROL | Manage Model, View, Control, Location/Fetch Routers. |
| E | CORE | Manage Event Target Events. |

### Interdependent Class Structures
| FORMULA | NAME | ACRONYM | DESCRIPT |
| ------: | :--- | :------ | :------- |
|**C**<sub>MVRC<sub>\*</sub></sub> | Control (Model, View, Router, Controls) | CMVRC | Control class instances contain model, view, router, and subcontrol class instances. |
|**M**<sub>VRM<sub>\*</sub></sub> | Model (View, Router, Models) | MVRM | Model class instances contain view, router, and submodel class instances. |
|**V**<sub>MRV<sub>\*</sub></sub> | View (Model, Router, Views) | VMRV | View class instances contain model, router, and subview class instances. |
|**R**<sub>MVR<sub>\*</sub></sub> | Router (Model, View, Routers) | RMVR | Router class instances contain model, view, and subrouter class instances. |

## References
### Other Frameworks
Other frameworks that alone or combined resemble MVC Framework and it's class system.  
**MV\* Frameworks**  
 - [PureMVC](https://puremvc.org/)
 - [Backbone](https://backbonejs.org/)
 - [Marionette](https://marionettejs.com/)
 - [Knockout](https://knockoutjs.com/)
 - [Angular](https://angular.dev/)
 - [React](https://react.dev/)

**Modeled Data Frameworks**  
 - [Mongoose](https://mongoosejs.com/)
 - [ReactRedux](https://react-redux.js.org/)

**Router Frameworks**  
 - [ReactRouter](https://reactrouter.com/)
 - [Express](https://expressjs.com/)
### Keywords 
 - Presentation-Abstraction-Control
 - Hierarchal Movel-View-Control
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
