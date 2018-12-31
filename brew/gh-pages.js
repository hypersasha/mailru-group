const ghpages = require('gh-pages');
ghpages.publish('dist', {
    message: 'Updated GitHub Pages version to 0.1'
}, (err) => {
    if (err) {
        console.log(err);
    }
});