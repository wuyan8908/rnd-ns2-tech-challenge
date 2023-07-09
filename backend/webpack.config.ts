import webpack from "webpack";
import path from "path";
import nodeExternals from "webpack-node-externals";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

type WebpackConfig = {
    entry: string[];
    watch?: boolean;
    externals?: any[];
    target: string;
    module: object;
    mode: "development" | "production";
    resolve: object;
    plugins?: any[];
    output: object;
    stats: any;
    optimization: any;
};

let config: WebpackConfig = {
    entry: ["./src/index.ts"],
    target: "node",
    externals: [
        nodeExternals({
            allowlist: ["webpack/hot/poll?100"],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.webpack.json",
                        },
                    },
                ],
            },
        ],
    },
    mode: "production",
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
    },
    stats: {
        warnings: false,
    },
    optimization: {
        minimize: false,
    },
};

module.exports = (env: any, argv: any) => {
    if (argv.mode === "development") {
        config = {
            ...config,
            entry: ["webpack/hot/poll?100", "./index.ts"],
            watch: true,
            mode: "development",
            plugins: [new webpack.HotModuleReplacementPlugin()],
        };
    }

    return config;
};
