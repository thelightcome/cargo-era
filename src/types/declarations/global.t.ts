export {}

declare global {
  interface Window {
    BarcodeDetector: {
      new (option: any): any
      getSupportedFormats(): Promise<any[]>
    }
  }
}
