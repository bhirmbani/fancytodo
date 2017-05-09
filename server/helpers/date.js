var moment = require('moment');
moment.locale('id');

module.exports = {
    hour: function(date) {
        return moment(date)
            .format("HH:mm:ss");
    },
    year: function(date) {
        return moment(date)
            .format("dddd, D MMM YYYY");
    },
    fromNow: function(date) {
        return moment(date).fromNow();
    }
}