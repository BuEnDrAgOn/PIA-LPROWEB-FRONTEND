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
    padding: 2rem 0;
}

/* Inside a dropdown list */
ul.dropdown li{
  width: 15vw;

}

ul.dropdown li:first-of-type{
    border: 0px;
    border-bottom: 1px solid #d8d8d8;
}

ul.dropdown li:last-of-type{
    border: 0px;
}

ul.dropdown li:first-of-type a{
  border-radius: 0 1rem 0 0;
}

ul.dropdown li:last-of-type a{
  border-radius: 0 0 1rem 0 ;
}

</style>