interface CustomSVGProps extends React.SVGAttributes<SVGElement> {
  fillContrast: string;
}

declare module "*.svg" {
  const value: React.FunctionComponent<CustomSVGProps>;
  export default value;
}
