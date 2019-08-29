import "./popup.scss"
import { getOptions } from "./utils"

getOptions().then(options => {
  document.querySelector("#hosts-list-url").value = options.hostsListUrl
})

document.querySelector("#options-form").addEventListener("submit", event => {
  event.preventDefault()
  const hostsListUrl = document.querySelector("#hosts-list-url").value
  chrome.runtime.sendMessage({ type: "updateHostsToBlock", hostsListUrl }, response => {
    document.querySelector("#message-response").innerHTML = response
  })
})
