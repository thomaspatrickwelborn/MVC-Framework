// Classes
import DynamicEventTarget from './Core/DynamicEventTarget/index.js'
import DynamicEventSystem from './Core/DynamicEventSystem/index.js'
import Core from './Core/index.js'
import Model from './Model/index.js'
import {
  StaticView, DynamicView
} from './View/index.js'
import Control from './Control/index.js'
import {
  StaticRouter, FetchRouter
} from './Router/index.js'
// Class Aliases
const DET = DynamicEventTarget
const DES = DynamicEventSystem

export {
  DynamicEventTarget, DET,
  DynamicEventSystem, DES,
  Core, 
  Model, 
  StaticView, DynamicView, 
  Control, 
  StaticRouter, FetchRouter,
}