requireAll(require.context('./', true, /^\.\/[^\/]+?\/index\.js$/));

function requireAll(r) {
    r.keys().forEach(r);
}