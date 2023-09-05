<template>
  <bk-form
      ref="loginForm"
      :model="formModel"
      @enter="handleCommit(formModel)"
      :rules="formModel.rules"
  >
    <bk-form-item
        label="用户名"
        property="username"
    >
      <bk-input
          :required="true"
          class="input-box"
          type="username"
          v-model="formModel.username"
          placeholder="请输入用户名"
          clearable
      />
    </bk-form-item>


    <bk-form-item
        label="密码"
        property="password"
    >
      <bk-input
          :required="true"
          class="input-box"
          type="password"
          v-model="formModel.password"
          placeholder="请输入密码"
          clearable
      />
    </bk-form-item>
    <bk-form-item>
      <bk-button
          type="summit"
          theme="primary"
          @click="handleCommit(formModel)"
      >
        提交
      </bk-button>
    </bk-form-item>
  </bk-form>
</template>
<script setup>
import {ref} from 'vue';
import {getToken} from "@/API/login";
import {Notify} from "bkui-vue";
import router from "@/router";

const formModel = ref({
  username: "",
  password: "",
  rules: {
    username: [
      {
        validator: value => value.length > 0,
        message: '用户名不能为空',
        trigger: 'change',
      },
    ],
    password: [
      {
        validator: value => value.length > 0,
        message: '密码不能为空',
        trigger: 'change',
      },
    ],
  }
})
const loginForm = ref()

const handleCommit = (data) => {
  // console.log(loginForm.value)
  loginForm.value.validate().then(validator => {
    console.log("验证成功")
    getToken(data).then(res => {
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)

      router.push("/dnf/")
      Notify({
        title: "登录成功",
        theme: "success"
      });

      // $router.
    }).catch((err) => {
      console.log(err)
      Notify({
        title: "登录失败",
        message: "密码或者用户名错误",
        theme: "error"
      });
    })
  }, validator => {
    console.log("验证失败")
  })

}


</script>

<style scoped>
.input-box {
  width: 200px;
}
</style>