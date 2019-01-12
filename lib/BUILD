cc_library(
	name = "camera",
	hdrs = ["camera.hpp"],
	include_prefix = "ying",
	visibility = ["//ying:__pkg__"],
	deps = [
		"//third_party/glad",

		"@glm//:glm",
	],
)

cc_library(
	name = "mesh",
	hdrs = ["mesh.hpp"],
	include_prefix = "ying",
	visibility = ["//ying:__pkg__"],
	deps = [
		":shader",

		"//third_party/glad",

		"@glm//:glm",
	],
)

cc_library(
	name = "model",
	hdrs = ["model.hpp"],
	include_prefix = "ying",
	visibility = ["//ying:__pkg__"],
	deps = [
		":shader",
		":mesh",

		"//third_party/stb_image",
	],
	linkopts = ['-lassimp'],
)

cc_library(
	name = "shader",
	hdrs = ["shader.hpp"],
	include_prefix = "ying",
	visibility = ["//ying:__pkg__"],
	deps = [
		"//third_party/glad",

		"@glm//:glm",
	],
)
