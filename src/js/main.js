const DB_URL = 'http://localhost:3000/'

Vue.component('tenant-form', {
    template: `        
    <div class="signup-form">
        <h1>Great! Let's get you started.</h1>
    
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
            firstname: '',
            surname: '',
            email: '',
            password: '',
            checkPassword: '',
        }
    },
    methods: {
        registerNewTenant: function() {
            fetch('http://localhost:4000/users', {
                method: "POST", 
                body: { 
                    firstname: this.firstname,
                    surname: this.surname,
                    email: this.email,
                    password: this.password
                }
            })
        }
        /** @TODO: implement validation */
    }
})

new Vue({
    el: '#register-app'
})