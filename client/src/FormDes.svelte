<style>
    .kz-form-des{
        margin-top: 15vh;
    }
    .kz-input{
        width: 68%;
        background-color: #f5f5f5;
        color: #696969;
        padding: 15px 40px 15px 40px;
        border-radius: 10px;
        border-style: none;
        overflow: hidden;
    }
    .kz-input-done{
        width: 98%;
    }
    .shrinker{
        font-size: 20px;
        color: #ffffff;
        background-color: #000000;
        padding: 11px 40px 11px 40px; 
        text-transform: uppercase;
        border-radius: 10px;
    }
    .kz-shrinked-text{
        margin-top: 30px;
        background-color: #f5f5f5;
        color: #696969;
        padding: 15px 40px 15px 40px;
        border-radius: 10px;
        border-style: none;    
    }
    .kz-alternate{
        width: 100px;
        color: #ffffff;
        background-color: #000000;
        padding: 11px 20px 11px 20px;
        text-transform: uppercase;
        border-radius: 10px;
        margin-left: 20px;
    }
    .delete{
        display: none;
    }
</style>

<script>

    let tapped = 0;
    let shrinkedText = "kzilla.xyz/DmO7u";
    let analyticsLink = "kzilla.xyz/Analytics/YmcA5s";
    let enteredLink = "someRandomLink.domainName/abcDE543534fsdfSDFK4353rnjFFDSFSKYUUYTYeUJJH";

    function buttonClicked(){
        tapped = 1;
    }

    function copyExec(){

    }
    
</script>

<div class="container text-center kz-form-des">
    <form action="" method="POST" class="{tapped === 1 ? 'delete' : ''}">
        <input type="text" placeholder="Enter your link here..." class="{tapped === 1 ? 'kz-input kz-input-done' : 'kz-input'}">
        <button type="button" class="shrinker" on:click={buttonClicked}>Shrink</button>
    </form>
    <div id="shrunkLink" class="{tapped === 1 ? 'container-fluid' : 'delete'}" style="margin-top: 30px;">
        <p class="kz-input kz-input-done">{enteredLink}</p>
        <span class="kz-shrinked-text">{shrinkedText}</span>
        <button class="kz-alternate" on:click={copyExec}>Copy</button>
        <span class="kz-shrinked-text" style="margin-left: 20px;">{analyticsLink}</span>
        <button class="kz-alternate">Link</button>
    </div>
</div>