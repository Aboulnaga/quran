import react from "react"
import { v4 as UUID } from "uuid"
function Database() {
  return [
    /////////////////////////////////////////////////////////////////
    /************************المنشاوي******************************/
    ////////////////////////////////////////////////////////////////
    {
      sh_id: 1,
      shaykh: "Mohamed Sedek Almenshawy",
      shaykh_ar: "محمد صديق المنشاوي",
      img: "./database/mohamed sedeek almenshawy/mohamed sedeek almenshawy.jpg",
      sound: [
        {
          sh_id: 1,
          sora_id: 11,
          soret: "Al-Fateha",
          soret_ar: "الفاتحة",
          link: "./database/mohamed sedeek almenshawy/Al-Fateha.mp3",
        },
        {
          sh_id: 1,
          sora_id: 12,
          soret: "Al-Modather",
          soret_ar: "المدثر",
          link: "./database/mohamed sedeek almenshawy/Al-Modather.mp3",
        },
      ],
    },
    /////////////////////////////////////////////////////////////////
    /**********************عبد الباسط******************************/
    ////////////////////////////////////////////////////////////////
    {
      sh_id: 2,
      shaykh: "Abdelbaset Abdelsamad",
      shaykh_ar: "عبدالباسط عبدالصمد",
      img: "./database/abdelbaset abdelsamad/abdelbaset abdelsamad.jpg",
      sound: [
        {
          sh_id: 2,
          sora_id: 21,
          soret: "Al-Fateha",
          soret_ar: "الفاتحة",
          link: "./database/abdelbaset abdelsamad/Al-Fateha.mp3",
        },
        {
          sh_id: 2,
          sora_id: 22,
          soret: "Al-Modather",
          soret_ar: "المدثر",
          link: "./database/abdelbaset abdelsamad/Al-Modather.mp3",
        },
      ],
    },
    /////////////////////////////////////////////////////////////////
    /**********************الدوسري******************************/
    ////////////////////////////////////////////////////////////////
    {
      sh_id: 3,
      shaykh: "Yasser Aldosary",
      shaykh_ar: "ياسر الدوسري",
      img: "./database/yasser aldosary/yasser aldosary.jpg",
      sound: [
        {
          sh_id: 3,
          sora_id: 31,
          soret: "Al-Fajr",
          soret_ar: "الفجر",
          link: "./database/yasser aldosary/Al-Fajr.mp3",
        },
        {
          sh_id: 3,
          sora_id: 32,
          soret: "Al-Keiama",
          soret_ar: "القيامة",
          link: "./database/yasser aldosary/Al-Keiama.mp3",
        },
        {
          sh_id: 3,
          sora_id: 33,
          soret: "Al-Hakka",
          soret_ar: "الحاقة",
          link: "./database/yasser aldosary/Al-Hakka.mp3",
        },
      ],
    },

    /////////////////////////////////////////////////////////////////
    /**********************العفاسي******************************/
    ////////////////////////////////////////////////////////////////
    {
      sh_id: 4,
      shaykh: "Mishary Rashid Alafasy",
      shaykh_ar: "مشاري راشد العفاسي ",
      img: "./database/mishary rashid alafasy/mishary rashid alafasy.jpg",
      sound: [
        {
          sh_id: 4,
          sora_id: 41,
          soret: "Al-Nas",
          soret_ar: "الناس",
          link: "./database/mishary rashid alafasy/Al-Nas.mp3",
        },
        {
          sh_id: 4,
          sora_id: 42,
          soret: "Al-Falak",
          soret_ar: "الفلق",
          link: "./database/mishary rashid alafasy/Al-Falak.mp3",
        },
        {
          sh_id: 4,
          sora_id: 43,
          soret: "Al-Enshekak",
          soret_ar: "الإنشقاق",
          link: "./database/mishary rashid alafasy/Al-Enshekak.mp3",
        },
      ],
    },

    /////////////////////////////////////////////////////////////////
    /**********************محمد رفعت******************************/
    ////////////////////////////////////////////////////////////////
    {
      sh_id: 5,
      shaykh: "Muhammed Refaat",
      shaykh_ar: "محمد رفعت",
      img: "./database/muhammed refaat/muhammed refaat.jpg",
      sound: [
        {
          sh_id: 5,
          sora_id: 51,
          soret: "Al-Fateha",
          soret_ar: "الفاتحه",
          link: "./database/muhammed refaat/Al-Fateha.mp3",
        },
        {
          sh_id: 5,
          sora_id: 52,
          soret: "Al-Fajr",
          soret_ar: "الفجر",
          link: "./database/muhammed refaat/Al-Fajr.mp3",
        },
      ],
    },
  ]
}

export default Database
