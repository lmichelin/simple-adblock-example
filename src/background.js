import { getOptions } from "./utils"

let hostsToBlock = []
let blockedRequestsCount = 0

const updateHostsToBlock = hostsListUrl => {
  return fetch(hostsListUrl)
    .then(response => response.text())
    .then(responseText => {
      hostsToBlock = responseText.split("\n").filter(line => !line.startsWith("#"))
      console.log(`${hostsToBlock.length} hosts will be blocked`)
      chrome.storage.sync.set({ hostsListUrl })
    })
}

getOptions().then(async options => {
  try {
    await updateHostsToBlock(options.hostsListUrl)
  } catch (error) {
    console.error(error)
    chrome.browserAction.setBadgeText({ text: "error" })
  }
})

chrome.webRequest.onBeforeRequest.addListener(
  requestDetails => {
    const targetUrl = new URL(requestDetails.url)
    const targetHostname = targetUrl.hostname
    const shouldBlockRequest = hostsToBlock.includes(targetHostname)

    console.log(targetHostname, shouldBlockRequest ? "blocked" : "allowed")

    if (shouldBlockRequest) {
      blockedRequestsCount++
      chrome.browserAction.setBadgeText({ text: blockedRequestsCount.toString() })
    }

    return { cancel: shouldBlockRequest }
  },
  { urls: ["<all_urls>"] },
  ["blocking"],
)

chrome.runtime.onMessage.addListener(async (message, sender, response) => {
  if (message.type === "updateHostsToBlock") {
    try {
      await updateHostsToBlock(message.hostsListUrl)
      response("Hosts successfully updated!")
    } catch (error) {
      response(error.toString())
    }
  }
})
