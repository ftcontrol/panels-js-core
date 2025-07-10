export async function importFromSource(textContent: string) {
  const blob = new Blob([textContent], { type: "text/javascript" })
  const blobUrl = URL.createObjectURL(blob)
  const module = await import(/* @vite-ignore */ blobUrl)
  URL.revokeObjectURL(blobUrl)
  return module
}
