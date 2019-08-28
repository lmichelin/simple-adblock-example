import "./inject.scss"

const selectors = [".fbPageBanner"]

for (const selector of selectors) {
  try {
    document.querySelector(selector).style.display = "none"
  } catch (error) {}
}

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type !== "childList") continue

    // A child node has been added or removed

    for (const addedNode of mutation.addedNodes) {
      if (addedNode.attributes && addedNode.getAttribute("aria-label") === "cookieconsent") {
        addedNode.style.display = "none"
      }
    }
  }
})

observer.observe(document.body, { childList: true, subtree: true })
