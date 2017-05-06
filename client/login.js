var app = new Vue({
  el: '#login',
  data: {
    title: 'Login Page',
    username: '',
    password: ''
  },
  methods: {
    onLogin() {
      let self = this;
      axios.post('http://localhost:3000/signin', {
        username: self.username,
        password: self.password
      })
      .then(response => {
        console.log(response);
      })
    }
  }
})