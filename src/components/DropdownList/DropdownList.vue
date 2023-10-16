<template>
    <div class="dropdown-list">
        <div class="dropdown-list__title">Сортировать по: </div>
        <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
                {{dropdownListContent.find((el)=>el.active).name}}
            <DownOutlined />
            </a>
            <template #overlay>
            <a-menu>
                <template v-for="el in dropdownListContent">
                    <a-menu-item v-if="!el.active" :key="el.id" @click="selectDDListContent(el.id)">
                        {{el.name}}
                    </a-menu-item>
                </template>
            </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script lang=ts>
import { IDropdownListContent } from '../../models/IModels'

interface IDropdownListProps {
    dropdownListContent: IDropdownListContent,
    onSelect: (id: number)=>void
}

export default {
    props: ['dropdownListContent', 'onSelect'],
    setup(props: IDropdownListProps) {
        function selectDDListContent(id: number) {
            props.onSelect(id)
        }
        return { selectDDListContent }
    }
}
</script>

<style scoped>
    .dropdown-list {
        display: flex;
        margin: 0 50px;
    }
    .ant-dropdown-link {
        margin-left: 7px;
        cursor: pointer;
        color: rgb(122, 158, 243);
        transition: all 0.2s ease-in-out;
    }
    .ant-dropdown-link:hover {
        text-decoration: underline;
        color: rgb(139, 172, 250);
    }
</style>
