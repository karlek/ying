licenses(["notice"])

cc_library(
    name = "imgui",
    srcs = glob(["*.cpp"]),
    hdrs = glob(["*.h"]),
    # include_prefix = "imgui",
    visibility = ["//visibility:public"],
	defines = ["IMGUI_IMPL_OPENGL_LOADER_GLAD"],
	deps = [
		"//third_party/glad",
	]
)
