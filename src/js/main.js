const DB_URL = 'http://localhost:3000/'

Vue.component('tenant-form', {
    template: `        
    <div class="signup-form">
        <h1>Great! Let's get you on your way to a fairer tenancy.</h1>
    
        <h3>Your details</h3>
        <label for="first-name">First name</label>
        <input v-model="firstname" type="text" name="first-name">

        <label for="surname">Surname</label>
        <input v-model="surname" type="text" name="surname">

        <label for="email">Email address</label>
        <input v-model="email" type="text" name="email">

        <label for="password">Password</label>
        <input v-model="password" type="password" name="password">

        <label for="password">Confirm password</label>
        <input v-model="checkPassword" type="password" placeholder="">

        <button v-on:click="registerNewTenant" type="submit" class="signup-button">Sign me up!</button>

    </div>`,
    data: function() {
        return {
            firstname    : '',
            surname      : '',
            email        : '',
            password     : '',
            checkPassword: '',
        }
    },
    methods: {
        registerNewTenant: function() {
            fetch('http://localhost:4000/users', {
                method: "POST", 
                body: { 
                    firstname: this.firstname,
                    surname  : this.surname,
                    email    : this.email,
                    password : this.password
                }
            })
        }
        /** @TODO: implement validation for password strength */
    }
})

Vue.component('landlord-form', {
    template: `
    <div class="signup-form">
        <h1>Looking to safeguard your property? You're in the right place. </h1>

        <h3>Your details</h3>
        <label for="first-name">First name</label>
        <input v-model="firstname" type="text" name="first-name">

        <label for="surname">Surname</label>
        <input v-model="surname" type="text" name="surname">

        <label for="email">Email address</label>
        <input v-model="email" type="text" name="email">

        <label for="password">Password</label>
        <input v-model="password" type="password" name="password">

        <label for="password">Confirm password</label>
        <input v-model="checkPassword" type="password" placeholder="">

        <label for="address">Your address</label>
        <input v-model="address" placeholder="Begin typing an address...">

        <label for=""rentAmount>How much rent do you charge on your property?</label>
        <input type="range" v-model="rentAmount" min="800" max="6000" step="100"><span> £{{ rentAmount }} per calendar month</span>

        <button v-on:click="registerNewLandlord" type="submit" class="signup-button">Sign me up!</button>
    </div>`,
    data: function() {
        return {
            firstname    : '',
            surname      : '',
            email        : '',
            password     : '',
            checkPassword: '',
            address      : '',
            rentAmount   : 0
        }
    },
    methods: {
        registerNewLandlord: function() {
            fetch('http://localhost:4000/users', {
                method: "POST", 
                body: { 
                    firstname : this.firstname,
                    surname   : this.surname,
                    email     : this.email,
                    password  : this.password,
                    address   : this.address,
                    rentAmount: this.rentAmount
                }
            })
        }
    }
})

Vue.component('login-modal', {
    template: `
    <transition name="modal">
    <div id="login-modal" class="modal-area">
        <div class="modal-box">
            <input type="text" v-model="username" placeholder="Username or Email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit" class="signup-button">Log in</button>
        </div>
    </div>
    </transition>
    `,
    data: function() {
        return {
            username  : '',
            password  : '',
            statusText: ''
        }
    },
    methods: {
        submitLoginDetails: function() {
            fetch(`${DB_URL}/users`)
                .then(function(users){
                    users.forEach(user => {
                        if (user.username == this.username && user.password == this.password) {
                            this.statusText = 'Success! You have logged in.';
                            /** Redirect to secured homepage once logged in. */
                        }
                    });
                });
        }
    }
})

new Vue({
    el: '#login-app',
    data: {
        currentType: 'tenant',
        types: ['tenant', 'landlord']
    },
    computed: {
        currentSignUpType: function() {
            return this.currentType + '-form';
        }
    },
    methods: {
        openLoginModal: function(e) {
            e.preventDefault();
            
        }
    }
})