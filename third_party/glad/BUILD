licenses(["notice"])

cc_library(
    name = "khrplatform",
    hdrs = ["khrplatform.h"],
    include_prefix = "KHR",
    visibility = ["//visibility:public"],
)

cc_library(
    name = "glad",
    srcs = ["glad.c",  "glad_glx.c"],
    hdrs = ["glad.h",  "glad_glx.h"],
    include_prefix = "glad",
    visibility = ["//visibility:public"],
	deps = [":khrplatform"],
	linkopts = ['-ldl'],
)
