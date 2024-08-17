<div class="loader-container">
    <p class="current">current</p>
    <p class="punto">.</p>
    <p class="me">me</p>
</div>

<style>
    .loader-container {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-rows: 1fr 1fr 1.2fr;
        grid-template-columns: 1fr auto 1.2fr;
    }
    .current {
        grid-area: 1 / 1 / 3 / 2;
        font-size: 4rem;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .punto {
        grid-area: 1 / 2 / 3 / 2;
        font-size: 4rem;
        font-weight: bold;
        display: flex;
        justify-content: end;
        align-items: flex-end;
    }
    .me {
        grid-area: 1 / 3 / 3 / 4;
        font-size: 16rem;
        font-weight: bold;
        display: flex;
        align-items:flex-end;
        line-height: 13rem;
    }
</style>