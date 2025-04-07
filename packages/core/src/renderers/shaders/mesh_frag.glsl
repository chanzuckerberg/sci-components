#version 300 es

precision mediump float;

layout (location = 0) out vec4 fragColor;

uniform sampler2D texture0;

in vec2 TexCoords;

void main() {
    fragColor = vec4(texture(texture0, TexCoords).rgb, 1.0);
}