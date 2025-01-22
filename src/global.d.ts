declare module '*.yml' {
  const content: any;
  export default content;
}

interface Window {
  EO?: {
    show: (formId: string) => void;
  }
} 