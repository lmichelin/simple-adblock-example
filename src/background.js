const hostListUrl =
  "https://raw.githubusercontent.com/EnergizedProtection/block/master/spark/formats/domains.txt"

fetch(hostListUrl)
  .then(response => response.text())
  .then(responseText => {
    const hostsToBlock = responseText.split("\n").filter(line => !line.startsWith("#"))

    console.log(`${hostsToBlock.length} hosts will be blocked`)

    chrome.webRequest.onBeforeRequest.addListener(
      requestDetails => {
        const targetUrl = new URL(requestDetails.url)
        const targetHostname = targetUrl.hostname
        const shouldBlockRequest = hostsToBlock.includes(targetHostname)

        console.log(targetHostname, shouldBlockRequest ? "blocked" : "allowed")

        return { cancel: shouldBlockRequest }
      },
      { urls: ["<all_urls>"] },
      ["blocking"],
    )
  })
  .catch(console.error)
