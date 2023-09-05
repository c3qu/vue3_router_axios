<template>
  <div class="navigation-demo">
    <bk-navigation
        class="navigation"
        :default-open="collapse"
        :navigation-type="navigationType"
        side-title="服务器检查与安装组件"
        @toggle="handleCollapse"
    >
      <template #menu>
        <bk-menu
            :collapse="collapse"
        >
          <bk-submenu v-for="category in navData" :title="category.categoryName" :key="category.categoryName">
            <template #icon>
              <component :is="icons[0]"></component>
            </template>
            <router-link class="link" v-for="item in category.items" :key="item.name" :to="'/dnf'+item.path">
              <bk-menu-item>
                {{ item.name }}
              </bk-menu-item>
            </router-link>
          </bk-submenu>
        </bk-menu>

      </template>
      <template #side-icon>
        <doc-fill/>
      </template>
      <template #header>
        <bk-input></bk-input>
      </template>
      <div class="content">
        <!--        <HostList/>-->
        <!--        <IconDocumentation/>-->
        <!--        <ItsmHost/>-->
        <!--        <MachineList/>-->
        <!--        <SoftwareList/>-->
        <!--        <CheckItem/>-->
        <!--                <component is="comp"/>-->
<!--        <component :is="compList.cc"/>-->
      <RouterView/>
      </div>
    </bk-navigation>
  </div>
</template>

<script setup>
import {DocFill, EnlargeLine} from 'bkui-vue/lib/icon';
import {computed, createElementBlock, ref} from 'vue';
import {dnfStore} from "@/store/pinia-store";
import {useRoute} from "vue-router";
const collapse = ref(true);
const navigationType = ref('left-right');
const handleCollapse = (v) => {
  collapse.value = !v;
};
const icons = ref([
      EnlargeLine
    ]
)

const navData = computed(() => {
  const d = {}
  dnfStore().route.forEach(item => {
    if (item.category in d) {
      d[item.category].push({name: item.name, path: item.path})
    } else {
      d[item.category] = [{name: item.name, path: item.path}]
    }
  })
  let result = []
  for (const key in d) {
    result.push({
      categoryName: key,
      items: d[key]
    })
  }
  return result
})

</script>

<style scoped>
.link {
  text-decoration: none;
}

.navigation {
  background-color: rebeccapurple;
}
</style>

