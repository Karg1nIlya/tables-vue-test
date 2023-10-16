<template>
  <div class="wrapper">
    <div class="actions">
      <back-btn-vue/>
      <dropdown-list :dropdownListContent="ddListContent" :onSelect="selectDropdownListContent"/>
    </div>
    <my-table :pageSize="pageSize" :columns="columns" :totalElements="totalElements" :loading="loading" :dataSource="dataSource" :onChangePage="changePage"/>
  </div>
</template>

<script lang=ts>
import { onMounted, ref } from 'vue';
import BackBtnVue from '../components/BackBtn.vue';
import { getAnswer } from '../helpers/APIHelper'
import MyTable from '../components/MyTable.vue';
import { IDropdownListContent, IPlanets, ITableAnswer } from '../models/IModels';
import moment from 'moment';
import { dropdownListContent } from "../components/DropdownList/dropdownListData";
import DropdownList from "../components/DropdownList/DropdownList.vue";
import sortedPlanets from "../helpers/sortedPlanets"

export default {
  components: {
    MyTable, BackBtnVue, dropdownListContent, DropdownList, sortedPlanets
  },

  data() {
    const columns = [
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
            title: 'Период вращения',
            dataIndex: 'rotation_period',
            key: 'rotation_period',
        },
        {
            title: 'Орбитальный период',
            dataIndex: 'orbital_period',
            key: 'orbital_period',
        },
        {
            title: 'Диаметр',
            dataIndex: 'diameter',
            key: 'diameter',
        },
        {
            title: 'Климат',
            dataIndex: 'climate',
            key: 'climate',
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
    const dataSource = ref<IPlanets[]>([])
    const totalElements = ref(0)

    async function formationDataSource(data: ITableAnswer) { 
      dataSource.value.length = 0
      for(let el of data.results) {
        rowCounter.value++
        const objTmp: IPlanets = {
          number: rowCounter.value,
          name: el.name,
          rotation_period: el.rotation_period,
          orbital_period: el.orbital_period,
          diameter: el.diameter,
          climate: el.climate,
          created: moment(el.created).format("DD.MM.YYYY"),
          edited: moment(el.edited).format("DD.MM.YYYY")
        };
        dataSource.value.push(objTmp);
      }
        dataSource.value = sortedPlanets(dataSource.value, ddListContent.value.filter(el=>el.active)[0].id)
      
    }

    function changeStartNumber(page: number) {
      rowCounter.value = (page-1)*pageSize
    }

    function changePage(page: number) {
      changeStartNumber(page)
      loading.value = true
      const res = getAnswer('planets/?page='+page)
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
      console.log(dropdownListContent.find(el=>el.active))
      loading.value = true
      const res = getAnswer('planets')
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

    function selectDropdownListContent(id: number) {
      ddListContent.value = ddListContent.value.map(el=>{
        if(el.id===id) {
          el.active = true
        } else {
          el.active = false
        }
        return el
      })
      dataSource.value = sortedPlanets(dataSource.value, id)
    }

    const ddListContent = ref<IDropdownListContent[]>(dropdownListContent) 

    return {
      loading, ddListContent, dataSource, totalElements, changePage, pageSize, selectDropdownListContent
    }
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  align-items: center;
}
</style>