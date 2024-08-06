export default function photosTemplate($photos) {
  return `<photos>${
    $photos.map(
      ($photo, $photoIndex) => this.templates.photo($photo, (
        $photos.currentIndex === $photoIndex
      ))
    ).join('\n')
  }</photos>`
}