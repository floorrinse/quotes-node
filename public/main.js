const editButtons = document.querySelectorAll('.update-button');
const deleteButtons = document.querySelectorAll('.delete-button');
const modalSaveButton = document.querySelector('.save-changes-button');
const modalDeleteButton = document.querySelector('.delete-quote-button')

editButtons.forEach(editButton =>
  editButton.addEventListener('click', () => {
    const quoteElement = editButton.parentNode.parentNode;
    const nameText = quoteElement.getElementsByClassName('name-text')[0].innerText;
    const quoteText = quoteElement.getElementsByClassName('quote-text')[0].innerText;
    const modalMessage = document.querySelector('.modal-body');
    const modalNameInput = document.querySelector('.edit-name-input');
    const modalQuoteInput = document.querySelector('.edit-quote-input');
  

    modalNameInput.value = `${nameText}`;
    modalQuoteInput.value = `${quoteText}`
    modalMessage.setAttribute('id', quoteElement.id) 

    // modalMessage.classList.add('highlight');

    // const textarea = document.querySelector('.edit-quote-input').value;
    // console.log(textarea);
    //send put request here
    // fetch(`/quotes/edit`, {
    //   method: 'put',
    //   headers: { 'Content-Type' : 'application/json' },
    //   body: JSON.stringify({
    //     name: 'Darth Vader',
    //     quote: 'I am your fathjer'
    //   })
    // })
    // .then(res => {
    //   if (res.ok) return res.json()
    // })
    // .then(response => {
    //   console.log(response)
    // })
  })
)

deleteButtons.forEach(deleteButton =>
  deleteButton.addEventListener('click', () => {
    console.log('delete button clicked');
    const quoteElement = deleteButton.parentNode.parentNode;
    const nameText = quoteElement.getElementsByClassName('name-text')[0].innerText;
    const quoteText = quoteElement.getElementsByClassName('quote-text')[0].innerText;
    const modalMessage = document.querySelector('.delete-modal-body');
    const modalNameInput = document.querySelector('.delete-name-input');
    const modalQuoteInput = document.querySelector('.delete-quote-input');
    
    modalMessage.setAttribute('id', quoteElement.id);
    modalNameInput.innerText = `${nameText}`;
    modalQuoteInput.innerText = `${quoteText}`;
    
    // const quoteElement = document.querySelector('.quote-wrapper');
    // const quoteId = quoteElement.getAttribute('id')
    // const nameText = quoteElement.getElementsByClassName('name-text')[0].innerText;
    // const quoteText = quoteElement.getElementsByClassName('quote-text')[0].innerText;

    // fetch('/quotes/delete', {
    //   method: 'delete',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     _id : quoteId,
    //     name: nameText,
    //     quote: quoteText
    //   })
    // })
    // .then(res => {
    //     if (res.ok) return res.json()
    // })
    // .then(response => {
    //     console.log(response)
    // })
  })
  )

modalSaveButton.addEventListener('click', () => {
  const modal = document.querySelector('.modal-body');
  const quoteId = modal.getAttribute('id');
  const modalNameInputValue = document.querySelector('.edit-name-input').value;
  const modalQuoteInputValue = document.querySelector('.edit-quote-input').value;
  fetch(`/quotes/edit/${quoteId}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: modalNameInputValue,
      quote: modalQuoteInputValue
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      console.log(response)
    })
})

modalDeleteButton.addEventListener('click', () => {
  const modal = document.querySelector('.delete-modal-body');
  const quoteId = modal.getAttribute('id');
  const modalNameValue = document.querySelector('.delete-name-input').innerText;
  const modalQuoteValue = document.querySelector('.delete-quote-input').innerText;

 fetch('/quotes/delete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id : quoteId,
        name: modalNameValue,
        quote: modalQuoteValue
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
    })
})