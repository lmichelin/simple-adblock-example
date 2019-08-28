module.exports = {
  "ad.doubleclick.net should be blocked"(browser) {
    browser
      .pause(1000)
      .url("https://ad.doubleclick.net/")
      .assert.containsText("body", "ERR_BLOCKED_BY_CLIENT")
      .end()
  },
  "Google Analytics script should not be loaded"(browser) {
    browser
      .pause(1000)
      .url("https://www.theodo.fr")
      .execute(
        function() {
          return typeof ga
        },
        [],
        result => {
          browser.assert.equal(result.value, "undefined")
        },
      )
      .end()
  },
}
