export const getBaseUrl = () => {
  if (typeof window === 'undefined' || !window.location) return '';
  const { protocol, host, pathname } = window.location;
  const firstPathSegment = (pathname || '/').split('/')[1] || '';
  const baseUrl = `${protocol}//${host}/${firstPathSegment}`;
  return baseUrl;
};

export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert(err);
  }
};
