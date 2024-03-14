/**
 * Function to determine whether to use light or dark text based on the background color.
 * @param {string} bgColor - The background color in hex or RGB format.
 * @param {string} lightColor - The color code for light text (default: "#ffffff").
 * @param {string} darkColor - The color code for dark text (default: "#000000").
 * @returns {string} - The color code for the chosen text color.
 */
export const pickTextColorBasedOnBgColor = (
  bgColor: string,
  lightColor: string = "#ffffff",
  darkColor: string = "#000000"
): string => {
  // Extracting the hex color if it starts with '#'
  const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;

  // Extracting individual RGB values from the hex color
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB

  // Normalizing RGB values to the range [0, 1]
  const uicolors = [r / 255, g / 255, b / 255];

  // Applying the gamma correction to the RGB values
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });

  // Calculating the relative luminance of the color
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

  // Choosing text color based on the luminance
  return L > 0.5 ? darkColor : lightColor;
};

export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const convertToKebabCase = (input: string): string => {
  return input
    .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
    .replace(/\d+/g, (match) => `-${match}`)
    .replace(/^-/, "")
    .replace(/-+/g, "-");
};
