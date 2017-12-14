<template>
  <section id="loginBackground" class="bg-lightOrange">
    <div class="login-form padding20 block-shadow" style="opacity: 1; transform: scale(1); transition: all 0.5s ease 0s;">
        <form>
            <h1 class="text-light">Login to service</h1>
            <hr class="thin bg-lightRed">
            <br>
            <div class="input-control text full-size" data-role="input">
                <label for="user_login">User email:</label>
                <input name="user_login" id="user_login" style="padding-right: 39px;" type="text">
                <button class="button helper-button clear" tabindex="-1" type="button"><span class="mif-cross"></span></button>
            </div>
            <br>
            <br>
            <div class="input-control password full-size" data-role="input">
                <label for="user_password">User password:</label>
                <input name="user_password" id="user_password" style="padding-right: 39px;" type="password">
                <button class="button helper-button reveal" tabindex="-1" type="button"><span class="mif-looks"></span></button>
            </div>
            <br>
            <br>
            <div class="form-actions">
                <button type="submit" class="button primary">Login to...</button>
                <button @click="$router.go(-1)" type="button" class="button link">Cancel</button>
            </div>
        </form>
    </div>
</section>
</template>

<script>
export default {
  name: 'login-form'
}
</script>
<style >
#loginBackground{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
