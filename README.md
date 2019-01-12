
# Ying

## Build

```
$ pacaur -S glfw-x11 glm assimp
$ bazel build ying:main
```

## Run

```
$ ./bazel-bin/ying/main
```

## Project structure

- Data files such as models and textures go in `data/`.
- Shaders recide in `shaders/`.
- The main project lives in `ying/`

## Credits

Thanks to [voithos/quarkGL](https://github.com/voithos/quarkGL) for being a
reference of the `bazel` build pipeline for OpenGL.
