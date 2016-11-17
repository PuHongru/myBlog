/**
 * Created by puhongru on 2016/11/17.
 */
module.exports = {
    checkNotLogin: function (req, res, next) {
        if(!req.session.user){
            req.flash('error','δ��¼');
            return res.redirect('/signin');
        }
        next();
    },
    checkLogin: function (req, res, next) {
        if(req.session.user) {
            req.flash('error','�ѵ�¼');
            return res.redirect('back'); // ����֮ǰ��ҳ��
        }
        next();
    }
};