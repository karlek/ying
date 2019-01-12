#version 330 core
out vec4 FragColor;

struct Material {
   sampler2D diffuse;
   sampler2D specular;
   float shininess;
};

struct DirLight {
   vec3 direction;

   vec3 ambient;
   vec3 diffuse;
   vec3 specular;
};

struct SpotLight {
   vec3 position;
   vec3 direction;
   float cutOff;
   float outerCutOff;

   float constant;
   float linear;
   float quadratic;

   vec3 ambient;
   vec3 diffuse;
   vec3 specular;
};

struct PointLight {
   vec3 position;

   float constant;
   float linear;
   float quadratic;

   vec3 ambient;
   vec3 diffuse;
   vec3 specular;
};
#define NR_POINT_LIGHTS 4

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

uniform vec3 viewPos;
uniform Material material;
uniform DirLight dirLight;
uniform SpotLight spotLight;
uniform PointLight pointLights[NR_POINT_LIGHTS];

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir) {
   vec3 lightDir = normalize(-light.direction);
   // Diffuse shading
   float diff = max(dot(normal, lightDir), 0.0);
   // Specular shading
   vec3 reflectDir = max(reflect(-lightDir, normal), 0.0);
   float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
   // Combine results
   vec3 ambient = light.ambient * texture(material.diffuse, TexCoords).rgb;
   vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
   vec3 specular = light.specular * spec * texture(material.specular, TexCoords).rgb;
   return ambient + diffuse + specular;
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir) {
   vec3 lightDir = normalize(light.position - fragPos);
   // Diffuse shading
   float diff = max(dot(normal, lightDir), 0.0);
   // Specular shading
   vec3 reflectDir = max(reflect(-lightDir, normal), 0.0);
   float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
   // Attenuation
   float distance = length(light.position - fragPos);
   float attenuation = 1.0 / (light.constant + light.linear * distance +
                              light.quadratic * (distance * distance));

   // Combine results
   vec3 ambient = light.ambient * texture(material.diffuse, TexCoords).rgb;
   vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
   vec3 specular = light.specular * spec * texture(material.specular, TexCoords).rgb;

   ambient *= attenuation;
   diffuse *= attenuation;
   specular *= attenuation;

   return ambient + diffuse + specular;
}

vec3 CalcSpotLight(SpotLight light, vec3 normal, vec3 fragPos, vec3 viewDir) {
   vec3 lightDir = normalize(light.position - fragPos);
   // Diffuse shading
   float diff = max(dot(normal, lightDir), 0.0);
   // Specular shading
   vec3 reflectDir = max(reflect(-lightDir, normal), 0.0);
   float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);

   // Combine results
   vec3 ambient = light.ambient * texture(material.diffuse, TexCoords).rgb;
   vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
   vec3 specular = light.specular * spec * texture(material.specular, TexCoords).rgb;

   float theta = dot(lightDir, normalize(-light.direction));
   float epsilon = light.cutOff - light.outerCutOff;
   float intensity = clamp((theta - light.outerCutOff) / epsilon, 0.0, 1.0);
   diffuse *= intensity;
   specular *= intensity;

   // Attenuation
   float distance = length(light.position - fragPos);
   float attenuation = 1.0 / (light.constant + light.linear * distance +
                              light.quadratic * (distance * distance));
   ambient *= attenuation;
   diffuse *= attenuation;
   specular *= attenuation;

   return ambient + diffuse + specular;
}

void main() {
   // Properties
   vec3 normal = normalize(Normal);
   vec3 viewDir = normalize(viewPos - FragPos);

   // Phase 1: Directional lighting
   vec3 result = CalcDirLight(dirLight, normal, viewDir);
   // Phase 2: Point lights
   for (int i = 0; i < NR_POINT_LIGHTS; i++) {
      result += CalcPointLight(pointLights[i], normal, FragPos, viewDir);
   }
   // Phase 3: Spot light
   result += CalcSpotLight(spotLight, normal, FragPos, viewDir);
   FragColor = vec4(result, 1.0);
}