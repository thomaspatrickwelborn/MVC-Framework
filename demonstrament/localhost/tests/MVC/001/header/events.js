function clickMenuPanButton($event) {
  console.log($event.type, $event)
}
function clickMenuNavButton($event) {
  console.log($event.type, $event)
}
function assignSourcePropertyPan($event) {
  console.log(event.type, $event)
}
export default {
  // 'views.view.selectors'
  'views.view.selectors.menuPanButton click': clickMenuPanButton,
  'views.view.selectors.menuNavButton click': clickMenuNavButton,
  // 'models.model.content',
  'models.model.content.menu assignSourceProperty:pan': assignSourcePropertyPan,

}