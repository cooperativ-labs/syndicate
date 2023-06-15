export function parseDataAttributes(element: any) {
  const event = element.getAttribute('data-analytics-event');
  const category = element.getAttribute('data-analytics-category');
  const action = element.getAttribute('data-analytics-action');
  const label = element.getAttribute('data-analytics-label');
  const value = element.getAttribute('data-analytics-value');
  const rest = element.getAttribute('data-analytics-custom-dimensions');
  return { rest, core: { event, category, action, label, value } };
}

export function parseOverwriteObject(obj: any) {
  const core = {};
  for (const dimension in obj) {
    //@ts-ignore
    core[dimension] = obj[dimension];
  }
  const rest = {
    ...obj.customDimensions,
  };
  return { core, rest };
}
//@ts-ignore
export function parseCustomDimensions(dimensions) {
  let data;
  if (dimensions) {
    try {
      data = JSON.parse(dimensions);
    } catch (err) {
      data = { parserError: dimensions };
    }
  }
  return data;
}
