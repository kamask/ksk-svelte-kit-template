import adapter from '@sveltejs/adapter-node';

const config = {
    kit: {
        adapter: adapter({ out: 'app' }),
        target: "body",
        trailingSlash: "never",
        appDir: 'runtime'
    }
};

export default config;