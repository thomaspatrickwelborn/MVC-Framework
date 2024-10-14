export default function ReduceRight($content, $options) {
  const { root } = $content
  return function reduceRight() {
    return Array.prototype.reduceRight.call(root, ...arguments)
  }
}