/**
 * Created by puhongru on 2016/11/24.
 */
/***********************
 * 与文章操作相关的代码
 * *********************/
var marked = require('marked');
var Post = require('../lib/mongo.js').Post;

// 将 post 的 content 从 markdown 转换为 html
Post.plugin('contentToHtml', {
    afterFind: function (posts) {
        return posts.map(function (post) {
            post.content = marked(post.content);
            return post;
        });
    },
    afterFindOne: function (post) {
        if (post) {
            post.content = marked(post.content);
        }
        return post;
    }
});

module.exports = {
    // 创建一篇文章
    create: function create (post) {
        return Post.create(post).exec();
    },
    // 通过文章 id 获取一篇文章
    getPostById: function getPostById (postId) {
        return Post
            .findOne({ _id: postId })
            .populate({ path: 'author',model: 'User'})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 按创建时间降序获取所有用户文章或某个特定用户的文章
    getPosts: function getPosts (author) {
        var query = {};
        if (author) {
            query.author = author;
        }
        return Post
            .find(query)
            .populate({path: 'author',model: 'User'})
            .sort({ _id: -1 })
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 通过文章 id 给 pv 加1
    incPv: function intPv (postId) {
        return Post
            .update({ _id: postId },{ $inc: {pv: 1} })
            .exec();
    }
};