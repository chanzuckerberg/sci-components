#version 300 es

precision mediump float;

layout (location = 0) out vec4 fragColor;

uniform vec3 LineColor;

void main() {
    fragColor = vec4(LineColor, 1.0);
}
