import { SvgIcon, SvgIconProps } from "@mui/material";

/**
 * CustomSvgIcon is a component that extends the SvgIcon component from the Material-UI library.
 * It allows easy usage of custom SVG icons with in the storybook demos.
 */

function CustomSvgIcon(props: SvgIconProps) {
  return (
    <SvgIcon color="primary" viewBox="0 0 512 512" {...props}>
      <path d="M458.872,256.078c-17.529-26.644-41.771-52.681-70.79-76.4c-3.469-21.271-8.392-41.554-14.672-60.373 c53.195-0.169,87.024,22.59,72.415,73.747c-0.631,2.21-0.052,4.584,1.508,6.27c6.904,7.458,13.366,15.038,19.341,22.705 c3.073,3.943,9.293,3.121,11.202-1.498c32.302-78.145-10.047-146.718-120.43-140.279c-0.031,0.001-0.062,0.004-0.093,0.007 c-0.013-0.028-0.028-0.055-0.041-0.083c-53.56-106.69-148.783-106.875-202.496-0.688C40.555,73.469-15.599,151.807,52.904,255.924 c0.018,0.028,0.038,0.055,0.056,0.084c-67.012,100.563-16.503,183.6,101.482,175.776c0.008,0.016,0.014,0.03,0.022,0.046 c53.515,106.6,148.97,107.133,202.766,0.164C470.406,437.597,528.418,361.778,458.872,256.078z M138.187,119.848 c-6.226,18.763-11.107,38.972-14.546,60.159c-16.562,13.617-31.69,28.038-44.907,42.876 C38.058,152.559,74.283,120.168,138.187,119.848z M117.998,274.703c-5.69-6.007-11.138-12.226-16.31-18.65 c5.142-6.327,10.591-12.465,16.297-18.416C117.543,249.588,117.518,261.961,117.998,274.703z M78.682,289.361 c13.172,14.872,28.299,29.301,45.012,42.962c3.477,21.316,8.412,41.64,14.711,60.491 C67.963,392.674,43.078,352.627,78.682,289.361z M333.074,123.155c2.657,7.176,5.083,14.639,7.271,22.352 c-9.094-5.698-18.999-11.49-30.114-17.469C317.999,126.092,325.631,124.461,333.074,123.155z M315.549,85.768 c-19.762,3.974-39.653,9.827-59.258,17.221c-20.847-8.122-40.797-14.035-59.637-17.942 C232.529,25.172,278.658,23.544,315.549,85.768z M178.643,123.321c7.447,1.231,15.082,2.784,22.854,4.655 c-10.25,5.498-20.295,11.364-30.069,17.544C173.601,137.861,176.01,130.45,178.643,123.321z M178.794,389.096 c-2.692-7.253-5.148-14.8-7.362-22.603c9.524,5.966,19.569,11.81,30.503,17.666C194.064,386.139,186.334,387.787,178.794,389.096z M196.051,425.931c19.213-4.025,38.998-9.881,58.808-17.323c21.078,8.168,41.325,14.107,60.474,17.991 C278.773,487.933,232.398,487.509,196.051,425.931z M333.091,388.798c-7.661-1.267-15.52-2.879-23.521-4.823 c10.453-5.508,20.759-11.419,30.837-17.698C338.208,374.051,335.765,381.569,333.091,388.798z M351.321,311.775 c-29.889,22.661-63.024,41.092-95.899,54.615c-32.493-13.173-65.228-31.205-94.845-53.695 c-4.587-35.626-4.895-74.801-0.105-112.588c29.851-22.504,63.071-40.834,96.05-54.314c32.446,13.161,65.124,31.155,94.688,53.581 C355.863,235.562,356.016,274.655,351.321,311.775z M410.019,255.868c-5.135,6.281-10.554,12.377-16.218,18.285 c0.449-12.289,0.444-24.538-0.018-36.832C399.446,243.294,404.869,249.48,410.019,255.868z M373.55,392.273 c6.215-18.706,11.092-38.85,14.536-59.969c16.428-13.394,31.608-27.808,45.054-43.017 C473.701,359.55,437.451,391.95,373.55,392.273z" />{" "}
      <path d="M255.888,202.24c-29.643,0-53.76,24.117-53.76,53.76c0,29.643,24.117,53.76,53.76,53.76s53.76-24.117,53.76-53.76 C309.649,226.357,285.531,202.24,255.888,202.24z" />{" "}
    </SvgIcon>
  );
}

export default CustomSvgIcon;