function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`
}

function getCookie(name: string): string | null {
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cur) => {
      const [key, val] = cur.split("=")
      if (key && val) acc[key] = decodeURIComponent(val)
      return acc
    }, {})
  const data = cookies[name] ?? null

  return data
}

export { setCookie, getCookie }
