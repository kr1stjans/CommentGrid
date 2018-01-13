<template>
  <div id="app">
    <header id="header">
      <div class="container">

        <div id="logo" class="pull-left">
          <!--<a href="#hero"><img src="./assets/logo.png" alt="" title=""/></a>-->
          <h1><a href="/">Ime podjetja</a></h1>
        </div>

        <nav id="nav-menu-container">
          <ul class="nav-menu">
            <li class="menu-active"><a href="/">Domov</a></li>
            <li><a href="/#services">O nas</a></li>
            <li><a href="/#team">Ekipa</a></li>
            <li><a href="/#contact">Kontakt</a></li>
            <li><a href="/login">Prijavi se</a></li>
          </ul>
        </nav><!-- #nav-menu-container -->
      </div>
    </header>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
</style>
