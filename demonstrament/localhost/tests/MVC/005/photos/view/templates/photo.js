export default function photoTemplate($photo, $active) {
  let template
  if($active === false) {
    template = `<photo>${
      this.templates.img($photo.img)
    }</photo>`
  } else if($active === true){
    template = `<photo data-active="${$active}">${
      this.templates.img($photo.img)
    }</photo>`
  } else {
    template = ``
  }
  return template
}