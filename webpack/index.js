var args = process.argv,
    envs = ['production', 'development'],
    actions = ['compiler', 'server'],
    action, env;

env = args.find(item => envs.indexOf(item) > -1);
action = args.find(item => actions.indexOf(item) > -1);


if (env) {
    process.env.NODE_ENV = env;
}

if (action) {
    require(`./${action}.js`);
}
