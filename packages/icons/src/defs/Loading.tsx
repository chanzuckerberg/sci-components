/*
 * The 45 degree step matches the spacing of the rays, so each step lands six
 * rays where rays already were and the only thing that visibly moves is the
 * gap.
 */
export default (
  <path d="M120 32L120 64A8 8 0 0 0 136 64L136 32A8 8 0 0 0 120 32ZM224 120L192 120A8 8 0 0 0 192 136L224 136A8 8 0 0 0 224 120ZM201.537 190.223L178.907 167.593A8 8 0 0 0 167.593 178.907L190.223 201.537A8 8 0 0 0 201.537 190.223ZM136 224L136 192A8 8 0 0 0 120 192L120 224A8 8 0 0 0 136 224ZM65.777 201.537L88.407 178.907A8 8 0 0 0 77.093 167.593L54.463 190.223A8 8 0 0 0 65.777 201.537ZM32 136L64 136A8 8 0 0 0 64 120L32 120A8 8 0 0 0 32 136ZM54.463 65.777L77.093 88.407A8 8 0 0 0 88.407 77.093L65.777 54.463A8 8 0 0 0 54.463 65.777Z">
    <animateTransform
      attributeName="transform"
      type="rotate"
      calcMode="discrete"
      values="0 128 128;45 128 128;90 128 128;135 128 128;180 128 128;225 128 128;270 128 128;315 128 128"
      dur="1s"
      repeatCount="indefinite"
    />
  </path>
);
