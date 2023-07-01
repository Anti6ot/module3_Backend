

document.addEventListener('click', event=>{
    if(event.target.dataset.type === 'remove'){
        const id = event.target.dataset.id

    remove(id).then(()=> {
        event.target.closest('li').remove()
    })
    }
    if(event.target.dataset.type === 'redact'){
        const id = event.target.dataset.id
        const redactText = prompt('введите новое название')
       return redact(id, redactText)
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE' })
}
async function redact(id, msg) {
    console.log(id)
    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: msg})
    })
}