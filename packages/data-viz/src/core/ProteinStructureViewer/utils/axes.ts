/**
 * The orientation axes widget, as Mol* parameterizes it.
 *
 * Shared rather than declared where it is used, because two different parts of
 * Mol* take the same shape: the live canvas takes it as
 * `camera.helper.axes`, and the screenshot helper takes it as its own `axes`,
 * so an image can carry the widget or leave it out independently of the view
 * it was captured from.
 */
export const AXES_ON = {
  name: "on" as const,
  params: {
    alpha: 0.51,
    colorX: 16711680,
    colorY: 32768,
    colorZ: 255,
    labelColorX: 8421504,
    labelColorY: 8421504,
    labelColorZ: 8421504,
    labelOpacity: 1,
    labelScale: 0.25,
    labelX: "X",
    labelY: "Y",
    labelZ: "Z",
    location: "bottom-left",
    locationOffsetX: 0,
    locationOffsetY: 0,
    originColor: 8421504,
    planeColorXY: 8421504,
    planeColorXZ: 8421504,
    planeColorYZ: 8421504,
    radiusScale: 0.075,
    scale: 0.15,
    showLabels: false,
    showPlanes: true,
  },
};

export const AXES_OFF = { name: "off" as const, params: {} };
