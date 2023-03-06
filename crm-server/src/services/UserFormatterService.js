

module.exports.userformatter = (user) => {
    const ruser = {
        _id: user._id ? user._id : null,
        firstname: user.firstname ? user.firstname : null,
        lastname: user.lastname ? user.lastname : null,
        email: user.email ? user.email : null,
        mobile: user.mobile ? user.mobile : null,
        gender: user.gender ? user.gender : null,
        dob: user.dob ? user.dob : null,
        country: user.country ? user.country : null,
        role: user.role ? user.role : null,
        terms_conditions: user.terms_conditions ? user.terms_conditions : false,
        photo_url: user.photo_url ? user.photo_url : null,
        email_verified: user.email_verified ? user.email_verified : false,
        mobile_verified: user.mobile_verified ? user.mobile_verified : false,
        macid: user.macid ? user.macid : null,
        ipaddress: user.ipaddress ? user.ipaddress : null,
        recentlogin: user.recentlogin ? user.recentlogin : null,
        entered_wrong_password: user.entered_wrong_password ? user.entered_wrong_password : null,

        active: user.active,
        cdate: user.cdate ? user.cdate : null,
        udate: user.udate ? user.udate : null,
    }
    return ruser
}