export default class CursorMove {
  /**
   * constructor
   * @param {string} - ポインターのwrapperのクラス名
   * @param {string} - 内側のポインターのクラス名
   * @param {string} - 外側のポインターのクラス名
   * @param {string} - ホバー対象のリンク
   * @param {string} - リンクホバー時のクラス
   * @param {string} - 付与するクラス
   */

  constructor(wrapperClass, cursorClass, cursorOverClass, linkClass) {
    this.wrapperClass = !wrapperClass ? '.cm-pointer' : wrapperClass
    this.cursorClass = !cursorClass ? '.cm-pointer__dot' : cursorClass
    this.cursorOverClass = !cursorOverClass ? '.cm-pointer__over' : cursorOverClass
    this.linkClass = !linkClass ? '.cm-link' : linkClass
    this.hoverClass = 'is-hover'
    this.activeClass = 'is-active'

    this.$wrapper = null
    this.$cursor = null
    this.$cursorOver = null
    this.$targetLink = null

    this.cursorActived = false
    this.cursorHover = false
    this.cursorShown = false
    this.delay = 6
    this.x = 0
    this.y = 0

    this.endX = 0
    this.endY = 0
  }

  init() {
    this.setup()

    this.setupEventListeners()
    this.animateMoveOver()
  }

  setup() {
    this.$wrapper = document.querySelector(this.wrapperClass)
    this.$cursor = document.querySelector(this.cursorClass)
    this.$cursorOver = document.querySelector(this.cursorOverClass)
    this.$targetLink = document.querySelectorAll(this.linkClass)

    this.endX = (window.innerWidth / 2)
    this.endY = (window.innerHeight / 2)
  }

  setupEventListeners() {
    this.$targetLink.forEach((el) => {
      el.addEventListener('mouseover', () => {
        this.cursorHover = true
        this.toggleCursorHover()
      })
      el.addEventListener('mouseout', () => {
        this.cursorHover = false
        this.toggleCursorHover()
      })
    })

    // Click events
    document.addEventListener('mousedown', () => {
      this.cursorActived = true
      this.toggleCursorActive()
    })
    document.addEventListener('mouseup', () => {
      this.cursorActived = false
      this.toggleCursorActive()
    })
    document.addEventListener('mousemove', e => {
      // Show the cursor
      this.cursorShown = true
      this.toggleCursorShown()
      this.handlePosition(e)
    })
    document.addEventListener('mouseenter', (e) => {
      this.cursorShown = true
      this.toggleCursorShown()
    })
    document.addEventListener('mouseleave', (e) => {
      this.cursorShown = false
      this.toggleCursorShown()
    })
  }

  handlePosition(event) {
    this.endX = event.clientX
    this.endY = event.clientY

    if (this.cursorShown) {
      this.$cursor.style.top = this.endY + 'px'
      this.$cursor.style.left = this.endX + 'px'
    }
  }

  animateMoveOver() {
    this.x += (this.endX - this.x) / this.delay
    this.y += (this.endY - this.y) / this.delay
    if (this.cursorShown) {
      this.$cursorOver.style.top = this.y + 'px'
      this.$cursorOver.style.left = this.x + 'px'
    }

    requestAnimationFrame(this.animateMoveOver.bind(this))
  }

  toggleCursorShown() {
    console.log(this.cursorShown)
    if (this.cursorShown) {
      this.$cursor.style.opacity = 1
      this.$cursorOver.style.opacity = 1
    } else {
      this.$cursor.style.opacity = 0
      this.$cursorOver.style.opacity = 0
    }
  }

  toggleCursorHover() {
    if (this.cursorHover) {
      this.$cursorOver.classList.add(this.hoverClass)
    } else {
      this.$cursorOver.classList.remove(this.hoverClass)
    }
  }

  toggleCursorActive() {
    if (this.cursorActived) {
      this.$cursorOver.classList.add(this.activeClass)
    } else {
      this.$cursorOver.classList.remove(this.activeClass)
    }
  }
}
