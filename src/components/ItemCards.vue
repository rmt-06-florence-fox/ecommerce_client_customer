<template>
  <div class="container page-container">
      <main class="grid">
          <article>
              <img src="https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/6/24/3080425c-a647-4644-85b2-c81d222a9910.jpg" alt="Baju">
              <div class="text">
                  <h3>T-shirt Gucci</h3>
                  <p>Rp 1.5000.000</p>
                  <button><i class='fas fa-cart-plus'></i> Add tocart <i class="fa fa-cart-plus"></i></button>
              </div>
          </article>

          <article>
              <img src="https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/6/24/3080425c-a647-4644-85b2-c81d222a9910.jpg" alt="Baju">
              <div class="text">
                  <h3>T-shirt Gucci</h3>
                  <p>Rp 1.5000.000</p>
                  <button>Add tocart</button>
              </div>
          </article>

          <article>
              <img src="https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/6/24/3080425c-a647-4644-85b2-c81d222a9910.jpg" alt="Baju">
              <div class="text">
                  <h3>T-shirt Gucci</h3>
                  <p>Rp 1.5000.000</p>
                  <button>Add tocart</button>
              </div>
          </article>
      </main>
  </div>
</template>

<script>
export default {
  name: 'ItemCards'
}
</script>

<style>
body {
    background: white;
}

.grid {
    margin-top: 43px;
    margin-left: 80px;
    margin-right: 60px;
    margin-bottom: 43px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    align-items: center;
}

.grid article {
    background: white;
    border: none;
    box-shadow: 2px 2px 6px 0px black;
    border-radius: 20px;
    text-align: center;
    width: 200px;
    height: 280px;
    transition: transform .3s;
}

.grid article:hover {
    transform: translateY(5px);
    box-shadow: 2px 2px 6px 0px black;
}

.grid article img {
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    height: 172px;
}

.text {
    padding: 0px 20px 20px;
    font-size: 12px;
}

.text p {
    margin-bottom: 10px;
}

.text h3 {
    text-transform: uppercase;
    margin-bottom: 2px;
    margin-top: 4px;
}

.text button {
    background: red;
    border-radius: 20px;
    border: none;
    color: white;
    padding: 10px;
    width: 100%;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .grid {
        grid-template-columns: repeat(1, 1fr);
    }
    .grid articale {
        text-align: center;
    }
}
</style>
