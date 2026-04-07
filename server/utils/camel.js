// Convert a snake_case postgres row object to camelCase
export function toCamel(row) {
  return Object.fromEntries(
    Object.entries(row).map(([k, v]) => [
      k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      v,
    ])
  )
}
