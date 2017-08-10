const redis = require('./services/redis');

module.exports = (req, res, next) => {
    if (req.cookies.session_token) {
        redis.get('sessionToken:' + req.cookies.session_token)
            .then(userName => {
                if (userName) {
                    return Promise.all([
                        redis.get('user:' + userName + ':name'),
                        redis.get('user:' + userName + ':job')
                    ]);
                }
                return [];
            })
            .then(data => {
                if (data.length) {
                    req.user = {
                        name: data[ 0 ],
                        job: data[ 1 ]
                    }
                }
                next();
            });
    } else {
        next();
    }
};
