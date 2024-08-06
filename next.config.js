module.exports = {
   distDir: 'build',
   webpack(config, { defaultLoaders }) {
      config.module.rules.push({
         test: /\.md$/,
         use: 'raw-loader',
      })

      return config
   },
   transpilePackages: ['@mui/x-charts']
}
