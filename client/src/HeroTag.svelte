<style>
    .header{
        margin-top:27vh;
        padding-left: 150px;
    }
    .header h1{
        font-size: 60px;
        display: flex;
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
    .roller__list {
        overflow-y: hidden;
        height: 75px;
        margin-top: 2px;
        padding-left: 0px;
    }
    .roller__list li{
        list-style-type: none;
        padding-top: 0px;
        animation: roll;
        animation-duration: 10s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }
    @keyframes roll {
        0% { transform: translateY(-5em); }
        4% { transform: translateY(-3.65em); }
        25% { transform: translateY(-3.65em); }
        29% { transform: translateY(-2.47em); }
        50% { transform: translateY(-2.47em); }
        54% { transform: translateY(-1.25em); }
        75% { transform: translateY(-1.25em); }
        79% { transform: translateY(-0.07em); }
        100% { transform: translateY(-0.07em); }
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
        .roller__list{
            height: 12vw;
        }
    }
    @media(max-width: 500px){
        
    }
</style>

<div class="container-fluid header">
    <h1>A 
        <ul class="roller__list">
            <li>&nbsp;stupid simple</li>
            <li>&nbsp;breezy</li>
            <li>n&nbsp;uninterrupted</li>
            <li>&nbsp;snappy</li>
        </ul>
    </h1>
    <h1 class="headTwo">URL shortener</h1>
</div>