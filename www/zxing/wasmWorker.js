if( 'undefined' === typeof window){
  importScripts('/zxing/zxing_reader.js')
}

;(function () {
  let zxingInstance
  ZXing().then(function (instance) {
    zxingInstance = instance
  })

  const MODE = true
  const FORMAT = ''

  self.addEventListener('message', (data) => {
    const imageData = data.data
    if (!imageData.width || !imageData.height || !imageData.data) {
      postMessage({
        error: `ZXing not yet initialized, ${!imageData.width}, ${!imageData.height}, ${!imageData.data}`,
      })
      return
    }
    if (zxingInstance != null) {
      const sourceBuffer = imageData.data
      const buffer = zxingInstance._malloc(sourceBuffer.byteLength)
      zxingInstance.HEAPU8.set(sourceBuffer, buffer)
      const result = zxingInstance.readBarcodeFromPixmap(
        buffer,
        imageData.width,
        imageData.height,
        MODE,
        FORMAT
      )
      zxingInstance._free(buffer)
      if (result) postMessage(result)
    } else {
      return postMessage({ error: 'ZXing not yet initialized' })
    }
  })
})()
