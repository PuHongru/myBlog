/**
 * Created by puhongru on 2016/11/21.
 */
var User = require('../lib/mongo.js').User;

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    }
};