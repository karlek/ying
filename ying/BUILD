cc_library(
	name = "camera",
	hdrs = ["camera.hpp"],
	include_prefix = "kol",
	visibility = ["//main:__pkg__"],
	deps = [
		"//third_party/glad",

		"@glm//:glm",
	],
)

cc_library(
	name = "mesh",
	hdrs = ["mesh.hpp"],
	include_prefix = "kol",
	visibility = ["//main:__pkg__"],
	deps = [
		":shader",

		"//third_party/glad",

		"@glm//:glm",
	],
)

cc_library(
	name = "model",
	hdrs = ["model.hpp"],
	include_prefix = "kol",
	visibility = ["//main:__pkg__"],
	deps = [
		":shader",
		":mesh",

		"//third_party/stb_image",
	],
)

cc_library(
	name = "shader",
	hdrs = ["shader.hpp"],
	include_prefix = "kol",
	visibility = ["//main:__pkg__"],
	deps = [
		"//third_party/glad",

		"@glm//:glm",
	],
)

cc_binary(
	name = "main",
	srcs = ["main.cpp"],
	deps = [
		":shader",
		":camera",
		":mesh",
		":model",

		"//third_party/glad",
		"//third_party/stb_image",

		"@glm//:glm",
	],
	linkopts = ['-lassimp', '-lglfw'],
	data = glob([
		"shaders/**",
		"data/**",
	]),
)
