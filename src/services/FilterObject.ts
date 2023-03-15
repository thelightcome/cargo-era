export default function FilterObject(v: { [key: string]: any }): {
  [key: string]: any
} {
  return Object.keys(v).reduce((t: { [key: string]: any }, k: string) => {
    if (v[k]) t[k] = v[k]

    return t
  }, {})
}
