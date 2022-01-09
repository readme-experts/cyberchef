<template>
  <div class="container">
    <form action="#" class="login">
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
        />
      </div>
      <div>
        <label for="pass" class="login__label">Password</label><br />
        <input type="text" name="" id="pass" class="login__input" required />
      </div>
      <a href="#" class="login__register">Don`t have an account?</a>
      <button type="submit" class="login__submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped></style>
