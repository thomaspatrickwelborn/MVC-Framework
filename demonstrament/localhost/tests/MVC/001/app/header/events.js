export default {
  // 'views.view.selectors'
  'views.view.selectors.menuPanButton click': function clickMenuPanButton($event) {
    const pan = (
      this.views.view.selectors.menu
      .getAttribute('data-pan') === 'in'
    ) ? 'ex'
      : 'in'
    this.models.model.content.menu.assign({ pan })
  },
  'views.view.selectors.menuNavButton click': function clickMenuNavButton($event) {
    const link = $event.currentTarget.getAttribute('data-link')
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { link }
    }))
  },
  'models.model.content.menu assignSourceProperty:pan': function assignSourcePropertyPan($event) {
    this.views.view.selectors.menu
    .setAttribute('data-pan', $event.detail.val)
  },
}