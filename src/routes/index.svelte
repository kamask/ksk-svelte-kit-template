<script>
import Logo from "./_index/Logo.svelte";
</script>

<h1>KSK</h1>
<div class="logo">
    <Logo/>
</div>

<svelte:head>
    <title>KSK</title>
    <meta name="keywords" content="KSK">
    <meta name="description" content="KSK">
    <style>
        @keyframes logo-rotating{
        0%{
            transform: rotateY(0deg);
        }
        40%{
            transform: rotateY(180deg);
        }
        100%{
            transform: rotateY(0deg);
        }
    }
    h1{
        font-weight: normal;
        text-align: center;
        color: rgb(77, 77, 77);
    }
    .logo{
        margin: 0 auto;
        width: 300px;
        animation: 3.5s ease-in-out infinite logo-rotating;
    }

    .logo svg{
        filter: drop-shadow( 0px 45px 10px rgba(0, 0, 0, 0.5) );
    }
    </style>
</svelte:head>