var signupButton = document.getElementById('signUp');

signupButton.addEventListener('click', function() {
});

var login = new Vue({
    el: '#login',
    methods: {
        fire: function () {
            console.log('Event fired');
        }
    }
});

var loginDialog = new Vue({
    el: '#login-modal',
    data: {
        username: '',
        password: ''
    },
    methods: {
        submitLoginDetails: function () {
        }
    }
});