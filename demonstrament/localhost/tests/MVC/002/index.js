const settings = {
  routes: {
    'link-a': {
      name: "Link C",
      path: 'link-a',
      class: "Main",
      content: {
        header: "SUBJECT A",
        subheader: "SUBJECT A EXTENDED",
        author: "SOME AUTHOR NAME",
      }
    },
    'link-b': {
      name: "Link C",
      path: 'link-b',
      class: "Main",
      content: {
        header: "SUBJECT B",
        subheader: "SUBJECT B EXTENDED",
        author: "SOME AUTHOR NAME",
      }
    },
    'link-c': {
      name: "Link C",
      path: 'link-c',
      class: "Main",
      content: {
        header: "SUBJECT B",
        subheader: "SUBJECT B EXTENDED",
        author: "SOME AUTHOR NAME",
      }
    },
  }
}
const options = { enable: true }
export [settings, options]