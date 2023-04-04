if (typeof window === 'undefined') {
  importScripts('/zbar/a.out.js')
}

;(() => {
  const zbarInstance = Zbar()
  zbarInstance.onRuntimeInitialized = (_) => {
    const api = {
      scan_image: zbarInstance.cwrap('scan_image', '', [
        'number',
        'number',
        'number',
      ]),
      create_buffer: zbarInstance.cwrap('create_buffer', 'number', [
        'number',
        'number',
      ]),
      destroy_buffer: zbarInstance.cwrap('destroy_buffer', '', ['number']),
    }

    zbarInstance.detectSymbols = (image) => {
      const grayData = []
      const d = image.data
      for (let i = 0, j = 0; i < d.length; i += 4, j++) {
        grayData[j] = (d[i] * 66 + d[i + 1] * 129 + d[i + 2] * 25 + 4096) >> 8
      }

      const p = api.create_buffer(image.width, image.height)
      zbarInstance.HEAP8.set(grayData, p)

      api.scan_image(p, image.width, image.height)

      api.destroy_buffer(p)
    }

    zbarInstance.processResult = (_, data, __) => {
      postMessage(data)
    }
  }

  self.addEventListener('message', (event) => {
    const { data, width, height } = event.data
    if (!data || !width || !height) return
    zbarInstance.detectSymbols(event.data)
  })
})()
