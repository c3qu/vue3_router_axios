<template>
  <bk-form :model="softwareInfo" form-type="inline" ref="formRef">
    <div v-for="(software,key) in softwareInfo" :key="key">

      <bk-form-item>
        <bk-checkbox v-model="software.checked">{{ key }}</bk-checkbox>
      </bk-form-item>
      <bk-form-item label="版本" :property="`${key}.version`" :rules="rules.notBlank">
        <bk-select v-model="software.version">
          <bk-option v-for="version in software.versionList"
                     :key="version"
                     :value="version"
                     :label="version"
          >
          </bk-option>
        </bk-select>
      </bk-form-item>

      <bk-form-item label="安装路径" :property="`${key}.installPath`" :rules="[{
        validator: function (val) {
          if(software.checked){
            return Boolean(trim(val))
          }
      },
      message: '必填',
      trigger: 'blur'
        }]">
        <bk-input v-model="software.installPath"></bk-input>
      </bk-form-item>
    </div>
    <bk-button type="summit" @click="submit">提交</bk-button>
  </bk-form>
</template>
<script setup>
import {ref} from 'vue';

const trim = (string = '') => {

  return string.replace(/^[\s\uFEFF]+| [\s\uFEFF]+$/g, '');

}
const formRef = ref();
const submit = () => {
  formRef.value.validate();
};
const rules = {
  notBlank: [
    {
      validator: function (val) {
        return Boolean(trim(val))
      },
      message: "必填",
      trigger: 'blur'
    }
  ]
}
const softwareInfo = {
  apache: {
    versionList: ["1.1", "1.2", "1.3"],
  },
  tomcat: {
    versionList: ["1.1", "1.2", "1.3"],
  },
  aop: {
    versionList: ["1.1", "1.2", "1.3"],
  },
};
const area = ref([]);
const cascader = ref([])
console.log(cascader.value)

</script>
