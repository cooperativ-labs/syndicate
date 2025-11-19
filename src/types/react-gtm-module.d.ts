declare module 'react-gtm-module' {
  const TagManager: {
    dataLayer: (args: { dataLayer: Record<string, unknown> }) => void;
    initialize?: (args: { gtmId: string }) => void;
  };
  export default TagManager;
}
