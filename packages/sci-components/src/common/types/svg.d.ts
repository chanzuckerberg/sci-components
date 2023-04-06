interface CustomSVGProps extends React.SVGAttributes<SVGElement> {
  fillcontrast: string;
}

declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<CustomSVGProps>;
  const src: string;
  export default src;
}
