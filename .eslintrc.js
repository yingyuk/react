var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    'rules': {
        // 允许 console warn, error
        'no-console': [
            "error", {
                allow: ["warn", "error"],
            },
        ],
        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'linebreak-style': 0, // 回车风格不报错
        "indent": ["error", 4], // 缩进4个空格
        'no-debugger': isProduction ? 2 : 0, // 生产环境不允许 debug
        // eslint 检查 import 时,没有考虑 webpack 的 alias , 所以设置在开发环境才报错
        // "import/no-extraneous-dependencies": isDevelopment ? 2 : 0,
        "import/no-extraneous-dependencies": 0, // 没有安装依赖 生产环境不报错
        "import/no-unresolved": 0, // 没有找到模块
        "import/extensions": 0, // 不需要写 拓展名
    }
}
