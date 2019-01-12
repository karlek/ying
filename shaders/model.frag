#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

struct DirLight {
   vec3 direction;

   vec3 ambient;
   vec3 diffuse;
   vec3 specular;
};

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_specular1;
uniform DirLight dirLight;
uniform vec3 viewPos;

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir) {
   vec3 lightDir = normalize(-light.direction);
   // Diffuse shading
   float diff = max(dot(normal, lightDir), 0.0);
   // Specular shading
   vec3 reflectDir = max(reflect(-lightDir, normal), 0.0);
   float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64);
   // Combine results
   vec3 ambient = light.ambient * texture(texture_diffuse1, TexCoords).rgb;
   vec3 diffuse = light.diffuse * diff * texture(texture_diffuse1, TexCoords).rgb;
   vec3 specular = light.specular * spec * texture(texture_specular1, TexCoords).rgb;
   return ambient + diffuse + specular;
}

void main() {
    vec3 normal = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 result = CalcDirLight(dirLight, normal, viewDir);

    FragColor = vec4(result, 1.0);
}