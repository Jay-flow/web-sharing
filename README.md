# web-sharing

![npm](https://img.shields.io/npm/v/web-sharing)
![npm](https://img.shields.io/npm/l/web-sharing)
![npm](https://img.shields.io/npm/dt/web-sharing)

## Documentation

- [About web-sharing](https://github.com/Jay-flow/web-sharing#about-flow-react-cli)
- [Requirements](https://github.com/Jay-flow/web-sharing#requirements)
- [Usage](https://github.com/Jay-flow/web-sharing#usage)
- [Preview](https://github.com/Jay-flow/web-sharing#preview)
- [Contributing to web-sharing](https://github.com/Jay-flow/web-sharing#contributing-to-web-sharing)

## About web-sharing

The web-sharing package is an easy way to share the content you want on the web.

There is an inconvenience that the Web Share API provides sharing functionality but does not support devices that need to be handled separately.

By automating those parts, this package makes it easier to implement sharing.

## Requirements

1. This package is only available on the Web. It is not dependent on JavaScript libraries such as React and Vue.

2. App sharing is only available with the Https protocol. (For the http protocol, shared content is copied to the clipboard.)

---

## Getting started

`npm install web-sharing`

## Usage

### Simple Code

```ts
import shareWebPage, { TypeOfSharing } from "web-sharing"


const ShareButton: React.FC = () => {
  const APP_NAME = "My Web App"
  const HOMEPAGE_URL = "https://google.com"
  const onFail = () => alert("The share failed.")

  const onSuccess = (typeofSharing: TypeOfSharing) => {
    if (typeofSharing.APP) {
      alert("Shared successfully.")
    } else {
      // The browser does not support sharing.
      alert("Web address copied successfully.")
    }
  }

  return (
    <div>
      <button
        onClick={() =>
          shareWebPage(
            {
              title: APP_NAME,
              url: HOMEPAGE_URL,
              copyValue: `Welcome! ${HOMEPAGE_URL}`
            },
            onSuccess,
            onFail
          )
        }>
        Share Button
      </button>
    </div>
  )
}

export default ShareButton
```

### shareWebPage

The main function that is the entry point of the program.
Required parameters are as follows.

The main function that is the entry point of the program.
Among the parameters, the options and requirements are as follows.

```ts
const shareWebPage = (
  share: Share,
  onSuccess?: (typeOfSharing: TypeOfSharing) => any,
  onFail?: (e: Error) => any
) => {
  ...
}
```

- share: [isRequired] tpye of Share
- onSuccess: [optional] Callback called after success
- onFail: [optional] Callback called after failure

### share

The interfaces of the required parameters are as follows.

```ts
interface Share {
  title: string
  url: string
  text?: string
  copyValue?: string
}
```

- title: [isRequired]
- url: [isRequired]
- text: [optional]
- copyValue: [optional] Text to copy to clipboard if sharing is not supported (url will be copied by default)

### onSuccess

The callback that is called after the share is successful.
The TypeOfSharing variable can be used to process separately depending on the type of share.

Example.

```ts
import { TypeOfSharing } from "web-sharing"

const onSuccessShare = (typeofSharing: TypeOfSharing) => {
  if (typeofSharing.APP) {
    alert("Shared successfully.")
  } else if (typeofSharing.COPY) {
    // The browser does not support sharing.
    alert("Web address copied successfully.")
  } else {
    alert("Etc...")
  }
}
```

### onFail

The callback that is called after the share is failse.
The WebSharingError class is responsible for errors that can be expected in the package.
You can import this class and process it separately.

```ts
import { WebSharingError } from "web-sharing"

const onFail = (e) => {
  if(e instanceof WebSharingError) {
    ...
  }
}

```

## Preview

![preview](./design/preview.gif)

## Contributing to web-sharing

I am working hard to develop this package with affection.
I check all the requests and issues.
I'm not a JavaScript developer. There are many parts of this package that are lacking.

This package needs your help.

Please write about the code and if you have a better code, please revise it and contribute.

Please upload the idea or bug for package function development on the [issue](https://github.com/Jay-flow/web-sharing/issues).

I like all discussions related to development because I am in a learning position.

If you have any further questions or need to contact me, please email jay.flow.dev@gmail.com.

**Thank you for using my package and for your interest.**