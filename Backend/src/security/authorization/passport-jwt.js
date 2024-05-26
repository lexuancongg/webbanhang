const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const secretKey = 'ID_KJ_145';
const user = require('../../app/models/User.js');

const jwtOption = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token'), ExtractJwt.fromBodyField('token'),]),
    secretOrKey: secretKey
}
// confit cho passport sử dụng midderwear 
passport.use(new JwtStrategy(jwtOption, function (jwt_data, done) {
    user.findOne({ _id: jwt_data.idUser })
        .then(response => {
            const user = JSON.parse(JSON.stringify(response))
            if (user.role === 'admin') {
                // lỗi không có và có kết quả user : thành công và midewea tiếp theo đc thực hiện 
                return done(null, user);
            }
            // done(err, result) 
            done(new Error('bạn không đủ quyền hạn'), false)
        })
        .catch(err => {
            console.log(err)
        })
}))
const isAdmin = passport.authenticate('jwt', { session: false });

module.exports = isAdmin