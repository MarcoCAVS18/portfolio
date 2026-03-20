import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'

const timeSlots = [
  { from: 5,  to: 12, key: 'morning',   Icon: Sunrise },
  { from: 12, to: 18, key: 'afternoon', Icon: Sun     },
  { from: 18, to: 22, key: 'evening',   Icon: Sunset  },
  { from: 22, to: 29, key: 'night',     Icon: Moon    }, // 29 wraps midnight→5
]

const greetings = {
  en: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', night: 'Good night' },
  es: { morning: 'Buenos días',  afternoon: 'Buenas tardes',  evening: 'Buenas noches', night: 'Buenas noches' },
  pt: { morning: 'Bom dia',      afternoon: 'Boa tarde',      evening: 'Boa noite',     night: 'Boa noite'    },
  fr: { morning: 'Bonjour',      afternoon: 'Bon après-midi', evening: 'Bonsoir',       night: 'Bonne nuit'   },
  de: { morning: 'Guten Morgen', afternoon: 'Guten Tag',      evening: 'Guten Abend',   night: 'Gute Nacht'   },
  it: { morning: 'Buongiorno',   afternoon: 'Buon pomeriggio',evening: 'Buonasera',     night: 'Buonanotte'   },
  zh: { morning: '早上好',        afternoon: '下午好',           evening: '晚上好',         night: '晚安'          },
  ja: { morning: 'おはようございます', afternoon: 'こんにちは',    evening: 'こんばんは',    night: 'おやすみなさい'  },
}

export function getGreeting() {
  const hour = new Date().getHours()
  const lang = (navigator.language || 'en').split('-')[0]

  const slot = timeSlots.find(({ from, to }) =>
    hour >= from && hour < (to > 24 ? to - 24 : to)
  ) ?? timeSlots[3]

  const set = greetings[lang] || greetings.en

  return { text: set[slot.key], Icon: slot.Icon }
}
