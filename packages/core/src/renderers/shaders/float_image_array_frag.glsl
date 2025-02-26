#version 300 es

precision mediump float;

layout (location = 0) out vec4 fragColor;

uniform mediump sampler2DArray texture0;
// Define a maximum number of channels
#define MAX_CHANNELS 32
uniform bool Visible[MAX_CHANNELS];
uniform vec3 Color[MAX_CHANNELS];
uniform float ValueOffset[MAX_CHANNELS];
uniform float ValueScale[MAX_CHANNELS];

in vec2 TexCoords;

void main() {
    vec3 rgbColor = vec3(0, 0, 0);
    for (int i = 0; i < MAX_CHANNELS; i++) {
        if (!Visible[i]) continue;
        float texel = texture(texture0, vec3(TexCoords, i)).r;
        float value = (texel + ValueOffset[i]) * ValueScale[i];
        rgbColor += value * Color[i].rgb;
    }
    fragColor = vec4(rgbColor.rgb, 1);
}
