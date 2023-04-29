export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    verbose: true,
}

