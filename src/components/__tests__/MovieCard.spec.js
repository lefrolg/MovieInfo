import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import MovieCard from '../MovieCard.vue'
import router from "../../router/index.js";
import { describe, it, expect } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'

const vuetify = createVuetify({ components, directives })

window.ResizeObserver = ResizeObserver

const imagePath = 'https://media.themoviedb.org/t/p/w220_and_h330_face/'

const props = {
  title: 'Test Movie',
  releaseDate: '2023-05-10',
  posterUrl: '/poster.jpg',
  rating: 8,
  id: 1234,
}
describe('MovieCard', async () => {

  const wrapper = mount(MovieCard, {
    props,
    global: {
      plugins: [vuetify, router],
      provide: {
        'vite-plugin-env': { import: { meta: { env: { VITE_TMDB_IMAGE_URL: imagePath } } } } },
    },
  })

  await router.isReady()

  it('should display the correct title', () => {
    expect(wrapper.find('.v-card-title').text()).toBe('Test Movie')
  })

  it('should concatenate imagePath and posterUrl for v-img src', () => {
    const img = wrapper.find('.v-img__img')
    expect(img.attributes('src')).toBe(imagePath + '/poster.jpg')
  })

  it('should format and display the correct release date', () => {
    const date = new Date('2023-05-10').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    expect(wrapper.text()).toContain(date)
  })

  it('should render a v-rating component with the correct rating', () => {
    const rating = wrapper.find('.v-rating')
    expect(rating.exists()).toBe(true)
    expect(wrapper.text()).toContain('8')
  })

  it('should have a router link to the movie page', () => {
    const card = wrapper.find('.v-card')
    expect(card.attributes('href')).toBe('/movie/1234')
  })
})
