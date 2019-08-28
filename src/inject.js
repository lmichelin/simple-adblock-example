import "./inject.scss"

const selectors = [".fbPageBanner"]

for (const selector of selectors) {
  try {
    document.querySelector(selector).style.display = "none"
  } catch (error) {}
}
