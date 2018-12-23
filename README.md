## 使用ファイル
  `src/assets/css/cursorMove.scss`
  `src/assets/js/CursorMove.js`

  html

  ```
    <div class="cm-pointer">
      <span class="cm-pointer__dot"></span>
      <span class="cm-pointer__over">
        <span class="cm-pointer__overEffect"></span>
      </span>
    </div>
  ```

## CursorMove.js

こんな感じでつかう

```
import CursorMove from './CursorMove'

window.addEventListener('load', () => {
  const cursor = new CursorMove()
  cursor.init()
})
```

引数とか

```
CursorMove(
  'wrapperのidまたはクラス',
  'cursor(小)のidまたはクラス',
  'cursor(大)のidまたはクラス',
  'hover対象のリンクやボタンのクラス名'
)
```

あとは適宜いい感じに使う
