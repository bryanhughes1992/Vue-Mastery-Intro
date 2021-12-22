app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
  /*html*/
  `
  <!-- Sock Image -->
  <div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <a v-bind:href="url">
          <img :src="image" :alt="description">
        </a>
      </div>

      <!-- Product Title-->
      <div class="product-info">
        <h1>{{ title }}</h1>

        <!-- In Stock -->
        <p v-if="inStock">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p>
        <p v-else>Out of Stock</p>
        <p v-if="onSale">On Sale</p>

        <p>Shipping: {{ shipping }}</p>

        <!-- Sock Sizes -->
        <div id="sizeForm">
          <form action="">
            <label for="sockSizes">Choose a size:</label>
            <select name="sockSizes">
              <option v-for="size in sizes">{{ size }}</option>
            </select>
          </form>
        </div>

        <!-- Custom Component with the details prop -->
        <product-details v-bind:details="details"></product-details>

        <!-- Sock Color Variants -->
        <div
          v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
        </div>

        <!-- Add to cart button -->
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          v-on:click="addToCart">
          Add to Cart
        </button>

        <button
          class="button"
          v-on:click="clearCart">
          Clear Cart
        </button>

        <review-list
          v-if="reviews.length"
          :reviews="reviews">
        </review-list>

        <review-form @review-submitted="addReview"></review-form>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      description: "Vue Socks",
      url: 'https://www.vuemastery.com/courses/intro-to-vue-3/attribute-binding-vue3',
      inventory: 100,
      onSale: true,
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
      ],
      sizes: [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large'
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    clearCart() {
      this.$emit('clear-cart')
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return 2.99
    }
  }
})
