<style>

    .kz-edit{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.281);
        z-index: 999;
    }

    .kz-modal-body{
        height: 100vh;
        position: relative;
    }

    .kz-qr-modal-body{
        height: 100vh;
        position: relative;
    }

    .kz-absolute{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: transparent;
    }

    .kz-qr-absolute{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: transparent;
    }

    .kz-modal-bg{
        border-radius: 5px;
        width: 100%;
        /* height: 30vh; */
        background-color: #f5f5f5;
    }

    .kz-modal-heading{
        
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 0px; 
        position: relative;
    }

    .kz-close{
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .kz-close button{
        background-color: transparent;
    }

    .kz-redirect{
        font-size: 15px;
        font-weight: 999;
        padding-left: 50px;
    }

    .kz-input{
        min-width: 68%;
        background-color: #ffffff;
        color: #696969;
        padding: 15px 40px 15px 40px;
        border-radius: 10px;
        border-style: none;
        overflow-x: auto;
    }

    .shrinker{
        font-size: 20px;
        color: #ffffff;
        background-color: #000000;
        padding: 15px 40px 15px 40px; 
        text-transform: uppercase;
        border-radius: 10px;
        margin-left: 10px;
    }

    #qrcode {
        width:160px;
        height:160px;
        margin-top:15px;
    }

    @media(max-width: 640px){
        .kz-input{
            min-width: 40%;
        }
        .shrinker{
            padding: 15px 20px 15px 20px; 
        }
    }

    @media(max-width: 410px){
        .shrinker{
            margin: 0px;
            margin-top: 10px;
        }
    }

</style>

<script>

//importing details of each individual link.

export let count;
export let name;
export let shortURL;
export let longURL;
const kzilla = 'kzilla.xyz/';
const analytics = 'kzilla.xyz/analytics/';

//Opening and closing the edit and QR modals.

function showEditor(e){
    var editor = this.parentElement;
    window.$(editor).find('.kz-modalId').removeClass('d-none');
};

function showQREditor(e){
    var editor = this.parentElement;
    window.$(editor).find('.kz-qr-modalId').removeClass('d-none');
};

function hideEditor(){
    var editor = document.querySelectorAll(".kz-modalId");
    console.log('hello');
    editor.forEach(
        function(e){
            window.$(e).addClass('d-none')
        }
    )
};

function hideQREditor(){
    var editor = document.querySelectorAll(".kz-qr-modalId");
    editor.forEach(
        function(e){
            window.$(e).addClass('d-none')
        }
    )
};

//Generating QR codes----------------------------


</script>

<div class="col col-5">
    {name}
</div>
<div class="col col-4">
    {count}
</div>
<div class="col col-3 kz-finder">
    <svg on:click={showEditor} style="padding-right: 5px;" height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 kz-edit-btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
    <svg style="padding-right: 5px;" height="24px" viewBox="0 0 29 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
        <title>ic-round-content-copy</title>
        <desc>Created with Sketch.</desc>
        <g id="Screens" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="shrunk" transform="translate(-605.000000, -813.000000)" fill-rule="nonzero">
                <g id="Group-4">
                    <g id="Group-5" transform="translate(140.000000, 790.000000)">
                        <g id="Group-Copy" transform="translate(420.000000, 0.000000)">
                            <g id="ic-round-content-copy" transform="translate(42.000000, 22.000000)">
                                <g id="Icon" fill="black">
                                    <path d="M22.5,1.5 C23.3284271,1.5 24,2.17157288 24,3 C24,3.82842712 23.3284271,4.5 22.5,4.5 L6,4.5 L6,24 C6,24.8284271 5.32842712,25.5 4.5,25.5 C3.67157288,25.5 3,24.8284271 3,24 L3,4.5 C3,2.85 4.35,1.5 6,1.5 L22.5,1.5 Z" id="Icon-Path"></path>
                                    <path d="M12,7.5 L28.5,7.5 C30.1568542,7.5 31.5,8.84314575 31.5,10.5 L31.5,31.5 C31.5,33.1568542 30.1568542,34.5 28.5,34.5 L12,34.5 C10.3431458,34.5 9,33.1568542 9,31.5 L9,10.5 C9,8.84314575 10.3431458,7.5 12,7.5 Z" id="Icon-Path"></path>
                                </g>
                                <rect id="ViewBox" x="0" y="0" width="36" height="36"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
    <svg on:click={showQREditor} style="padding-right: 5px;" height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="qrcode" class="svg-inline--fa fa-qrcode fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
    <svg width="15px" height="15px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
        <title>ic-baseline-bar-chart</title>
        <desc>Created with Sketch.</desc>
        <g id="Screens" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="shrunk" transform="translate(-1229.000000, -819.000000)" fill-rule="nonzero">
                <g id="Group-4">
                    <g id="Group-5-Copy" transform="translate(760.000000, 790.000000)">
                        <g id="Group-Copy" transform="translate(420.000000, 0.000000)">
                            <g id="ic-baseline-bar-chart" transform="translate(42.000000, 22.000000)">
                                <g id="Icon" fill="black">
                                    <path d="M7.5,13.8 L12,13.8 L12,28.5 L7.5,28.5 L7.5,13.8 Z M15.9,7.5 L20.1,7.5 L20.1,28.5 L15.9,28.5 L15.9,7.5 Z M24.3,19.5 L28.5,19.5 L28.5,28.5 L24.3,28.5 L24.3,19.5 Z" id="Icon-Shape"></path>
                                </g>
                                <rect id="ViewBox" x="0" y="0" width="36" height="36"></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
    <div class="container-fluid kz-edit d-none kz-modalId">
        <div class="row align-items-center justify-content-center kz-modal-body">
            <div class="kz-absolute" on:click={hideEditor}></div>
            <div class="col col-12 col-sm-11 col-lg-8 col-xl-6 kz-modal-bg">
                <h3 class="kz-modal-heading">
                        <svg style="padding-right: 5px;" height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
                        {kzilla}{shortURL}
                        <div class="kz-close">
                            <button on:click={hideEditor}>
                                <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>
                            </button>
                        </div>
                </h3>
                <hr>
                <h3 class="kz-redirect">REDIRECTS TO</h3>
                <div class="container-fluid text-center" style="padding: 0; padding-bottom: 20px;">
                    
                    <form action="" method="POST">
                        <input type="text" name={longURL} value="{longURL}" required placeholder="Enter the new link here..." class="kz-input">
                        <button type="submit" name="userLink" class="shrinker">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid kz-edit d-none kz-qr-modalId">
        <div class="row align-items-center justify-content-center kz-modal-body">
            <div class="kz-qr-absolute" on:click={hideQREditor}></div>
            <div class="col col-12 col-sm-11 col-lg-8 col-xl-6 kz-modal-bg">
                <h3 class="kz-modal-heading">
                    <svg style="padding-right: 5px;" height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="qrcode" class="svg-inline--fa fa-qrcode fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
                        {kzilla}{shortURL}
                        <div class="kz-close">
                            <button on:click={hideQREditor}>
                                <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>
                            </button>
                        </div>
                </h3>
                <hr>
                <div class="container-fluid text-center" style="padding: 0; padding-bottom: 20px;">                    
                    <input id="text" type="text" value="https://hogangnono.com" style="width:80%" /><br />
                    <div id="qrcode"></div>
                </div>
            </div>
        </div>
    </div>
</div>

