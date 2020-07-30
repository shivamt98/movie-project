<template>
    <div>
        <h1>ADD Movie</h1>
        <movieForm />

    </div>
</template>

<script>

import movieForm from '@/components/MovieForm.vue'
export default {
    name: "addMovie",
    components: {
        movieForm,
    }
}
</script>