const { override, addWebpackPlugin, addWebpackModuleRule } = require('customize-cra')
const Obf = require('webpack-obfuscator')

module.exports = override(
  addWebpackPlugin(
    new Obf({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: false,
      shuffleStringArray: true,
      simplify: true,
      splitStrings: true,
      splitStringsChunkLength: 10,
      stringArray: true,
      stringArrayEncoding: ['rc4'],
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersType: 'variable',
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    }),
  ),
  addWebpackModuleRule({
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
  }),
)
