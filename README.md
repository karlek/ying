
# Ying

Playground with modern OpenGL for learning computer grapics. The name is a
reference to Ying from Paladins; she's a master of illusions and trickery.

_Visions are reality - Yung Lean_

## Build

```
$ pacaur -S glfw-x11 glm assimp glibc
# The linkopts used are: '-lglfw', '-lassimp', '-ldl'
# Since glm does not give us a shared object, we use it straight from `/usr/include/glm`

$ bazel build ying:main
```

## Run

```
# Run the program
$ ./bazel-bin/ying/main
```

## Project structure

- Data files such as models and textures go in `data/`
- Shaders recide in `shaders/`.
- The main project lives in `ying/`

## Credits

Thanks to [voithos/quarkGL](https://github.com/voithos/quarkGL) for being a
reference of the `bazel` build pipeline for OpenGL.
