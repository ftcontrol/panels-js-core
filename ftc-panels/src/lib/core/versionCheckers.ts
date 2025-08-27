async function getLazarPackageLatestVersion(pck: string) {
  return await genericGitHubMavenVersionFetcher(
    "lazarcloud",
    "ftcontrol-maven",
    "releases",
    pck
  )
}

async function genericGitHubMavenVersionFetcher(
  org: string,
  repo: string,
  folder: string,
  pck: string
): Promise<string> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${org}/${repo}/refs/heads/main/${folder}/${pck.replaceAll(
        ".",
        "/"
      )}/maven-metadata.xml`
    )
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const xmlText = await response.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, "application/xml")

    const latestVersion = xmlDoc.querySelector("latest")?.textContent

    return latestVersion || ""
  } catch (error) {
    return ""
  }
}

export { getLazarPackageLatestVersion, genericGitHubMavenVersionFetcher }
