<style>
    .header{
        margin-top:27vh;
        padding-left: 150px;
    }
    .header h1{
        font-size: 60px;
    }
    .headTwo{
        position: relative;
    }
    .headTwo:before{
        position: absolute;
        content: '';
        bottom: 0px;
        left: 40px;
        width: 300px;
        height: 20px;
        background-color: #54a870;
        z-index: -1;
    }
</style>

<script>
    let headingOne = "A Snappy";
    let headingTwo= "URL shortener";
</script>

<div class="container-fluid header">
    <h1>{headingOne}</h1>
    <h1 class="headTwo">{headingTwo}</h1>
</div>