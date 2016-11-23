/**
 * Created by puhongru on 2016/11/21.
 */
var User = require('../lib/mongo.js').User;

module.exports = {
    // 注册一个用户
    create: function create(user) {
        return User.create(user).exec();
    },
    // 通过用户名获取用户信息
    getUserByName: function getUserByName (name) {
        return User
            .findOne( {name: name} )
            .addCreatedAt()   // 使用 addCreatedAt 自定义插件（通过 _id 生成时间戳）
            .exec();
    }
};