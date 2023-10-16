<template>
  <div class="wrapper">
    <back-btn-vue/>
    <my-table :pageSize="pageSize" :columns="columns" :totalElements="totalElements" :loading="loading" :dataSource="dataSource" :onChangePage="changePage"/>
  </div>
</template>

<script lang=ts>
import { onMounted, ref } from 'vue';
import BackBtnVue from '../components/BackBtn.vue';
import { getAnswer } from '../helpers/APIHelper';
import MyTable from '../components/MyTable.vue';
import { IColumns, ITableAnswer, IVehicles } from '../models/IModels';
import moment from 'moment';

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
            title: 'Модель',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Производитель',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        },
        {
            title: 'Стоимость перенаправления',
            dataIndex: 'cost_in_credits',
            key: 'cost_in_credits',
        },
        {
            title: 'Класс автомобиля',
            dataIndex: 'vehicle_class',
            key: 'vehicle_class',
        },
        {
            title: 'Добавление данных',
            dataIndex: 'created',
            key: 'created',
        },{
            title: 'Последнее изменение',
            dataIndex: 'edited',
            key: 'edited',
        },
      ]
    return {
      columns
    }
  },

  setup() {
    const dataAnswer = ref<ITableAnswer>({
      count: 0,
      next: null,
      previous: null,
      results: []
    })
    const pageSize = 10
    const loading = ref(false)
    const rowCounter = ref(0)
    const dataSource = ref<IVehicles[]>([])
    const totalElements = ref(0)

    async function formationDataSource(data: ITableAnswer) { 
      dataSource.value.length = 0
      for(let el of data.results) {
        rowCounter.value++
        const objTmp: IVehicles = {
          number: rowCounter.value,
          name: el.name,
          model: el.model,
          manufacturer: el.manufacturer,
          cost_in_credits: el.cost_in_credits,
          vehicle_class: el.vehicle_class,
          created: moment(el.created).format("DD.MM.YYYY"),
          edited: moment(el.edited).format("DD.MM.YYYY")
        };
        dataSource.value.push(objTmp);
      }
    }

    function changeStartNumber(page: number) {
      rowCounter.value = (page-1)*pageSize
    }

    function changePage(page: number) {
      changeStartNumber(page)
      loading.value = true
      const res = getAnswer('vehicles/?page='+page)
      res.then(e => {
        if(e) {
          dataAnswer.value = e.data
          totalElements.value = dataAnswer.value.count
          formationDataSource(dataAnswer.value)
          loading.value = false
        }
      })
      res.catch(e => {
        console.log(e)
      }) 
    }

    onMounted(() => {
      loading.value = true
      const res = getAnswer('vehicles')
      res.then(e => {
        if(e) {
          dataAnswer.value = e.data
          totalElements.value = dataAnswer.value.count
          console.log(totalElements.value)
          formationDataSource(dataAnswer.value)
          loading.value = false
        }
      })
      res.catch(e => {
          console.log(e)
      }) 
    })
    return {
      loading, dataSource, totalElements, changePage, pageSize
    }
  }, 
};

</script>

<style scoped>

</style>