<template>
  <div class="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
  </div>
</template>

<style>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 60px;
  background-image: url('../images/background.png');
  background-color: #2d2837;
  background-repeat: no-repeat;
  background-size: cover;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
