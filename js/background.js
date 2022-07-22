chrome.runtime.onInstalled.addListener(() => {
  console.log('installed')
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ['js/foreground.js']
      })
      .then(() => {
        console.log('Injected the foreground script.')
      })
      .catch((err) => console.log(err))
  }
})
