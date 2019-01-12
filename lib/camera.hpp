#ifndef CAMERA_H
#define CAMERA_H

#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <glm/glm.hpp>
#include <glm/ext.hpp>
#define GLM_ENABLE_EXPERIMENTAL
#include <glm/gtx/string_cast.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

// Defines several possible camera movements. Used as an abstraction to stay
// away from window-system based input methods.
enum Camera_Movement {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
};

// Default camera values

// Yaw is initialized to -90.0 degrees since a yaw of 0.0 results in a
// direction vector pointing to the right so we initially rotate a bit to
// the left.
const float YAW = -90.0f;
const float PITCH = 0.0f;
const float SPEED = 2.5f;
const float SENSITIVITY = 0.1f;
const float ZOOM = 45.0f;

// An abstract camera class that processes input and calculates the
// corresponding Euler Angles, Vectors and Matricies for use in OpenGL.
class Camera {
public:
    // Camera attributes;
    glm::vec3 Position;
    glm::vec3 Front;
    glm::vec3 Up;
    glm::vec3 Right;
    glm::vec3 WorldUp;

    // Euler Angles.
    float Yaw;
    float Pitch;

    // Camera Options.
    float MovementSpeed;
    float MouseSensitivity;
    float Zoom;

    Camera(glm::vec3 position = glm::vec3(0.0f, 0.0f, 0.0f),
           glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f),
           float yaw = YAW,
           float pitch = PITCH)
         : Front(glm::vec3(0.0f, 0.0f, -1.0f)),
           MovementSpeed(SPEED),
           MouseSensitivity(SENSITIVITY),
           Zoom(ZOOM) {
        Position = position;
        WorldUp = up;
        Yaw = yaw;
        Pitch = pitch;
        updateCameraVectors();
    }
    // Constructor with scalar values
    Camera(float posX,
           float posY,
           float posZ,
           float upX,
           float upY,
           float upZ,
           float yaw,
           float pitch)
         : Front(glm::vec3(0.0f, 0.0f, -1.0f)),
           MovementSpeed(SPEED),
           MouseSensitivity(SENSITIVITY),
           Zoom(ZOOM) {
        Position = glm::vec3(posX, posY, posZ);
        WorldUp = glm::vec3(upX, upY, upZ);
        Yaw = yaw;
        Pitch = pitch;
        updateCameraVectors();
    }
    glm::mat4 getViewMatrix() {
        return glm::lookAt(Position, Position+Front, Up);
    }

    // Proccesses input received from any keyboard-like input system. Accepts
    // input aparameter in the form of camera defined ENUM (to abstract it from
    // windowing systems)
    void ProcessKeyboard(Camera_Movement direction, float deltaTime) {
        float velocity = MovementSpeed * deltaTime;
        if (direction == FORWARD) {
            Position += Front * velocity;
        }
        if (direction == BACKWARD) {
            Position -= Front * velocity;
        }
        if (direction == LEFT) {
            Position -= Right * velocity;
        }
        if (direction == RIGHT) {
            Position += Right * velocity;
        }
    }

    // Processes input received from a mouse input system. Expects the offset
    // value in both the x and y direction.
    void ProcessMouseMovement(float xOffset, float yOffset, GLboolean constrainPitch = true) {
        xOffset *= MouseSensitivity;
        yOffset *= MouseSensitivity;

        Yaw += xOffset;
        Pitch += yOffset;

        if (constrainPitch) {
            if (Pitch > 89.0f) {
                Pitch = 89.0f;
            }
            if (Pitch < -89.0f) {
                Pitch = -89.0f;
            }
        }

        updateCameraVectors();
    }

    // Processes input received from a mouse scroll-wheel event. Only requires
    // input on the vertical wheel-axis
    void ProcessMouseScroll(float yOffset) {
        if (Zoom >= 1.0 && Zoom <= 45.0f) {
            Zoom -= yOffset;
        }
        if (Zoom <= 1.0f) {
            Zoom = 1.0f;
        }
        if (Zoom >= 45.0f) {
            Zoom = 45.0f;
        }
    }

private:
    void updateCameraVectors() {
        glm::vec3 front;
        front.x = std::cos(glm::radians(Pitch)) * cos(glm::radians(Yaw));
        front.y = std::sin(glm::radians(Pitch));
        front.z = std::cos(glm::radians(Pitch)) * sin(glm::radians(Yaw));
        Front = glm::normalize(front);
        // Also re-calculate the Right and Up vector
        // Normalize the vectors, because their length gets closer to 0 the more
        // you look up or down which results in slower movement.
        Right = glm::normalize(glm::cross(Front, WorldUp));
        Up = glm::normalize(glm::cross(Right, Front));
    }
};

#endif