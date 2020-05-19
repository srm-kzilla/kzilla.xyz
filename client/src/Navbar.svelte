<style>
    .image{
        position: absolute;
        height: 100px;
        left: 30px;
        top: 20px;
    }
    .linker{
        position: absolute;
        right: 30px;
        top: 40px;
        font-size: 20px;
        color: #ffffff;
        background-color: #000000;
        padding: 15px 40px 15px 40px; 
        text-transform: uppercase;
        border-radius: 10px;
    }
    .linker:hover{
        text-decoration: none;
    }
</style>

<script>
    let linker="#";
</script>

<div class="container-fluid">
    <img src="./icon.svg" class="image" alt="logo">
    <a href="{linker}" class="linker">My Links</a>
</div>