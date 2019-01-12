load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

new_local_repository(
    name = "glm",
    path = "/usr/include/glm",
    build_file = "BUILD.glm",
)

http_archive(
    name = "assimp",
    sha256 = "60080d8ab4daaab309f65b3cffd99f19eb1af8d05623fff469b9b652818e286e",
    strip_prefix = "assimp-4.0.1",
    urls = ["https://github.com/assimp/assimp/archive/v4.0.1.tar.gz"],
        build_file = "//:BUILD.assimp",
)
