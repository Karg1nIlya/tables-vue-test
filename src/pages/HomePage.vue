<template>
  <my-table :pageSize="pageSize" :columns="columns" :totalElements="totalElements" :loading="loading" :dataSource="dataSource" :onChangePage="null"/>
</template>

<script lang=ts>
import { onMounted, ref } from 'vue';
import BackBtnVue from '../components/BackBtn.vue';
import { getAnswer } from '../helpers/APIHelper'
import MyTable from '../components/MyTable.vue';
import { IColumns, ITableHome } from '../models/IModels';

export default {
  components: {
    MyTable, BackBtnVue
  },

  data() {
    const columns: IColumns[] = [
      {
          title: 'Номер',
          dataIndex: 'number',
          key: 'number',
      },
      {
          title: 'Название',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: 'АПИ',
          dataIndex: 'api',
          key: 'api',
      },
      {
          title: '',
          dataIndex: 'button',
          key: 'button',
      }
    ]
    return {
      columns
    }
  },

  setup() {
    const pageSize = 10
    const loading = ref(false)
    const rowCounter = ref(0)
    const dataSource = ref<ITableHome[]>([])
    const totalElements = ref(0)

    onMounted(() => {
      loading.value = true
      const res = getAnswer('')
      res.then(e => {
        if(e) {
          let i = 1;
          for(let el in e.data) {
            const objTmp: ITableHome = {
              number: i,
              name: el,
              api: e.data[el] as string,
              button: el
            };
            console.log(objTmp)
            dataSource.value.push(objTmp);
            i++;
          }
          rowCounter.value = i
          loading.value = false
        }
      })
      res.catch(e => {
        console.log(e)
      }) 
    })
    return {
      loading, dataSource, pageSize, totalElements
    }
  },
};
</script>
