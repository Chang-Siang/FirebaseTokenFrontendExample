<template>
  <div>
    <h1>Logged in</h1>
    <div v-if="loggedIn">Yes</div>
    <div v-else>No</div>
    <button class="but" @click="signOut">Sign out</button>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "top-header",
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    }
  },
};
</script>

<style lang="scss" scoped>
div {
  color: inherit;
}
</style>