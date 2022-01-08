import $ from 'jquery'
import axios from 'modules/axios'

const listenInactiveHeartEvent = (articleId) => {
    $('.inactive-heart').on('click', () => {
        axios.post(`/api/articles/${articleId}/like`)
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
}

const listenActiveHeartEvent = (articleId) => {
    $('.active-heart').on('click', () => {
        axios.delete(`/api/articles/${articleId}/like`)
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
}

export {
    listenInactiveHeartEvent,
    listenActiveHeartEvent
}