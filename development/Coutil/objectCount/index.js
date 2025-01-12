export default function objectCount($object) {
  if($object && typeof $object !== 'object') return undefined 
  let count = 1
  for(const [$key, $value] of Object.entries($object)) {
    if(typeof $value === 'object') { count += objectCount($value) }
  }
  return count
}