const settings = {
  content: {
    name: 'Name',
    menu: {
      pan: 'in',
      symbol: '≡',
      label: 'Links',
      nav: {
        buttons: [{
          textContent: 'Page 1',
          link: './link-a/',
        }, {
          textContent: 'Page 2',
          link: './link-b/',
        }, {
          textContent: 'Page 3',
          link: './link-c/',
        }]
      }
    }
  },
}
const options = {}
export default [settings, options]