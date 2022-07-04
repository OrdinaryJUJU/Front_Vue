module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
	transpileDependencies: [],
	//blog.csdn.net/qq_45594237/article/details/115302876
	// pluginOptions: {
	//     "style-resources-loader": {
	//       preProcessor: "less",
	// 	  path.join(__dirname,'./src/theme/components.less')
	//     }
	//   }

    devServer: {
		port:8080,
		host:'192.168.31.18',
    //     proxy: {
    //         '/api':{
    //             target:'http://localhost:8081',
				// ws:true,
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    }
}