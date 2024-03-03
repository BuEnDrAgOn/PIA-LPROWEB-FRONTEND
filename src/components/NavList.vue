<template>
    <li>
        <RouterLink :to="link"> {{ page }} </RouterLink>
    </li>
</template>

<script>
export default {
    props:{
        link: {
            type: String,
            required: true
        },
        page: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
a{
    padding: 2rem;
}
</style>