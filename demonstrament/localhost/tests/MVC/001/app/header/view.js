const settings = {
  element: document.getElementById('app'),
  selectors: {
    menu: 'header > menu',
    menuPanButton: 'header > menu > button',
    menuNavButton: 'header > menu > nav > button',
  },
  templates: {
    template: ($data) => {
      return `
      <header>
        <h1>${$data.name}</h1>
        <menu data-pan="${$data.menu.pan}">
          <button data-action="pan">${$data.menu.symbol}</button>
          <nav>
            <div class="label">${$data.menu.label}</div>
            ${$data.menu.nav.buttons.map(
              ($button) => {
                return `<button data-link="${$button.link}">
                  ${$button.textContent}
                </button>`
              }
            ).join('\n')}
          </nav>
        </menu>
      </header>
      `
    },
  },
}
const options = {}
export default [settings, options]