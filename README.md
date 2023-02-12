# サービス概要

瞑想の方法を知り、効果を知り、日々の実績を記録する、シンプルなサービスとなっております。

# メインのターゲットユーザー

- 瞑想って最近よく聞くけど、何がいいの？と思っている方々
- 瞑想をやっているが、いまいちどんな効果があるのか知らない方々

# 機能一覧

### 瞑想を行う種類を選択でき、方法を確認しながら実施できる。
ユーザーが以下に記載の瞑想法を選択し、実施できます。それぞれの方法を確認しながら行うので、
自分に合った瞑想法を探すことが可能です。
また、瞑想タイマー終了後に効果を記載したページを表示することで、自分が行っている瞑想法の効果を確認することが可能です。
- 瞑想法メニュー一覧
  - 標準機能(タイマー機能のみ)
  - ヴィパッサナー瞑想
  - 慈悲の瞑想
  - サマタ瞑想
  - （随時拡張予定）

### 瞑想の実施記録を閲覧できる
ユーザーの瞑想記録について、以下の項目を確認することができます。
- 確認事項
  - 実施した合計日数
  - 実施した合計時間（それぞれの瞑想法の時間も表示）
  - 実施した日をカレンダーに表示（実施日は、仏さんの顔を表示）
  - ユーザーのランクを表示

# なぜこのサービスを作ったのか
### 「心を鍛える」という概念を！
瞑想は、心を鍛える手法です。漠然とした不安や恐怖を感じている人に有効だと思います。

私自身、社会人になり、仕事をするようになると毎日が憂鬱で、不安で、どこか心に重しがあるような感覚でした。
そんな時に、瞑想を学び、日々実践すると、自分の心が少しずつ軽くなっていくのを感じることができました。

この体験から、きっと自分以外にも同様の効果を感じていただけるのではないかと思い、このサービスを作りたいと思いました。
参考までに瞑想によって自分が感じたことを以下にまとめます。

### 自分が実感している瞑想の効果

- 自分をメタな視点で見ることができる
  - 自分の感情を冷静に見ることができる
  - 落ちこんだ時でも立ち上がりが早くなる
  - 自己批判を抑えることができる（自分に優しくなる）
  - メンタルが強くなる
- 自己対話の時間ができる
  - 自分が何を大事にしたいかが見えてくる
  - やるやらないの判断軸が明確になってくる
  - 自分が目指したいところが明確になる

# スケジュール

- 企画〜技術調査： 1/8 ~ 1/15
- README〜ER図作成：1/8 ~ 1/15
- メイン機能実装：1/15 - 2/15
- β版をリリース（MVP）：2/15
- 本番リリース：3/1

# 使用技術
| バックエンド  | フロントエンド  | インフラ  |
| :----       | :----         | :----   |
|Ruby(3.2.0)<br>Ruby on Rails(6.1.7)<br><br><br>|TailwindCSS<br>daisyUI<br>JavaScript<br>jQuery |  PostgreSQL<br>Heroku<br><br><br>|

# 画面遷移図

[画面遷移図 figma](https://www.figma.com/file/nb1NUI4e0r3rX1AVupLkRX/ZEN_to_live_as_we_are?node-id=0%3A1&t=Dir3vXaWk7B7buyW-1)

# ER図
![pramana drawio](https://user-images.githubusercontent.com/98957780/218253912-989eae19-03a0-4683-a210-35473ffb660d.svg)
