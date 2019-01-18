import CursorMove from './cursorMove'

window.addEventListener('load', () => {
  const cursor = new CursorMove({
    wrapperClass: '.cm-pointer'
  })
  cursor.init()
})
