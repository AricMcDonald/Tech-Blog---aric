const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
]

async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const post_body = document.querySelector('textArea[name="postBody"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch('/api/posts/' + id, {
        method: 'put',
        body: JSON.stringify({
            title: title,
            post_body: post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard')
    } else {
        console.log(response.statusText);
    }
}

async function deletePost(event) {
    event.preventDefault();

    const response = await fetch('/api/posts/' + id, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 

    
    if(response.ok) {
        document.location.replace('/dashboard')
    } else {
        console.log(response.statusText);
    }

}

document.querySelector('#postForm').addEventListener('submit', postFormHandler);
document.querySelector('.deleteBtn').addEventListener('click', deletePost);