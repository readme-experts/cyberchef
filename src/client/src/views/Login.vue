<template>
  <div class="container">
    <form action="#" class="login" @submit.prevent="submitHandler">
      <h3 class="login__heading">Login</h3>
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
          type="text"
          name=""
          id="pass"
          class="login__input"
          required
          v-model.lazy="password"
        />
      </div>
      <router-link to="/register" class="login__register"
        >Don`t have an account?</router-link
      >
      <button type="submit" class="login__submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitHandler() {
      const data = {
        username: this.email,
        password: this.password,
      };
      this.$store
        .dispatch('login', data)
        .catch(() =>
          alert(
            'Something went wrong, did you wrote your email and password correctly?'
          )
        );
    },
  },
};
</script>

<style scoped></style>
