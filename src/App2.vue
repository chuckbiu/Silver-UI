<template>
    <div>
        <Button>button</Button>
    </div>
    <div>
        <VNode msg="button"> </VNode>
    </div>
</template>
<script setup lang="ts">
    import Button from './components/Button/Button.vue';
    import VNode from './VNode.tsx'
    defineExpose({
        name: 'button'
    })
</script>