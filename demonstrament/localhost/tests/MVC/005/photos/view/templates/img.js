export default function imgTemplate($img) {
  return `<img src="${
    $img.src
  }" alt="${
    $img.alt
  }" width="${
    $img.width
  }" height="${
    $img.height
  }" />`
}