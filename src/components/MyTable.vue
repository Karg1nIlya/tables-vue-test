<template>
    <div >
        <a-spin :spinning="loading" tip="Загрузка...">
            <a-table 
                :columns="columns" 
                :data-source="dataSource" 
                :pagination="totalElements/pageSize>1?{
                    total: totalElements,
                    current: currentPage,
                    pageSize: pageSize,
                    showQuickJumper: false,
                    onChange: (page) => changePage(page)
                }:false"
            >
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'gender'">
                        <img id="table-img" v-if='record.gender === "male"' src="../../public/assets/male.png" alt="img">
                        <img id="table-img" v-if='record.gender === "female"' src="../../public/assets/female.png" alt="img">
                        <p v-if='record.gender === "n/a"'>{{record.gender}}</p>
                    </template>
                    <template v-if="column.key === 'button'">
                        <my-button :src="record.button"/>
                    </template>
                </template>
            </a-table>
        </a-spin>
    </div>
</template>

<script lang=ts>
    import { ref } from 'vue';
    import { IColumns, ITableRow } from "../models/IModels"
    import MyButton from './MyButton.vue'

    interface IPeopleProps {
        columns: IColumns[],
        dataSource: ITableRow[]
        onChangePage: (page: number)=>void,
        totalElements: number,
        loading: boolean,
        pageSize: number
    }

    export default {
        components: {
            MyButton
        },
        props: ['pageSize', 'columns', 'loading', 'dataSource', 'onChangePage', 'totalElements'],

        setup(props: IPeopleProps) {
            function changePage(page: number) {
                currentPage.value = page
                props.onChangePage(page)
            }
            const currentPage = ref(1)

        return {
            changePage,
            currentPage,
        };
    },
}

</script>
<style scoped>
    #table-img {
        width: 50px;
        height: auto;
    }
</style>
