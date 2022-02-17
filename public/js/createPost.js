async function postFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const post_body = document.querySelector('textArea[name="postBody"]').value;;

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            title,
            post_body
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

document.querySelector('#postForm').addEventListener('submit', postFormHandler);