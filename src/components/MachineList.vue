<template>
  <section>
    <bk-table
        :data="tableData"
    >
      <template
          v-for="column in columns"
          :key="column.label"
      >
        <bk-table-column
            :label="column.label"
            :type="column.type"
            :field="column.field"
        />
      </template>
    </bk-table>
  </section>
</template>

<script setup>
import {ref} from "vue";

const tableData = ref([
  {
    "ip": "1.1.1.1",
    "source": "机房",
    "create_time": "2023-09-02"
  }
])
const columns = ref([
  {
    label: 'IP',
    field: 'ip',
  },
  {
    label: '所属机构',
    field: 'source',
  },
  {
    label: '创建时间',
    field: 'create_time',
  },
])
</script>
