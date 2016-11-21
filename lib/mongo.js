/**
 * Created by puhongru on 2016/11/21.
 */
var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

// �û�ģ�����
exports.User = mongolass.model('User',{
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string',enum: ['m','f','x']},
    bio: { type: 'string' }
});
exports.User.index({ name: 1},{ unique: true }).exec();// �����û����ҵ��û����û���ȫ��Ψһ