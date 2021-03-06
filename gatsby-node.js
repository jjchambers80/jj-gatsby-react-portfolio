import fs from 'fs-extra-promise';
import sm from 'sitemap';
import orderBy from 'lodash/orderBy';

const cssnext = require('postcss-cssnext');

exports.modifyWebpackConfig = config => {
    config.merge({
        postcss: [
            cssnext({
                browsers: ['>1%', 'last 2 versions']
            })
        ]
    });

    config.loader('svg', {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    });

    return config;
};

const getPriority = page => {
    const { path, data } = page;
    if (path === '/') {
        return 1.0;
    } else if (data && data.layout === 'project') {
        return 0.8;
    }
    return 0.6;
};

const pagesToSitemap = pages => {
    return orderBy(
        pages
            .map(p => {
                if (p.path !== undefined && p.path !== '/404.html') {
                    return {
                        url: p.path,
                        changefreq: 'daily',
                        priority: getPriority(p)
                    };
                }
                return undefined;
            })
            .filter(u => u !== undefined),
        ['priority', 'url'],
        ['desc', 'asc']
    );
};

const generateSitemap = pages => {
    const sitemap = sm.createSitemap({
        hostname: 'https://adamkrogh.com',
        cacheTime: '60000',
        urls: pagesToSitemap(pages)
    });

    console.log('Generating sitemap.xml'); // eslint-disable-line no-console
    fs.writeFileSync(`${__dirname}/public/sitemap.xml`, sitemap.toString());
};

const copyStaticFiles = () => {
    console.log('Copying static files'); // eslint-disable-line no-console
    fs.copySync(
        `${__dirname}/static/`,
        `${__dirname}/public/`,
        src => !/scss/.test(src) // don't copy scss files
    );
};

export const postBuild = (pages, callback) => {
    generateSitemap(pages);
    copyStaticFiles();
    callback();
};
