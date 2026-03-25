const initForm = () => {
  document.querySelectorAll('.form_input').forEach((field) => {
    const label = field.closest('.form-field-group')?.querySelector('.form_label')
    const isTextarea = field.closest('.form-field-group')?.querySelector('.form_input.is-text-area')

    // On focus in
    field.addEventListener('focusin', () => {
      if (label) label.classList.remove('is-large')
      if (isTextarea) field.classList.add('is-active')
    })

    // On focus out
    field.addEventListener('focusout', () => {
      const isEmpty = field.value.trim().length === 0
      if (isEmpty && label) label.classList.add('is-large')
      if (isTextarea && isEmpty) field.classList.remove('is-active')
    })

    // On load
    if (field.value.trim().length > 0) {
      if (label) label.classList.remove('is-large')
      if (isTextarea) field.classList.add('is-active')
    }
  })
}

export function initContact() {
  initForm()
}
