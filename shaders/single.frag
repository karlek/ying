#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

void main() {
    FragColor = vec4(vec3(0.3, 0.5, 1.0), 0.3);
}