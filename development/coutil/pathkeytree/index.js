export default function pathkeytree($object) {
  const target = []
  for(const [$key, $value] of Object.entries($object)) {
    target.push($key)
    if(typeof $value === 'object') {
      const subtarget = pathkeytree($value)
      for(const $subtarget of subtarget) {
        let path
        if(typeof $subtarget === 'object') {
          path = [$key, ...$subtarget].join('.')
        }
        else {
          path = [$key, $subtarget].join('.')
        }
        target.push(path)
      }
    }
  }
  return target
}