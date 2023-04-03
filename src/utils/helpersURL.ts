export const getBaseUrl = () => {
  const l = window.location;
  const base_url = l.protocol + '//' + l.host + '/' + l.pathname.split('/')[1];
  return base_url;
};

export const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert(err);
  }
};
