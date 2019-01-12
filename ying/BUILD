cc_binary(
	name = "main",
	srcs = ["main.cpp"],
	deps = [
		"//lib:shader",
		"//lib:camera",
		"//lib:mesh",
		"//lib:model",

		"//third_party/glad",
		"//third_party/stb_image",
		"//third_party/imgui",

		"@glm//:glm",
	],
	linkopts = ['-lglfw'],
	data = glob([
		"shaders/**",
		"data/**",
	]),
    copts = ["-Ithird_party/imgui"],
)
