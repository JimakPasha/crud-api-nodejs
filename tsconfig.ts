const config = {
  compilerOptions: {
    target: "ESNext",
    module: "CommonJS",
    strict: true,
    esModuleInterop: true,
  },
  include: ["./src/**/*"],
  exclude: ["node_modules"],
};

export default config;