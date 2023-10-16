<template>
    <a-button type="link" @click="onClickBtn">Открыть страницу</a-button>
</template>

<script lang=ts>
import { useRouter } from 'vue-router';

interface IButtonProps {
    src: string
}

export default {
    
    props: ['src'],

    setup(props: IButtonProps) {
        const router = useRouter();

        const onClickBtn = () => {
            router.push(`/${props.src}`)
        }
        return {onClickBtn}
    },
}
</script>