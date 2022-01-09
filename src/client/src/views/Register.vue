<template>
  <div class="container">
    <form action="#" class="login" @submit.prevent="submitHandler">
      <h3 class="login__heading">Register</h3>
      <div>
        <label for="name" class="login__label">Email</label><br />
        <input
          type="text"
          name=""
          id="name"
          class="login__input"
          placeholder="example@email.com"
          required
          v-model.lazy="email"
        />
      </div>
      <div>
        <label for="pass" class="login__label">Password</label><br />
        <input
          type="password"
          name=""
          id="pass"
          class="login__input"
          required
          v-model.lazy="password"
        />
      </div>
      <div>
        <label for="pass" class="login__label">Confirm password</label><br />
        <input
          type="password"
          name=""
          id="confirm"
          class="login__input"
          required
          v-model.lazy="confirm"
        />
      </div>
      <router-link to="/login" class="login__register"
        >Already have an account?</router-link
      >
      <button type="submit" class="login__submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      confirm: '',
    };
  },
  methods: {
    submitHandler() {
      const data = {
        username: this.email,
        password: this.password,
      };
      if (this.check) {
        this.$store
          .dispatch('register', data)
          .then(() => this.$router.push('/login'));
      }
    },
  },
  computed: {
    check() {
      return this.password === this.confirm;
    },
  },
};
</script>

<style scoped></style>
