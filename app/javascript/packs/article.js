import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from '@rails/ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const HandleHeartDisplay = (hasLiked) => {
    if (hasLiked) {
        $('.active-heart').removeClass('hidden')
    } else {
        $('.inactive-heart').removeClass('hidden')
    }    
}

document.addEventListener('DOMContentLoaded' , () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId
    axios.get(`/articles/${articleId}/like`)
        .then((response) => {
            const hasLiked = response.data.hasLiked
            HandleHeartDisplay(hasLiked)
        }) 

    $('.inactive-heart').on('click', () => {
        axios.post(`/articles/${articleId}/like`)
            .then((response) => {
                if (response.data.status === 'ok' ) {
                    $('.inactive-heart').addClass('hidden')
                    $('.active-heart').removeClass('hidden')
                }
            })
            .catch((e) => {
                window.alert('error')
                console.log(e)
            })
    })

    $('.active-heart').on('click', () => {
        axios.delete(`/articles/${articleId}/like`)
            .then((response) => {
                if (response.data.status === 'ok' ) {
                    $('.inactive-heart').removeClass('hidden')
                    $('.active-heart').addClass('hidden')
                }

            })
            .catch((e) => {
                window.alert('error')
                console.log(e)
            })
    })
})