<template>
    <div>
        <h1>Edit Movie</h1>
        <movieForm  :movieid="id"/>
    </div>
</template>

<script>
import movieForm from '@/components/MovieForm.vue'
export default {
    name: "editMovie",
    props:['id'],
    components: {
        movieForm
    }
}
</script>