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
    @media(max-width: 650px){
        .header{
            margin-top: 20vh;
            padding-left: 30px;
        }
        .header h1{
            font-size: 10vw;
        }
        .headTwo:before{
            width: 50vw;
            height: 3vw;
        }
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