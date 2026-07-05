declare global {
  interface Window {
    Greeting?: (data: string) => Promise<any>;
  }
}