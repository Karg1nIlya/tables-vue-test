<template>
  <div class="wrapper">
    <back-btn-vue/>
    <my-table :pageSize="pageSize" :columns="columns" :totalElements="totalElements" :loading="loading" :dataSource="dataSource" :onChangePage="changePage"/>
  </div>
</template>

<script lang=ts>
import { onMounted, ref } from 'vue';
import BackBtnVue from '../components/BackBtn.vue';
import { getAnswer } from '../helpers/APIHelper'
import MyTable from '../components/MyTable.vue';
import { IColumns, IPeople, ITableAnswer } from '../models/IModels';
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
            title: 'Рост',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Масса',
            dataIndex: 'mass',
            key: 'mass',
        },
        {
            title: 'Год рождения',
            dataIndex: 'birth_year',
            key: 'birth_year',
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
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
    const peopleAnswer = ref<ITableAnswer>({
      count: 0,
      next: null,
      previous: null,
      results: []
    })
    const pageSize = 10
    const loading = ref(false)
    const rowCounter = ref(0)
    const dataSource = ref<IPeople[]>([])
    const totalElements = ref(0)

    async function formationDataSource(data: ITableAnswer) { 
      dataSource.value.length = 0
      for(let el of data.results) {
        rowCounter.value++
        const objTmp: IPeople = {
          number: rowCounter.value,
          name: el.name,
          height: el.height,
          mass: el.mass,
          birth_year: el.birth_year,
          gender: el.gender,
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
      const res = getAnswer('people/?page='+page)
      res.then(e => {
        if(e) {
          peopleAnswer.value = e.data
          totalElements.value = peopleAnswer.value.count
          formationDataSource(peopleAnswer.value)
          loading.value = false
        }
      })
      res.catch(e => {
        console.log(e)
      }) 
    }

    onMounted(() => {
      loading.value = true
      const res = getAnswer('people')
      res.then(e => {
        if(e) {
          peopleAnswer.value = e.data
          totalElements.value = peopleAnswer.value.count
          console.log(totalElements.value)
          formationDataSource(peopleAnswer.value)
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