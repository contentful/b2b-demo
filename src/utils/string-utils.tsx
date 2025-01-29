export const toTitleCase = (str: string): string | undefined => {
  if (!str) return;
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export const formatMessage = (
  message: string,
  ...values: string[]
): string | undefined => {
  if (!message) return;
  let formattedMessage = message;
  values.forEach((value, idx) => {
    formattedMessage = formattedMessage.replace(`{${idx}}`, value);
  });
  return formattedMessage;
};
