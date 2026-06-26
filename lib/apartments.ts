export type Review = {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export type Apartment = {
  id: string
  name: string
  district: string
  address: string
  lat: number
  lng: number
  image: string
  pricePerSqm: number // MNT
  area: number // m2
  rooms: number
  floor: number
  totalFloors: number
  year: number
  description: string
  pros: string[]
  cons: string[]
  reviews: Review[]
}

export const DISTRICTS = [
  'Сүхбаатар',
  'Хан-Уул',
  'Баянзүрх',
  'Чингэлтэй',
  'Баянгол',
  'Сонгинохайрхан',
] as const

export const apartments: Apartment[] = [
  {
    id: 'sky-garden',
    name: 'Sky Garden Residence',
    district: 'Сүхбаатар',
    address: 'Сүхбаатар дүүрэг, 1-р хороо, Энхтайвны өргөн чөлөө',
    lat: 47.9185,
    lng: 106.9176,
    image: '/apartments/sky-garden.png',
    pricePerSqm: 4200000,
    area: 78,
    rooms: 3,
    floor: 12,
    totalFloors: 20,
    year: 2022,
    description:
      'Хотын төвд байрлах орчин үеийн өндөр барилга. Гэр бүлд тохиромжтой, дэд бүтэц бүрэн хангагдсан.',
    pros: [
      'Хотын төвд маш ойрхон',
      'Шинэ барилга, чанартай материал',
      'Доод давхарт дэлгүүр, кафе',
      'Газар доорх зогсоолтой',
    ],
    cons: ['Үнэ өндөр', 'Замын түгжрэл их', 'Ногоон байгууламж бага'],
    reviews: [
      {
        id: 'r1',
        author: 'Болор',
        rating: 5,
        comment: 'Байршил гайхалтай, ажилдаа явахад маш ойрхон.',
        date: '2024-11-02',
      },
      {
        id: 'r2',
        author: 'Тэмүүлэн',
        rating: 4,
        comment: 'Барилгын чанар сайн ч үнэ нь нэлээд өндөр санагдсан.',
        date: '2024-09-18',
      },
    ],
  },
  {
    id: 'river-residence',
    name: 'River Residence',
    district: 'Баянгол',
    address: 'Баянгол дүүрэг, 15-р хороо, Үйлдвэрийн районы зам',
    lat: 47.9087,
    lng: 106.8492,
    image: '/apartments/river-residence.png',
    pricePerSqm: 3100000,
    area: 65,
    rooms: 2,
    floor: 6,
    totalFloors: 12,
    year: 2020,
    description:
      'Тайван орчинд байрлах дунд оврын цогцолбор. Залуу гэр бүлд боломжийн үнэтэй сонголт.',
    pros: [
      'Боломжийн үнэ',
      'Тохилог хашаа, тоглоомын талбайтай',
      'Сургууль, цэцэрлэг ойрхон',
    ],
    cons: ['Хотын төвөөс зайтай', 'Нийтийн тээвэр цөөн'],
    reviews: [
      {
        id: 'r3',
        author: 'Сараа',
        rating: 4,
        comment: 'Хүүхэдтэй гэр бүлд тохиромжтой, хашаа нь цэвэрхэн.',
        date: '2024-10-12',
      },
    ],
  },
  {
    id: 'zaisan-tower',
    name: 'Zaisan Tower',
    district: 'Хан-Уул',
    address: 'Хан-Уул дүүрэг, 11-р хороо, Зайсан',
    lat: 47.8869,
    lng: 106.9135,
    image: '/apartments/zaisan-tower.png',
    pricePerSqm: 5600000,
    area: 110,
    rooms: 4,
    floor: 15,
    totalFloors: 25,
    year: 2023,
    description:
      'Зайсан дахь тансаг зэрэглэлийн орон сууц. Уулын болон хотын үзэмжтэй, өндөр чанартай.',
    pros: [
      'Уулын тогтуун, цэвэр агаартай орчин',
      'Тансаг зэрэглэлийн заслал',
      'Фитнес, бассейн зэрэг үйлчилгээтэй',
      'Гайхалтай үзэмж',
    ],
    cons: ['Маш үнэтэй', 'Хотын төвөөс хол', 'Засвар үйлчилгээний төлбөр өндөр'],
    reviews: [
      {
        id: 'r4',
        author: 'Ганбаатар',
        rating: 5,
        comment: 'Агаар нь цэвэр, амьдрахад тав тухтай. Үнэ цэнэтэй.',
        date: '2024-12-01',
      },
      {
        id: 'r5',
        author: 'Номин',
        rating: 4,
        comment: 'Бүх зүйл төгс ч, төвд ажилладаг хүнд зам хол.',
        date: '2024-08-22',
      },
    ],
  },
  {
    id: 'city-center',
    name: 'City Center Apartments',
    district: 'Чингэлтэй',
    address: 'Чингэлтэй дүүрэг, 4-р хороо, Бага тойруу',
    lat: 47.9211,
    lng: 106.9012,
    image: '/apartments/city-center.png',
    pricePerSqm: 3800000,
    area: 58,
    rooms: 2,
    floor: 8,
    totalFloors: 16,
    year: 2019,
    description:
      'Хотын төв хэсэгт байрлах практик орон сууц. Бүх төрлийн үйлчилгээ алхах зайд.',
    pros: ['Төв байршил', 'Дэлгүүр, эмнэлэг ойрхон', 'Нийтийн тээвэр сайн'],
    cons: ['Зогсоол хүрэлцээгүй', 'Шуугиан их', 'Барилга арай хуучирсан'],
    reviews: [
      {
        id: 'r6',
        author: 'Энхжин',
        rating: 3,
        comment: 'Байршил сайн ч зогсоолын асуудал ихтэй.',
        date: '2024-07-30',
      },
    ],
  },
  {
    id: 'green-villa',
    name: 'Green Villa Town',
    district: 'Баянзүрх',
    address: 'Баянзүрх дүүрэг, 26-р хороо, Шар хад',
    lat: 47.9302,
    lng: 106.9645,
    image: '/apartments/green-villa.png',
    pricePerSqm: 2900000,
    area: 92,
    rooms: 3,
    floor: 2,
    totalFloors: 5,
    year: 2021,
    description:
      'Ногоон байгууламж ихтэй намхан давхрын цогцолбор. Чимээгүй, гэр бүлд ээлтэй орчин.',
    pros: [
      'Ногоон байгууламж элбэг',
      'Чимээгүй тайван орчин',
      'Боломжийн үнэ',
      'Өргөн талбай',
    ],
    cons: ['Хотын төвөөс хол', 'Авто машингүй бол төвөгтэй'],
    reviews: [
      {
        id: 'r7',
        author: 'Дэлгэр',
        rating: 5,
        comment: 'Хүүхэд өсгөхөд тохиромжтой, агаар цэвэр.',
        date: '2024-11-20',
      },
    ],
  },
  {
    id: 'student-loft',
    name: 'Student Loft',
    district: 'Сонгинохайрхан',
    address: 'Сонгинохайрхан дүүрэг, 20-р хороо, Гандан',
    lat: 47.9201,
    lng: 106.8602,
    image: '/apartments/student-loft.png',
    pricePerSqm: 2400000,
    area: 42,
    rooms: 1,
    floor: 4,
    totalFloors: 9,
    year: 2018,
    description:
      'Оюутан болон ганц бие хүмүүст зориулсан хямд төсөр орон сууц. Анхны байр авахад тохиромжтой.',
    pros: ['Хамгийн боломжийн үнэ', 'Их сургуулиуд ойрхон', 'Анхны байр авахад тохиромжтой'],
    cons: ['Талбай жижиг', 'Барилга хуучин', 'Дуу чимээ дотогшоо нэвтэрдэг'],
    reviews: [
      {
        id: 'r8',
        author: 'Анхбаяр',
        rating: 4,
        comment: 'Оюутны төсөвт яг таарсан. Сургуульдаа алхаад очдог.',
        date: '2024-09-05',
      },
    ],
  },
]

export function getApartment(id: string): Apartment | undefined {
  return apartments.find((a) => a.id === id)
}

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function formatMnt(value: number): string {
  return new Intl.NumberFormat('mn-MN').format(value) + '₮'
}

export function formatMntCompact(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + ' сая₮'
  }
  return new Intl.NumberFormat('mn-MN').format(value) + '₮'
}
