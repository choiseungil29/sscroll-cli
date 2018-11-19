<template>
  <div class="container">
    <h3>회원가입</h3>
    <div class="input-group">
      <input id="nickname" type="text" class="form-control" placeholder="닉네임" v-model="nickname">
    </div>
    <button class="btn btn-primary" type="button" v-on:click="submit">가입</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',

  data() {
    return {
      nickname: ''
    }
  },

  methods: {

    submit(event) {
      axios.post('/api/signup', { nickname: this.nickname })
        .then((res) => {
          console.log(res)
          alert(`${nickname}님 환영합니다.`)
          this.$router.push({ path: '/' })
        }).catch((err) => {
          console.log('err')
          alert('이미 사용중인 닉네임입니다.')
          console.log(err)
        })

    }

  }

}
</script>

<style lang="scss" scoped>

div.container {
  padding-top: 2rem;
}

div.input-group {
  width: 100%;
  max-width: 1080px;
}
</style>
