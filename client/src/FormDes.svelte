<style>
    .kz-form-des{
        margin-top: 15vh;
        padding-left: 0px;
    }
    .kz-input{
        width: 68%;
        background-color: #f5f5f5;
        color: #696969;
        padding: 15px 40px 15px 40px;
        border-radius: 10px;
        border-style: none;
        overflow-x: auto;
    }
    .kz-input-done{
        width: 98%;
    }
    .shrinker{
        font-size: 20px;
        color: #ffffff;
        background-color: #000000;
        padding: 15px 40px 15px 40px; 
        text-transform: uppercase;
        border-radius: 10px;
    }
    .kz-shrinked-text{
        margin-top: 20px;
        margin-left: 0px;
        background-color: #f5f5f5;
        color: #696969;
        padding: 15px 40px 15px 40px;
        border-radius: 10px;
        border-style: none;  
        overflow: hidden;
    }
    .kz-alternate{
        min-width: 100px;
        color: #ffffff;
        background-color: #000000;
        padding: 11px 20px 11px 20px;
        text-transform: uppercase;
        border-radius: 10px;
        margin-top: 20px;
    }
    .delete{
        display: none;
    }
    @media(max-width: 1100px){
        .kz-form-des{
            margin-bottom: 100px;
        }
    }
    @media(max-width: 550px){
        .kz-input{
            padding: 8px 20px 8px 20px;
            border-radius: 7px;
        }
        .shrinker{
            padding: 8px 10px 8px 10px;
            border-radius: 7px;
            font-size: 18px;
        }
        .kz-shrinked-text{
            overflow-x: auto;
            padding: 8px 20px 8px 20px;
        }
        .kz-alternate{
            padding: 5px 5px 5px 5px;
            width: 50px !important;
            font-size: 15px;
        }
        .kz-form-des{
            margin-bottom: 50px;
        }
    }
    @media(max-height: 640px){
        .kz-form-des{
            margin-top: 15vh;
        }
    }
</style>

<script>

    let tapped = false;
    let shrinkedText = "kzilla.xyz/DmO7u";
    let analyticsLink = "kzilla.xyz/Analytics/YmcA5s";
    let enteredLink = "someRandomLink.domainName/abcDE543534fsdfSDFK4353rnjFFDSFSKYUUYTYeUJJH";

    function buttonClicked(){
        tapped = true;
    }

    function copyExec(){

    }
    
</script>

<div class="container text-center kz-form-des">
    <form action="" method="POST" class="{tapped? 'delete' : ''}">
        <input type="text" required placeholder="Enter your link here..." class="{tapped === 1 ? 'kz-input kz-input-done' : 'kz-input'}">
        <button type="submit" name="userLink" class="shrinker" on:click={buttonClicked}>Shrink</button>
    </form>
    <div id="shrunkLink" class="{tapped? 'container-fluid text-center' : 'delete'}" style="margin-top: 30px; padding: 0px;">
        <div class="container-fluid kz-input kz-input-done" style="margin-right: 0px; width: 100%;">{enteredLink}</div>
        <div class="row justify-content-center" style="margin-left: 10px; padding: 0px !important;">
            <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
                <p class="kz-shrinked-text">{shrinkedText}</p>
            </div>
            <div class="col col-4 col-md-2" style="padding: 0px !important;">
                <button class="kz-alternate" on:click={copyExec}>Copy</button>
            </div>
            <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
                <div class="kz-shrinked-text" style=" ">{analyticsLink}</div>
            </div>
            <div class="col col-4 col-md-2" style="padding: 0px !important;">
                <button class="kz-alternate">Link</button>
            </div>
        </div>
    </div>
</div>