interface Share {
  title: string
  text?: string
  url: string
  copyValue?: string
}

class WebSharingError extends Error {
  constructor(...params) {
    super(...params)
    this.name = "WebSharingError"
  }
}

enum TypeOfSharing {
  COPY = "copy",
  APP = "app"
}

const copyURL = async (share: Share) => {
  // The code comment below does not work because Kakao Talk browser does not support it
  // await navigator.clipboard.writeText(HOMEPAGE_URL)
  const vmTextArea = document.createElement("textarea")
  document.body.appendChild(vmTextArea)
  vmTextArea.style.top = "0"
  vmTextArea.style.left = "0"
  vmTextArea.style.position = "fixed"
  vmTextArea.style.zIndex = "-1"
  vmTextArea.style.color = "white"
  vmTextArea.value = share.copyValue || share.url
  vmTextArea.select()
  document.execCommand("copy")
  document.body.removeChild(vmTextArea)
}

const shareUsingTheApp = async (share: Share) => {
  await navigator.share({
    title: share.title,
    text: share.text,
    url: share.url
  })
}

const validate = (share: Share) => {
  if (location.protocol === "http:") {
    console.warn("App sharing on the Web is only available in the https protocol.")
  }
  if (share === undefined || share.title === undefined || share.url === undefined) {
    throw new WebSharingError(
      "The share, share.title and share.url parameter is a required input value. Please refer to the README.md file."
    )
  }
}

const shareWebPage = (
  share: Share,
  onSuccess?: (typeOfSharing: TypeOfSharing) => any,
  onFail?: (e: Error) => any
) => {
  try {
    validate(share)
    const isEnableNavigator = navigator.share
    if (isEnableNavigator) {
      shareUsingTheApp(share)
        .then(() => onSuccess(TypeOfSharing.APP))
        .catch((e) => {
          if (!String(e).includes("canceled")) {
            onFail(e)
          }
        })
    } else {
      copyURL(share)
        .then(() => onSuccess(TypeOfSharing.COPY))
        .catch(onFail)
    }
  } catch (e) {
    if (
      e instanceof ReferenceError &&
      (e.message == "navigator is not defined" || e.message == "location is not defined")
    ) {
      throw new WebSharingError("The web-sharing package is only available on the web.")
    }
    if (onFail !== undefined) {
      return onFail(e)
    }
    throw e
  }
}

export { Share, WebSharingError, TypeOfSharing }
export default shareWebPage
