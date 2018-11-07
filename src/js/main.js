var signupButton = document.getElementById('signUp');

signupButton.addEventListener('click', function() {
});

Vue.component('tenant-form', {
    template: ``
})

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