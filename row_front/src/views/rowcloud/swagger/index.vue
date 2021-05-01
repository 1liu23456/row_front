<template>
    <div>
        <div>
            <a href="http://localhost:9000/swagger-ui.html" target="mainIframe">Swagger</a>
            <a href="http://localhost:9000/druid/index.html" target="mainIframe">SQL</a>
        </div>
        <iframe src="http://localhost:9000/swagger-ui.html" width="1171" height="525" name="mainIframe"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API
        }
    },

    methods: {
        
    }
    
}
</script>

<style lang="scss" scoped>
a {
  display: inline-block;
  margin: 30px 30px;
  background-color: blanchedalmond;
}
</style>