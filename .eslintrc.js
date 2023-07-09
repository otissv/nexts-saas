module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom/libs'],
  settings: {
    next: {
      rootDir: ['projects/*/'],
    },
  },
}
