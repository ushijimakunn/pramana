MindfulnessType.create!(
  [
    {
      id: 1,
      name: 'タイマー',
      description: '時間の計測のみを行います。',  
      icon: 'mindfulness_types/icon_clock.jpg',
      method: 'いつもの方法で、瞑想を行いましょう。'
    },
    {
      id: 2,
      name: 'ヴィパッサナー瞑想',
      description: 
            'お釈迦さまが、我々に確実に悟りを体験できるように教えられた瞑想法です。
            物ごとをありのままに観察するという行為を通じ、この世の無常を感じましょう。',
      icon: 'mindfulness_types/icon_buddha.jpg',
      method: 
            '以下のことを意識してください。
            浮かび上がってきた感情、思考に判断を下さない。
            浮かび上がってきた感情、思考をただ観察する。
            流れゆく感情の変化を感じ取る。'
    },
    {
      id: 3,
      name: '慈悲の瞑想',
      description: 
            '私、他人、生きとし生けるものへ思いを馳せることで、利他の精神を養う瞑想法です。',
      icon: 'mindfulness_types/icon_heart.svg',
      method: 
            '慈悲の対象は、まずは自分から始め、徐々に広げていきましょう。
            以下の言葉を心の中で唱えましょう。
            『穏やかでありますように』
            『心が安らかでありますように』
            『呼吸が穏やかでありますように』
            『苦しみから逃れられますように』
            『健康でありますように』'
    },
    {
      id: 4,
      name: 'サマタ瞑想',
      description:
             'ひとつのものごとへの集中を維持し続ける瞑想法です。
             集中の対象が逸れる、気づく、戻すを繰り返すことで、注意力を養います。',
      icon: 'mindfulness_types/icon_attention.jpg',
      method: 
            '以下のことを意識してください。
            集中の対象を決める（呼吸、音、景色等）。
            意識が逸れたことに気づく。
            逸れた意識を戻す。
            '
    },
    # {
    #   id: 5,
    #   name: 'マハーサーティ瞑想',
    #   description: '体を動かしながら行う瞑想法。常に動きながら実施できるので、長時間の瞑想が比較的簡単に行える。',
    #   icon: 'mindfulness_types/icon_yoga.jpg',
    #   method: 'テスト方法'
    # },
  ]
)
MindfulnessEffect.create!(
  [
    {
      mindfulness_type_id: 1,
      name: 'ストレスの軽減',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 1,
      name: '集中力の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 1,
      name: '心身のリラックス',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 2,
      name: '感情コントール力の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 2,
      name: '幸福度アップ',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 2,
      name: '睡眠の質の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 3,
      name: '利他の心の成長',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 3,
      name: '自己肯定感の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 3,
      name: '共感力の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 4,
      name: '集中力の向上',
      description: 'テスト説明文章',
    },
    {
      mindfulness_type_id: 4,
      name: '心身のリラックス',
      description: 'テスト説明文章',
    },
  ]
)

