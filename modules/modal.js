let searcmodal = document.querySelector('.search-modal')
let modalBg = document.querySelector('.modal-bg')
let closeModal = document.querySelector('.close-modal')

export function searchModal(open) {
   open.onclick = () => {
      searcmodal.style.display = 'block'
      modalBg.style.display = 'block'
      searcmodal.classList.add('fade')
      modalBg.classList.add('fade')
   }

   closeModal.onclick = () => {
      searcmodal.style.display = 'none'
      modalBg.style.display = 'none'
   }
}

