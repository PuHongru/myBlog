/**
 * Created by puhongru on 2016/11/21.
 */
var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
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

// ���� id ���ɴ���ʱ�� created_at
mongolass.plugin('addCreatedAt',{
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:MM');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:MM');
        }
        return result;
    }
});