<script>

    import  { Link, Route } from "svelte-routing";
    import Button from "../components/button.svelte";

    export let button_content;
</script>

<style>
    .image{
        height: 8vh;
        margin-top: 5vh;
        margin-left: 5vh;
    }
    .nav-structure{
        height: 20vh;
        padding: 1vh 0px 1vh 1vh;
        position: relative;
        overflow: hidden;
    }
    @media(max-width: 920px){
        .image{
            margin-left: 2vh;
        }
    }

</style>

<div class="nav-structure">
    <Link to="/">
        <img src="./icon.svg" class="image" alt="logo" />
    </Link>
    <Link to="myLinks">
        <Button {button_content}/>
    </Link>
</div>