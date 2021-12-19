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

const HandleCommentForm = () => {
    $('.show-comment-form').on('click', () => {
        $('.show-comment-form').addClass('hidden')
        $('.comment-text-area').removeClass('hidden')
    })
}

const appendNewComment = (comment) => {
    $('.comments-container').append(
        `<div class="article_comment"><p>${comment.content}</p></div>`
        )
}


document.addEventListener('DOMContentLoaded' , () => {
    const dataset = $('#article-show').data()
    const articleId = dataset.articleId

    axios.get(`/articles/${articleId}/comments`)
        .then((response) => {
            const comments = response.data
            comments.forEach((comment) => {
                appendNewComment(comment)
            })
        })

    HandleCommentForm()

    $('.add-comment-button').on('click', () => {
        const content = $('#comment_content').val()
        if (!content) {
          window.alert('コメントを入力してください')
        } else {
          axios.post(`/articles/${articleId}/comments`, {
            comment: {content: content}
          })
            .then((res) => {
              const comment = res.data
              appendNewComment(comment)
              $('#comment_content').val('')
            })
        }
      })
    


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