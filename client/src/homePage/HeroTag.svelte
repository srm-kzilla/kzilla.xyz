<style>
    .header{
        margin-top: 8vh;
        padding-left: 8vw;
    }
    .header h1{
        font-size: 8.5vh;
        font-family: UniSansBook;
        font-weight: normal;
        display: flex;
    }
    .kz-shrinker-heading{
        position: relative;
    }
    .kz-shrinker-heading:before{
        position: absolute;
        content: '';
        bottom: 0px;
        left: 8vh;
        top: 6.7vh;
        width: 32vh;
        height: 2.5vh;
        background-color: var(--green);
        z-index: -1;
    }
    .roller__list {
        overflow-y: hidden;
        height: 9.5vh;
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
        29% { transform: translateY(-2.41em); }
        50% { transform: translateY(-2.41em); }
        54% { transform: translateY(-1.25em); }
        75% { transform: translateY(-1.25em); }
        79% { transform: translateY(-0.04em); }
        100% { transform: translateY(-0.04em); }
    }
    
    @media (max-width: 920px) {
    .header{
        padding-left: 5vw;
    }
  }
    @media(max-width: 650px){
        /* .header{
            margin-top: 200px;
            padding-left: 30px;
        } */
        .header h1{
            font-size: 10vw;
        }
        .kz-shrinker-heading:before{
            top: 7.5vw;
            left: 9vw;
            width: 38vw;
            height: 3vw;
        }
        .roller__list{
            height: 12vw;
        }
    }
    @media(max-height: 676px){
        .header{
            /* margin-top: 20vh; */
        }
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
    <h1 class="kz-shrinker-heading">URL shrinker</h1>
</div>