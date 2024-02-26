function getElementByXPath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const latestAside = document.getElementById("latest-aside");
const latestHeader = getElementByXPath("//header[@id=\"latest-header\"]/strong");
let latestVersion = latestAside.innerHTML.split('\n')[0].substring(2);
latestHeader.innerHTML = latestVersion;
console.log(latestHeader.innerHTML)
