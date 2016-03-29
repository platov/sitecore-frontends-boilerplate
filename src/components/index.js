function requireAll(r) {
    return r.keys().map(r).map((m)=> m.default || m);
}

module.exports = requireAll(require.context('./', true, /^\.\/[^/]+?\/index\.js$/));