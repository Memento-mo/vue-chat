module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        '@api': './src/api',
        '@components-ui': './src/components/ui/components',
        '@components-base': './src/components/',
        '@utils': './src/utils',
        '~': './src'
      }
    }]
  ]
}
