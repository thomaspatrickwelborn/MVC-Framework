export default function subtestC() {
	var content = new DynamicEventTarget([])
  content.addEventListener('change', function contentEvent($event) { console.log($event) })
  content.dispatchEvent(new CustomEvent('change'))
  content.push("AAA")
  content.forEach(($item) => console.log($item))
  console.log(content.slice())
  console.log(content)
  console.log(...content)
}