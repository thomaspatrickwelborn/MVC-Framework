import { Model, View, Control } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  const model = new Model({
    content: {
      header: {
        name: 'Name',
        menu: {
          pan: 'in',
          symbol: '≡',
          label: 'Links',
          nav: {
            buttons: [{
              textContent: 'Page 1',
              link: './page-1/',
            }, {
              textContent: 'Page 2',
              link: './page-2/',
            }, {
              textContent: 'Page 3',
              link: './page-3/',
            }]
          }
        }
      }
    },
    events: {
      'content.header.menu assignSourceProperty': ($event) => {
        view.selectors.menu.setAttribute('data-pan', $event.detail.val)
      },
    },
  })
  const view = new View({
    element: document.getElementById('app'),
    selectors: {
      menu: 'header > menu',
      menuPanButton: 'header > menu > button',
      menuNavButton: 'header > menu > nav > button',
    },
    events: {
      'selectors.menuPanButton click': function menuPanButtonClick($event) {
        let pan = (
          view.selectors.menu.getAttribute('data-pan') === 'in'
        ) ? 'ex'
          : 'in'
        model.content.header.menu.assign({ pan })
      }
    },
    templates: {
      template: ($data) => {
        const { header } = $data
        return `
        <header>
          <h1>${header.name}</h1>
          <menu data-pan="${header.menu.pan}">
            <button data-action="pan">${header.menu.symbol}</button>
            <nav>
              <div class="label">${header.menu.label}</div>
              ${header.menu.nav.buttons.map(
                ($button) => {
                  return `<button data-link="${$button.link}">${$button.textContent}</button>`
                }
              ).join('\n')}
            </nav>
          </menu>
        </header>
        `
      },
    },
  })
  view.renderElement({
    name: 'template',
    data: model.content, 
  })
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)