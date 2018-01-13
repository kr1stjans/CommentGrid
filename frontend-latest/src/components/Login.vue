<template>
  <main id="main">
    <section id="hero">
      <div class="hero-container contact">
        <div class="container">
          <div class="row about-container">

            <div class="col-lg-6 col-md-6">
              <h2 class="title">Registracija</h2>
              <div class="form">
                <form action="" method="post" role="form" class="contactForm wow fadeInUp">
                  <div class="form-group">
                    <input type="email" class="form-control" name="email" id="registerEmail" placeholder="Elektronski naslov"
                           data-rule="email" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" name="password" id="registerPassword" placeholder="Geslo"
                           data-rule="password" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" name="password" id="registerPasswordRepeat" placeholder="Potrdi geslo"
                           data-rule="password" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="text-center">
                    <button type="submit">Registriraj se</button>
                  </div>
                </form>
              </div>
            </div>

            <div class="col-lg-6 col-md-6">
              <h2 class="title">Prijava</h2>
              <div class="form">
                <form action="" method="post" role="form" class="contactForm wow fadeInUp">
                  <div class="form-group">
                    <input type="email" class="form-control" name="email" id="loginEmail" placeholder="Elektronski naslov"
                           data-rule="email" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control" name="password" id="password" placeholder="Geslo"
                           data-rule="password" data-msg="Please enter a valid email"/>
                    <div class="validation"></div>
                  </div>
                  <div class="text-center">
                    <button type="submit">Prijavi se</button>
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  </main>

</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
