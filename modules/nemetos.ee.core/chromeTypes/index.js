requireAll(require.context('./', false, /\.js$/));

function requireAll(r) {
    r.keys().forEach(r);
}