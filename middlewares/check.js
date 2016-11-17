/**
 * Created by puhongru on 2016/11/17.
 */
module.exports = {
    checkNotLogin: function (req, res, next) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    },
    checkLogin: function (req, res, next) {
        if(req.session.user) {
            req.flash('error','已登录');
            return res.redirect('back'); // 返回之前的页面
        }
        next();
    }
};