var moment = require('moment');
moment.locale('id');

module.exports = {
    convert: function(date) {
        return moment(date)
            .format("dddd, D MMM");
    },
    year: function(date) {
        return moment(date)
            .format("dddd, D MMM YYYY");
    },
    fromNow: function(date) {
        return moment(date).fromNow();
    }
}