<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

body {
  background: #f8f8fb;
  padding-top: 60px;
}

body input {
  border-width: 1px;
  border-radius: 5px;
  border-color: #808080;
  border-style: solid;
  padding: 5px;
}

body input:focus, body input:active, body input:focus-visible {
  outline: none;
}
</style>
