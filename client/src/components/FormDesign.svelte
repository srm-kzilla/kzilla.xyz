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
            margin-bottom: 0px;
        }
    }
    @media(max-height: 640px){
        .kz-form-des{
            margin-top: 10vh;
        }
    }
</style>

<script>

    let tapped = false;
    let shortURL = "HeL0OlUc45";
    let analyticsCode = "YmcA5s";
    let longURL = "";

    function buttonClicked(){
        tapped = true;
    }

    function copyExec(){
        var $temp = window.$("<input>");
        window.$("body").append($temp);
        $temp.val(window.$("#shrink").text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
    
</script>

<div class="container text-center kz-form-des">
    <form action="" method="POST" class="{tapped? 'delete' : ''}">
        <input type="text" bind:value={longURL} required placeholder="Enter your link here..." class="{tapped === 1 ? 'kz-input kz-input-done' : 'kz-input'}">
        <button type="button" name="userLink" class="shrinker" on:click={buttonClicked}>Shrink</button>
    </form>
    <div id="shrunkLink" class="{tapped? 'container-fluid text-center' : 'delete'}" style="margin-top: 30px; padding: 0px;">
        <div class="container-fluid kz-input kz-input-done" style="margin-right: 0px; width: 100%;">{longURL}</div>
        <div class="row justify-content-center" style="margin-left: 10px; padding: 0px !important;">
            <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
                <p class="kz-shrinked-text" id="shrink">kzilla.xyz/{shortURL}</p>
            </div>
            <div class="col col-4 col-md-2" style="padding: 0px !important;">
                <button class="kz-alternate" on:click={copyExec}><img height="28px" src="ic-round-content-copy.svg" alt="copy-btn"></button>
            </div>
            <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
                <div class="kz-shrinked-text" style=" ">kzilla.xyz/Analytics/{analyticsCode}</div>
            </div>
            <div class="col col-4 col-md-2" style="padding: 0px !important;">
                <button class="kz-alternate"><img height="28px" src="./ic-baseline-bar-chart.svg" alt="stats-btn"></button>
            </div>
        </div>
    </div>
</div>