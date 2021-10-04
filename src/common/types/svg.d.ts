interface CustomSVGProps extends React.SVGAttributes<SVGElement> {
  fillContrast: string;
}

declare module "*.svg" {
  export const ReactComponent: React.FunctionComponent<CustomSVGProps>;
  const src: string;
  export default src;
}
