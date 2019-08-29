export const getOptions = async () => {
  return new Promise(resolve => {
    chrome.storage.sync.get(
      {
        // set default values
        hostsListUrl:
          "https://raw.githubusercontent.com/EnergizedProtection/block/master/spark/formats/domains.txt",
      },
      resolve,
    )
  })
}
