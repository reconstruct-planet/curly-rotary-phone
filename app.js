const STORAGE_KEY = "nutri-day-records-v3";
const SETTINGS_KEY = "nutri-day-settings-v3";
const LAST_MEAL_TYPE_KEY = "ethan-health-last-meal-type-v1";
const FOOD_TRANSLATION_KEY = "ethan-health-food-translations-v1";
const LEGACY_KEYS = ["nutri-day-records-v2", "nutri-day-records-v1"];
const LEGACY_SETTING_KEYS = ["nutri-day-settings-v2", "nutri-day-settings-v1"];
const AUTH_USERS_KEY = "ethan-health-users-v1";
const AUTH_SESSION_KEY = "ethan-health-session-v1";
const AUTH_MIGRATION_KEY = "ethan-health-user-migration-v1";
const AUTH_ATTEMPTS_KEY = "ethan-health-login-attempts-v1";
const AUTH_ITERATIONS = 210000;
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;
const LOGIN_LOCK_MS = 1000 * 60 * 5;
const MAX_LOGIN_ATTEMPTS = 5;

const defaultSettings = {
  calories: 2100,
  protein: 90,
  carbs: 260,
  fat: 70,
  fiber: 25,
  sugar: 50,
  sodium: 2300,
  water: 2,
  height: 170,
  weight: 70,
  goalWeight: 65,
  bodyShape: "balanced",
  fastingStart: "20:00",
  fastingHours: 14,
  mealTargets: { breakfast: 25, lunch: 35, dinner: 30, snack: 10 },
  favorites: [],
};

const foodDb = [
  food("현미밥", ["brown rice", "밥"], 165, 35, 3.5, 1.2, 2.2, 0.4, 5, "100g", "Rice"),
  food("흰쌀밥", ["white rice", "쌀밥", "공기밥"], 150, 33, 2.7, 0.3, 0.4, 0.1, 3, "100g", "Rice"),
  food("김치찌개", ["kimchi stew"], 360, 18, 22, 22, 4, 7, 1450, "1인분", "Kimchi"),
  food("된장찌개", ["soybean paste stew"], 240, 20, 16, 11, 5, 6, 1250, "1인분", "Miso"),
  food("닭가슴살", ["chicken breast", "chicken"], 165, 0, 31, 3.6, 0, 0, 74, "100g", "Chicken Breast"),
  food("연어구이", ["salmon", "grilled salmon"], 280, 0, 32, 16, 0, 0, 85, "1인분", "Salmon"),
  food("계란", ["egg", "eggs"], 78, 0.6, 6.3, 5.3, 0, 0.4, 62, "1개", "Eggs"),
  food("그릭요거트", ["greek yogurt", "yogurt"], 150, 8, 15, 5, 0, 6, 60, "1컵", "Greek Yogurt"),
  food("샐러드", ["salad"], 170, 14, 7, 10, 6, 5, 280, "1접시", "Salad"),
  food("바나나", ["banana"], 105, 27, 1.3, 0.4, 3.1, 14, 1, "1개", "Banana"),
  food("사과", ["apple"], 95, 25, 0.5, 0.3, 4.4, 19, 2, "1개", "Apple"),
  food("라면", ["ramen", "instant noodles"], 500, 78, 10, 17, 3, 4, 1790, "1봉", "Noodles"),
  food("떡볶이", ["tteokbokki", "spicy rice cake"], 420, 82, 9, 7, 3, 17, 1050, "1인분", "Rice Cake"),
  food("김밥", ["gimbap", "kimbap"], 460, 72, 14, 13, 5, 8, 960, "1줄", "Sushi"),
  food("아메리카노", ["americano", "coffee"], 10, 2, 0, 0, 0, 0, 5, "1잔", "Coffee"),
  food("우유", ["milk"], 130, 12, 8, 5, 0, 12, 105, "1컵", "Milk"),
  food("두부", ["tofu"], 180, 5, 20, 10, 2, 1, 15, "1모", "Tofu"),
  food("고구마", ["sweet potato"], 180, 41, 2, 0.2, 6, 13, 70, "1개", "Sweet Potato"),
  food("아보카도", ["avocado"], 240, 13, 3, 22, 10, 1, 11, "1개", "Avocado"),
  food("불고기", ["bulgogi"], 430, 20, 32, 25, 2, 12, 920, "1인분", "Beef"),
  food("비빔밥", ["bibimbap"], 620, 92, 21, 18, 8, 12, 1180, "1그릇", "Bibimbap"),
  food("파스타", ["pasta"], 560, 82, 18, 17, 5, 8, 760, "1접시", "Pasta"),
  food("피자", ["pizza"], 285, 36, 12, 10, 2.5, 4, 640, "1조각", "Pizza"),
  food("햄버거", ["hamburger", "burger"], 520, 48, 25, 27, 3, 9, 980, "1개", "Burger"),
  food("감자튀김", ["french fries", "fries"], 365, 48, 4, 17, 4, 0.5, 246, "1중간", "French Fries"),
  food("오트밀", ["oatmeal", "oats"], 190, 33, 7, 3.5, 5, 1, 2, "1그릇", "Oats"),
  food("견과류", ["nuts", "almond"], 170, 6, 6, 15, 3, 1.2, 1, "30g", "Almond"),
  food("프로틴쉐이크", ["protein shake", "protein"], 160, 8, 25, 3, 1, 3, 180, "1잔", "Protein"),
  food("스테이크", ["steak"], 420, 0, 42, 28, 0, 0, 120, "1인분", "Steak"),
  food("블루베리", ["blueberry"], 84, 21, 1.1, 0.5, 3.6, 15, 1, "1컵", "Blueberry"),
  food("통밀빵", ["whole wheat bread", "wholegrain bread", "wheat bread"], 247, 41, 13, 4.2, 7, 5.6, 450, "100g", "Bread"),
  food("식빵", ["white bread", "bread"], 265, 49, 9, 3.2, 2.7, 5, 491, "100g", "Bread"),
  food("토마토", ["tomato", "tomatoes"], 18, 3.9, 0.9, 0.2, 1.2, 2.6, 5, "100g", "Tomato"),
  food("방울토마토", ["cherry tomato", "cherry tomatoes"], 18, 3.9, 0.9, 0.2, 1.2, 2.6, 5, "100g", "Tomato"),
  food("오이", ["cucumber"], 15, 3.6, 0.7, 0.1, 0.5, 1.7, 2, "100g", "Cucumber"),
  food("양파", ["onion"], 40, 9.3, 1.1, 0.1, 1.7, 4.2, 4, "100g", "Onion"),
  food("당근", ["carrot"], 41, 9.6, 0.9, 0.2, 2.8, 4.7, 69, "100g", "Carrot"),
  food("브로콜리", ["broccoli"], 34, 6.6, 2.8, 0.4, 2.6, 1.7, 33, "100g", "Broccoli"),
  food("양배추", ["cabbage"], 25, 5.8, 1.3, 0.1, 2.5, 3.2, 18, "100g", "Cabbage"),
  food("상추", ["lettuce"], 15, 2.9, 1.4, 0.2, 1.3, 0.8, 28, "100g", "Lettuce"),
  food("시금치", ["spinach"], 23, 3.6, 2.9, 0.4, 2.2, 0.4, 79, "100g", "Spinach"),
  food("버섯", ["mushroom", "mushrooms"], 22, 3.3, 3.1, 0.3, 1, 2, 5, "100g", "Mushroom"),
  food("감자", ["potato"], 77, 17, 2, 0.1, 2.2, 0.8, 6, "100g", "Potato"),
  food("딸기", ["strawberry", "strawberries"], 32, 7.7, 0.7, 0.3, 2, 4.9, 1, "100g", "Strawberry"),
  food("포도", ["grape", "grapes"], 69, 18, 0.7, 0.2, 0.9, 15.5, 2, "100g", "Grapes"),
  food("배", ["pear"], 57, 15, 0.4, 0.1, 3.1, 9.8, 1, "100g", "Pear"),
  food("복숭아", ["peach"], 39, 9.5, 0.9, 0.3, 1.5, 8.4, 0, "100g", "Peach"),
];

const exerciseDb = {
  "걷기": { met: 3.3, aliases: ["walking"] },
  "빠르게 걷기": { met: 4.3, aliases: ["brisk walking"] },
  "러닝": { met: 8.3, aliases: ["running", "run"] },
  "자전거": { met: 6.8, aliases: ["cycling", "bike"] },
  "수영": { met: 6, aliases: ["swimming"] },
  "근력운동": { met: 3.8, aliases: ["weight training", "weights"] },
  "요가": { met: 2.5, aliases: ["yoga"] },
  "필라테스": { met: 3, aliases: ["pilates"] },
  "등산": { met: 6, aliases: ["hiking"] },
  "계단": { met: 8.8, aliases: ["stairs"] },
  "줄넘기": { met: 11.8, aliases: ["jump rope"] },
  "축구": { met: 7, aliases: ["soccer"] },
  "농구": { met: 6.5, aliases: ["basketball"] },
  "테니스": { met: 7.3, aliases: ["tennis"] },
  "스트레칭": { met: 2.3, aliases: ["stretching"] },
};

const mealLabels = { breakfast: "아침", lunch: "점심", dinner: "저녁", snack: "간식" };
const mealKeys = { "아침": "breakfast", "점심": "lunch", "저녁": "dinner", "간식": "snack" };
const mealOrder = ["아침", "점심", "저녁", "간식"];
const quickFoods = ["현미밥", "통밀빵", "닭가슴살", "토마토", "샐러드", "계란", "김치찌개", "라면", "고구마", "그릭요거트", "비빔밥", "프로틴쉐이크"];
const quickExercises = ["걷기", "러닝", "자전거", "수영", "근력운동", "요가", "등산", "줄넘기"];
const bodyShapeProfiles = {
  balanced: { label: "균형형", proteinPerKg: 1.5, fatRatio: 0.28, calorieBias: 0, note: "지속 가능한 균형과 체중 유지/완만한 변화에 맞춥니다." },
  lean: { label: "슬림 탄탄형", proteinPerKg: 1.7, fatRatio: 0.25, calorieBias: -0.08, note: "체지방을 줄이면서 근손실을 막는 쪽으로 단백질을 높입니다." },
  muscular: { label: "근육질", proteinPerKg: 2.0, fatRatio: 0.27, calorieBias: 0.08, note: "근육 증가를 위해 단백질과 훈련 에너지를 넉넉하게 둡니다." },
  athletic: { label: "운동선수형", proteinPerKg: 1.8, fatRatio: 0.25, calorieBias: 0.04, note: "운동 수행을 위해 탄수화물 예산을 충분히 확보합니다." },
  fatLoss: { label: "체지방 감량형", proteinPerKg: 1.9, fatRatio: 0.24, calorieBias: -0.15, note: "감량 폭을 만들되 포만감과 회복을 우선합니다." },
};
const searchTranslations = {
  "토마토": "tomato raw",
  "방울토마토": "cherry tomatoes raw",
  "양파": "onion raw",
  "마늘": "garlic raw",
  "오이": "cucumber raw",
  "당근": "carrot raw",
  "감자": "potato raw",
  "양배추": "cabbage raw",
  "브로콜리": "broccoli raw",
  "상추": "lettuce raw",
  "시금치": "spinach raw",
  "버섯": "mushroom raw",
  "딸기": "strawberries raw",
  "포도": "grapes raw",
  "배": "pear raw",
  "복숭아": "peach raw",
  "닭다리살": "chicken thigh raw",
  "소고기": "beef raw",
  "돼지고기": "pork raw",
  "통밀빵": "whole wheat bread",
  "통곡물빵": "whole grain bread",
  "호밀빵": "rye bread",
  "식빵": "white bread",
  "빵": "bread",
  "베이글": "bagel",
  "치아바타": "ciabatta bread",
  "바게트": "baguette",
  "크루아상": "croissant",
  "귀리": "oats raw",
  "렌틸콩": "lentils cooked",
  "병아리콩": "chickpeas cooked",
  "검은콩": "black beans cooked",
  "콩": "soybeans cooked",
  "완두콩": "peas green cooked",
  "퀴노아": "quinoa cooked",
  "아몬드": "almonds",
  "호두": "walnuts",
  "캐슈넛": "cashew nuts",
  "피스타치오": "pistachio nuts",
  "땅콩": "peanuts",
  "올리브오일": "olive oil",
  "버터": "butter",
  "치즈": "cheese",
  "모짜렐라": "mozzarella cheese",
  "체다치즈": "cheddar cheese",
  "참치": "tuna",
  "고등어": "mackerel",
  "새우": "shrimp",
  "오징어": "squid",
  "대구": "cod fish",
  "닭다리": "chicken leg",
  "닭날개": "chicken wing",
  "닭안심": "chicken tenderloin",
  "오리고기": "duck meat",
  "양고기": "lamb",
  "메밀면": "buckwheat noodles",
  "우동": "udon noodles",
  "소바": "soba noodles",
  "국수": "noodles cooked",
  "만두": "dumplings",
  "김": "seaweed laver",
  "미역": "seaweed wakame",
  "아스파라거스": "asparagus",
  "가지": "eggplant",
  "애호박": "zucchini",
  "호박": "pumpkin",
  "파프리카": "bell pepper",
  "피망": "bell pepper",
  "고추": "chili pepper",
  "케일": "kale",
  "콩나물": "soybean sprouts",
  "숙주": "mung bean sprouts",
  "무": "radish",
  "파": "green onion",
  "대파": "green onion",
  "바질": "basil",
  "레몬": "lemon",
  "라임": "lime",
  "오렌지": "orange",
  "키위": "kiwi fruit",
  "망고": "mango",
  "파인애플": "pineapple",
  "수박": "watermelon",
  "멜론": "melon",
  "자두": "plum",
  "체리": "cherries",
};

const medicationKnowledge = {
  "비타민d": {
    displayName: "비타민 D",
    aliases: ["vitamin d", "cholecalciferol", "calciferol"],
    ingredients: "비타민 D2 또는 D3",
    effects: "칼슘 흡수와 뼈 건강 유지에 관여합니다.",
    sideEffects: "과다 섭취 시 고칼슘혈증, 메스꺼움, 구토, 신장 문제 위험이 있습니다.",
    interactions: ["칼슘", "orlistat", "cholestyramine", "스테로이드", "digoxin"],
  },
  "오메가3": {
    displayName: "오메가-3",
    aliases: ["omega 3", "fish oil", "epa", "dha"],
    ingredients: "EPA, DHA 등 오메가-3 지방산",
    effects: "중성지방 관리와 심혈관 건강 보조 목적으로 사용됩니다.",
    sideEffects: "비린 트림, 위장 불편, 고용량 복용 시 출혈 위험 증가 가능성이 있습니다.",
    interactions: ["warfarin", "aspirin", "clopidogrel", "항응고제", "아스피린"],
  },
  "마그네슘": {
    displayName: "마그네슘",
    aliases: ["magnesium"],
    ingredients: "마그네슘염",
    effects: "근육 기능, 신경 기능, 에너지 대사에 관여합니다.",
    sideEffects: "설사, 복부 불편이 생길 수 있고 신장 질환이 있으면 주의가 필요합니다.",
    interactions: ["철분", "칼슘", "levothyroxine", "bisphosphonate", "항생제"],
  },
  "철분": {
    displayName: "철분",
    aliases: ["iron", "ferrous"],
    ingredients: "철 염류",
    effects: "철 결핍과 빈혈 관리에 사용됩니다.",
    sideEffects: "변비, 속쓰림, 검은 변이 생길 수 있습니다.",
    interactions: ["칼슘", "마그네슘", "levothyroxine", "항생제", "커피"],
  },
  "칼슘": {
    displayName: "칼슘",
    aliases: ["calcium"],
    ingredients: "칼슘염",
    effects: "뼈와 치아 건강 유지에 관여합니다.",
    sideEffects: "변비, 복부 팽만이 생길 수 있고 과다 섭취 시 결석 위험이 있습니다.",
    interactions: ["철분", "마그네슘", "비타민 D", "levothyroxine", "항생제"],
  },
  "비타민c": {
    displayName: "비타민 C",
    aliases: ["vitamin c", "ascorbic acid"],
    ingredients: "아스코르브산",
    effects: "항산화 작용과 콜라겐 형성에 관여합니다.",
    sideEffects: "고용량 섭취 시 속쓰림, 설사, 결석 위험 증가 가능성이 있습니다.",
    interactions: ["철분", "알루미늄 제산제"],
  },
  "아연": {
    displayName: "아연",
    aliases: ["zinc"],
    ingredients: "아연염",
    effects: "면역 기능과 상처 회복에 관여합니다.",
    sideEffects: "메스꺼움, 구리 결핍 위험이 있을 수 있습니다.",
    interactions: ["철분", "구리", "항생제"],
  },
  "유산균": {
    displayName: "유산균",
    aliases: ["probiotic", "probiotics"],
    ingredients: "Lactobacillus, Bifidobacterium 등",
    effects: "장 건강과 배변 리듬 보조 목적으로 사용됩니다.",
    sideEffects: "가스, 복부 팽만이 생길 수 있고 면역저하 상태에서는 주의가 필요합니다.",
    interactions: ["항생제", "면역억제제"],
  },
  "타이레놀": {
    displayName: "타이레놀",
    aliases: ["acetaminophen", "paracetamol"],
    ingredients: "아세트아미노펜",
    effects: "해열과 진통에 사용됩니다.",
    sideEffects: "과량 복용 또는 음주와 병행 시 간 손상 위험이 있습니다.",
    interactions: ["alcohol", "warfarin", "간독성 약물"],
  },
  "이부프로펜": {
    displayName: "이부프로펜",
    aliases: ["ibuprofen", "advil", "motrin"],
    ingredients: "이부프로펜",
    effects: "통증, 염증, 발열 완화에 사용되는 NSAID입니다.",
    sideEffects: "속쓰림, 위장 출혈, 신장 부담, 혈압 상승 가능성이 있습니다.",
    interactions: ["aspirin", "warfarin", "clopidogrel", "혈압약", "스테로이드"],
  },
  "아스피린": {
    displayName: "아스피린",
    aliases: ["aspirin"],
    ingredients: "아세틸살리실산",
    effects: "진통/해열 또는 항혈소판 목적으로 사용됩니다.",
    sideEffects: "위장 출혈, 멍, 알레르기 반응 가능성이 있습니다.",
    interactions: ["warfarin", "clopidogrel", "omega 3", "오메가3", "이부프로펜"],
  },
  "피라세탐": {
    displayName: "피라세탐",
    aliases: ["piracetam", "nootropil"],
    ingredients: "Piracetam",
    effects: "일부 국가에서 피질성 근간대경련, 인지기능 관련 증상 등에 처방될 수 있으나 국가별 승인 적응증이 다릅니다.",
    effectsKo: "일부 국가에서 피질성 근간대경련, 인지기능 관련 증상 등에 처방될 수 있으나 국가별 승인 적응증이 다릅니다.",
    effectsEn: "In some countries, piracetam may be prescribed for conditions such as cortical myoclonus or cognitive-related symptoms, but approved indications vary by country.",
    sideEffects: "불면, 신경과민, 두통, 졸림, 위장 불편, 체중 변화 등이 보고될 수 있습니다.",
    sideEffectsKo: "불면, 신경과민, 두통, 졸림, 위장 불편, 체중 변화 등이 보고될 수 있습니다.",
    sideEffectsEn: "Reported adverse effects may include insomnia, nervousness, headache, sleepiness, gastrointestinal discomfort, and weight changes.",
    interactions: ["warfarin", "아스피린", "clopidogrel", "항응고제", "항혈소판", "thyroid extract"],
    interactionsKo: ["항응고제/항혈소판 계열과 병용 시 출혈 경향을 확인하세요.", "갑상샘 관련 약물과 병용 중이면 처방자에게 확인하세요."],
    interactionsEn: ["Check bleeding risk when combined with anticoagulant or antiplatelet therapy.", "Confirm with a prescriber if used with thyroid-related medication."],
  },
};

const medicationNameTranslations = {
  "피라세탐": ["piracetam", "nootropil"],
  "아세트아미노펜": ["acetaminophen", "paracetamol"],
  "파라세타몰": ["paracetamol", "acetaminophen"],
  "이부프로펜": ["ibuprofen"],
  "덱시부프로펜": ["dexibuprofen"],
  "나프록센": ["naproxen"],
  "아스피린": ["aspirin", "acetylsalicylic acid"],
  "세티리진": ["cetirizine"],
  "로라타딘": ["loratadine"],
  "펙소페나딘": ["fexofenadine"],
  "디펜히드라민": ["diphenhydramine"],
  "독시라민": ["doxylamine"],
  "멜라토닌": ["melatonin"],
  "메트포르민": ["metformin"],
  "암로디핀": ["amlodipine"],
  "로사르탄": ["losartan"],
  "발사르탄": ["valsartan"],
  "아토르바스타틴": ["atorvastatin"],
  "로수바스타틴": ["rosuvastatin"],
  "심바스타틴": ["simvastatin"],
  "오메프라졸": ["omeprazole"],
  "에스오메프라졸": ["esomeprazole"],
  "판토프라졸": ["pantoprazole"],
  "파모티딘": ["famotidine"],
  "아목시실린": ["amoxicillin"],
  "아지트로마이신": ["azithromycin"],
  "독시사이클린": ["doxycycline"],
  "세프트리악손": ["ceftriaxone"],
  "레보티록신": ["levothyroxine"],
  "와파린": ["warfarin"],
  "클로피도그렐": ["clopidogrel"],
  "플루옥세틴": ["fluoxetine"],
  "세르트랄린": ["sertraline"],
  "에스시탈로프람": ["escitalopram"],
  "알프라졸람": ["alprazolam"],
  "졸피뎀": ["zolpidem"],
  "가바펜틴": ["gabapentin"],
  "프레가발린": ["pregabalin"],
  "트라마돌": ["tramadol"],
  "실데나필": ["sildenafil"],
  "타다라필": ["tadalafil"],
  "피나스테리드": ["finasteride"],
  "두타스테리드": ["dutasteride"],
  "미녹시딜": ["minoxidil"],
};

let activeMedicationInfo = null;
let medicationInfoLanguage = "ko";
let medicationLookupTimer = 0;
let medicationLookupToken = 0;
let medicationTranslationCache = load("ethan-health-med-translations-v1", {});

let currentUser = null;
let records = {};
let settings = { ...defaultSettings };
let lastMealTypeState = { date: "", mealType: "아침" };
let foodTranslationCache = load(FOOD_TRANSLATION_KEY, {});
let appStarted = false;

let currentDate = toDateInputValue(new Date());
let lastSeenToday = currentDate;
let selectedPhoto = "";
let autoPhoto = "";
let activeFoodBase = null;
let activeFoodSource = "";
let lookupToken = 0;
let lookupTimer = 0;
let toastTimer = 0;

const $ = (selector) => document.querySelector(selector);

function food(name, aliases, calories, carbs, protein, fat, fiber, sugar, sodium, unit, imageQuery) {
  return { name, aliases, calories, carbs, protein, fat, fiber, sugar, sodium, unit, imageQuery };
}

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function loadFirst(key, legacyKeys, fallback) {
  const current = load(key, null);
  if (current) return current;
  for (const legacyKey of legacyKeys) {
    const legacy = load(legacyKey, null);
    if (legacy) return legacy;
  }
  return fallback;
}

function userStorageKey(key) {
  if (!currentUser?.id) return key;
  return `ethan-health-user-${currentUser.id}-${key}`;
}

function loadUserData() {
  records = loadFirst(userStorageKey(STORAGE_KEY), [], {});
  settings = { ...defaultSettings, ...loadFirst(userStorageKey(SETTINGS_KEY), [], {}) };
  settings.mealTargets = { ...defaultSettings.mealTargets, ...(settings.mealTargets || {}) };
  settings.favorites = Array.isArray(settings.favorites) ? settings.favorites : [];
  lastMealTypeState = load(userStorageKey(LAST_MEAL_TYPE_KEY), { date: "", mealType: "아침" });
  migrateLegacyDataToUser();
}

function migrateLegacyDataToUser() {
  if (!currentUser?.id) return;
  const migrated = load(AUTH_MIGRATION_KEY, {});
  if (migrated.claimedBy || migrated[currentUser.id]) return;
  const legacyRecords = loadFirst(STORAGE_KEY, LEGACY_KEYS, null);
  const legacySettings = loadFirst(SETTINGS_KEY, LEGACY_SETTING_KEYS, null);
  if (legacyRecords && !Object.keys(records).length) records = legacyRecords;
  if (legacySettings) {
    settings = { ...defaultSettings, ...settings, ...legacySettings };
    settings.mealTargets = { ...defaultSettings.mealTargets, ...(settings.mealTargets || {}) };
    settings.favorites = Array.isArray(settings.favorites) ? settings.favorites : [];
  }
  migrated[currentUser.id] = true;
  migrated.claimedBy = currentUser.id;
  localStorage.setItem(AUTH_MIGRATION_KEY, JSON.stringify(migrated));
  save();
}

function save() {
  if (!currentUser?.id) return;
  localStorage.setItem(userStorageKey(STORAGE_KEY), JSON.stringify(records));
  localStorage.setItem(userStorageKey(SETTINGS_KEY), JSON.stringify(settings));
  localStorage.setItem(userStorageKey(LAST_MEAL_TYPE_KEY), JSON.stringify(lastMealTypeState));
}

function toDateInputValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function dateLabel(value) {
  return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" }).format(new Date(`${value}T12:00:00`));
}

function getDay(date = currentDate) {
  if (!records[date]) records[date] = {};
  if (!Array.isArray(records[date].meals)) records[date].meals = [];
  if (!Array.isArray(records[date].exercises)) records[date].exercises = [];
  if (!Array.isArray(records[date].medications)) records[date].medications = [];
  if (!records[date].checkin) records[date].checkin = {};
  if (!Number.isFinite(Number(records[date].water))) records[date].water = 0;
  return records[date];
}

function number(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function round(value, digits = 0) {
  return Number(value || 0).toFixed(digits).replace(/\.0$/, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeUsername(value) {
  return normalize(value).replace(/\s+/g, "");
}

function bytesToBase64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function passwordHash(password, saltBase64) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: base64ToBytes(saltBase64),
      iterations: AUTH_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );
  return bytesToBase64(new Uint8Array(bits));
}

function loadUsers() {
  const users = load(AUTH_USERS_KEY, {});
  return users && typeof users === "object" ? users : {};
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function loginAttemptState(userId) {
  const attempts = load(AUTH_ATTEMPTS_KEY, {});
  const entry = attempts[userId] || { count: 0, lockedUntil: 0 };
  return { attempts, entry };
}

function isLoginLocked(userId) {
  const { entry } = loginAttemptState(userId);
  return number(entry.lockedUntil) > Date.now();
}

function registerFailedLogin(userId) {
  const { attempts, entry } = loginAttemptState(userId);
  const count = number(entry.count) + 1;
  attempts[userId] = {
    count,
    lockedUntil: count >= MAX_LOGIN_ATTEMPTS ? Date.now() + LOGIN_LOCK_MS : 0,
  };
  localStorage.setItem(AUTH_ATTEMPTS_KEY, JSON.stringify(attempts));
  return attempts[userId];
}

function clearLoginAttempts(userId) {
  const attempts = load(AUTH_ATTEMPTS_KEY, {});
  delete attempts[userId];
  localStorage.setItem(AUTH_ATTEMPTS_KEY, JSON.stringify(attempts));
}

function setAuthMessage(message, type = "") {
  const node = $("#authMessage");
  if (!node) return;
  node.textContent = message;
  node.classList.toggle("error", type === "error");
  node.classList.toggle("success", type === "success");
}

function setAuthBusy(isBusy) {
  const form = $("#authForm");
  form.classList.toggle("is-busy", isBusy);
  form.setAttribute("aria-busy", String(isBusy));
  $("#loginBtn").disabled = isBusy;
  $("#registerBtn").disabled = isBusy;
}

function notify(message, type = "success") {
  const toast = $("#toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle("success", type === "success");
  toast.classList.toggle("error", type === "error");
  toast.hidden = false;
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3400);
}

function askConfirm(message, title = "확인") {
  const dialog = $("#confirmDialog");
  if (!dialog || typeof dialog.showModal !== "function") return Promise.resolve(confirm(message));
  $("#confirmTitle").textContent = title;
  $("#confirmMessage").textContent = message;
  return new Promise((resolve) => {
    const handleClose = () => {
      dialog.removeEventListener("close", handleClose);
      resolve(dialog.returnValue === "ok");
    };
    dialog.addEventListener("close", handleClose);
    dialog.showModal();
  });
}

function validateCredentials(username, password) {
  const id = normalizeUsername(username);
  if (!/^[a-z0-9._-]{3,32}$/i.test(id)) return "아이디는 영문, 숫자, 점, 밑줄, 하이픈 조합 3-32자로 입력하세요.";
  if (password.length < 8) return "패스워드는 8자 이상이어야 합니다.";
  return "";
}

function persistSession(user) {
  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
    userId: user.id,
    expiresAt: Date.now() + SESSION_TTL_MS,
  }));
}

function clearSession() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
}

function updateAccountChrome() {
  $("#accountName").textContent = currentUser?.username || "-";
}

function startAuthenticatedApp(user) {
  currentUser = user;
  persistSession(user);
  loadUserData();
  currentDate = toDateInputValue(new Date());
  lastSeenToday = currentDate;
  $("#authScreen").hidden = true;
  $("#appShell").hidden = false;
  updateAccountChrome();
  if (!appStarted) {
    init();
    appStarted = true;
    return;
  }
  resetMealForm();
  renderMedicationLookup(null, [], "한국어/영문 이름을 입력하면 성분/효과/주의사항을 검색합니다.");
  renderMedicationLanguageButtons();
  switchTab("diet");
  render();
}

async function registerAccount() {
  const username = $("#authUsername").value.trim();
  const password = $("#authPassword").value;
  const issue = validateCredentials(username, password);
  if (issue) {
    setAuthMessage(issue, "error");
    return;
  }
  const users = loadUsers();
  const id = normalizeUsername(username);
  if (users[id]) {
    setAuthMessage("이미 존재하는 아이디입니다. 로그인해 주세요.", "error");
    return;
  }
  setAuthMessage("계정을 안전하게 만드는 중입니다...");
  setAuthBusy(true);
  try {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    const saltBase64 = bytesToBase64(salt);
    users[id] = {
      id,
      username,
      salt: saltBase64,
      hash: await passwordHash(password, saltBase64),
      iterations: AUTH_ITERATIONS,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    saveUsers(users);
    setAuthMessage("계정이 생성되었습니다.", "success");
    startAuthenticatedApp(users[id]);
    notify(`${username} 계정으로 시작합니다.`);
  } catch {
    setAuthMessage("계정을 만들지 못했습니다. 브라우저 보안 저장소를 확인해 주세요.", "error");
  } finally {
    setAuthBusy(false);
  }
}

async function loginAccount(event) {
  event?.preventDefault();
  const username = $("#authUsername").value.trim();
  const password = $("#authPassword").value;
  const issue = validateCredentials(username, password);
  if (issue) {
    setAuthMessage(issue, "error");
    return;
  }
  const users = loadUsers();
  const id = normalizeUsername(username);
  if (isLoginLocked(id)) {
    setAuthMessage("로그인 시도가 많습니다. 5분 후 다시 시도하세요.", "error");
    return;
  }
  const user = users[id];
  if (!user) {
    registerFailedLogin(id);
    setAuthMessage("아이디 또는 패스워드가 올바르지 않습니다.", "error");
    return;
  }
  setAuthMessage("로그인 확인 중입니다...");
  setAuthBusy(true);
  try {
    const hash = await passwordHash(password, user.salt);
    if (!constantTimeEqual(hash, user.hash)) {
      const attempt = registerFailedLogin(id);
      if (attempt.lockedUntil) {
        setAuthMessage("로그인 시도가 많습니다. 5분 후 다시 시도하세요.", "error");
        return;
      }
      setAuthMessage("아이디 또는 패스워드가 올바르지 않습니다.", "error");
      return;
    }
    clearLoginAttempts(id);
    user.lastLoginAt = new Date().toISOString();
    users[id] = user;
    saveUsers(users);
    startAuthenticatedApp(user);
    notify(`${user.username} 계정으로 로그인했습니다.`);
  } catch {
    setAuthMessage("로그인 처리 중 문제가 발생했습니다. 다시 시도해 주세요.", "error");
  } finally {
    setAuthBusy(false);
  }
}

function logoutAccount() {
  clearSession();
  currentUser = null;
  records = {};
  settings = { ...defaultSettings };
  lastMealTypeState = { date: "", mealType: "아침" };
  selectedPhoto = "";
  autoPhoto = "";
  activeFoodBase = null;
  activeFoodSource = "";
  $("#appShell").hidden = true;
  $("#authScreen").hidden = false;
  $("#authPassword").value = "";
  setAuthMessage("로그아웃되었습니다.", "success");
  notify("로그아웃되었습니다.");
}

function restoreSession() {
  const session = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY));
    } catch {
      return null;
    }
  })();
  if (!session?.userId || number(session.expiresAt) < Date.now()) {
    clearSession();
    return false;
  }
  const user = loadUsers()[session.userId];
  if (!user) {
    clearSession();
    return false;
  }
  startAuthenticatedApp(user);
  return true;
}

function initAuth() {
  $("#authForm").addEventListener("submit", loginAccount);
  $("#registerBtn").addEventListener("click", registerAccount);
  if (!restoreSession()) {
    $("#authScreen").hidden = false;
    $("#appShell").hidden = true;
  }
}

function uniqueValues(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normalize(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeMedicineName(value) {
  return normalize(value).replace(/[()\[\]{}.,/\\_\-\s]/g, "");
}

function romanizeHangul(value) {
  const initials = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  const vowels = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  const finals = ["", "k", "k", "ks", "n", "nj", "nh", "t", "l", "lk", "lm", "lb", "ls", "lt", "lp", "lh", "m", "p", "ps", "t", "t", "ng", "t", "t", "k", "t", "p", "h"];
  return String(value || "").split("").map((char) => {
    const code = char.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) return /[a-z0-9]/i.test(char) ? char : " ";
    const initial = Math.floor(code / 588);
    const vowel = Math.floor((code % 588) / 28);
    const final = code % 28;
    return `${initials[initial]}${vowels[vowel]}${finals[final]}`;
  }).join("").replace(/\s+/g, " ").trim();
}

function romanizationVariants(value) {
  const base = romanizeHangul(value).toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (!base) return [];
  const variants = new Set([base, base.replace(/\s+/g, "")]);
  const transforms = [
    (text) => text.replace(/se/g, "ce"),
    (text) => text.replace(/si/g, "ci"),
    (text) => text.replace(/ji/g, "zi"),
    (text) => text.replace(/([bcdfghjklmnpqrstvwxyz])eu/g, "$1"),
    (text) => text.replace(/peu/g, "p").replace(/beu/g, "b").replace(/teu/g, "t").replace(/deu/g, "d").replace(/keu/g, "c").replace(/reu/g, "r"),
    (text) => text.replace(/pen/g, "phen").replace(/setam/g, "cetam").replace(/porin/g, "porine"),
  ];
  for (const transform of transforms) {
    Array.from(variants).forEach((variant) => variants.add(transform(variant)));
  }
  return Array.from(variants).filter((term) => term.length >= 3).slice(0, 10);
}

function translatedMedicationTerms(query) {
  const q = normalizeMedicineName(query);
  const direct = [];
  for (const [koreanName, terms] of Object.entries(medicationNameTranslations)) {
    const key = normalizeMedicineName(koreanName);
    const normalizedTerms = terms.map(normalizeMedicineName);
    if (key === q || key.includes(q) || q.includes(key) || normalizedTerms.some((term) => term === q || term.includes(q) || q.includes(term))) {
      direct.push(...terms, koreanName);
    }
  }
  const romanized = /[가-힣]/.test(query) ? romanizationVariants(query) : [];
  return uniqueValues([...direct, ...romanized]);
}

function cloneMedicationInfo(info, source = "기본 지식") {
  if (!info) return null;
  return {
    ...info,
    aliases: [...(info.aliases || [])],
    interactions: [...(info.interactions || [])],
    source: info.source || source,
  };
}

function localMedicationInfo(query) {
  const q = normalizeMedicineName(query);
  if (!q) return null;
  for (const [key, info] of Object.entries(medicationKnowledge)) {
    const terms = [key, info.displayName, ...(info.aliases || [])].map(normalizeMedicineName);
    if (terms.some((term) => term === q || (q.length >= 3 && (term.includes(q) || q.includes(term))))) {
      return cloneMedicationInfo(info);
    }
  }
  return null;
}

function shortenText(value, max = 260) {
  const text = (Array.isArray(value) ? value.join(" ") : String(value || "")).replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function hasKoreanText(value) {
  return /[가-힣]/.test(String(value || ""));
}

function shouldTranslateToKorean(value) {
  const text = String(value || "").trim();
  return text.length >= 12 && !hasKoreanText(text) && /[A-Za-z]{3,}/.test(text);
}

function isGeneratedKoreanPlaceholder(value) {
  return /영문 탭|영문 데이터|자동 번역 준비|외부 의약품\/화합물|원문은/.test(String(value || ""));
}

function glossaryKoreanTranslation(text, field = "effects", displayName = "") {
  let translated = shortenText(text, field === "interactions" ? 360 : 320);
  const replacements = [
    [/\bconsult a doctor or pharmacist\b/gi, "의사 또는 약사와 상담하세요"],
    [/\bconsult your doctor or pharmacist\b/gi, "담당 의사 또는 약사와 상담하세요"],
    [/\bindications? and usage\b/gi, "적응증 및 사용"],
    [/\bcontraindications?\b/gi, "금기"],
    [/\badverse reactions?\b/gi, "이상반응"],
    [/\bside effects?\b/gi, "부작용"],
    [/\bdrug interactions?\b/gi, "약물 상호작용"],
    [/\bwarnings?\b/gi, "경고"],
    [/\bprecautions?\b/gi, "주의사항"],
    [/\boverdose\b/gi, "과량 복용"],
    [/\bdosage\b/gi, "용량"],
    [/\badministration\b/gi, "투여"],
    [/\btreatment\b/gi, "치료"],
    [/\bused to treat\b/gi, "치료에 사용됨"],
    [/\bis used for\b/gi, "다음 목적으로 사용됨"],
    [/\bmay cause\b/gi, "유발할 수 있음"],
    [/\bmay increase\b/gi, "증가시킬 수 있음"],
    [/\brisk\b/gi, "위험"],
    [/\bbleeding\b/gi, "출혈"],
    [/\bdizziness\b/gi, "어지러움"],
    [/\bdrowsiness\b/gi, "졸림"],
    [/\bnausea\b/gi, "메스꺼움"],
    [/\bvomiting\b/gi, "구토"],
    [/\bheadache\b/gi, "두통"],
    [/\binsomnia\b/gi, "불면"],
    [/\ballergic reaction\b/gi, "알레르기 반응"],
    [/\bliver\b/gi, "간"],
    [/\bkidney\b/gi, "신장"],
    [/\bstomach\b/gi, "위장"],
    [/\bheart\b/gi, "심장"],
    [/\bblood pressure\b/gi, "혈압"],
    [/\bwith other medications\b/gi, "다른 약물과 함께"],
    [/\bconsult\b/gi, "상담"],
    [/\bdoctor\b/gi, "의사"],
    [/\bpharmacist\b/gi, "약사"],
    [/\band\b/gi, "및"],
    [/\bor\b/gi, "또는"],
    [/\bthe\b/gi, ""],
    [/\ban?\b/gi, ""],
  ];
  replacements.forEach(([pattern, replacement]) => {
    translated = translated.replace(pattern, replacement);
  });
  const prefix = field === "interactions" ? "자동 번역된 상호작용 원문" : field === "sideEffects" ? "자동 번역된 부작용/주의사항" : "자동 번역된 설명";
  return `${prefix}: ${translated}${displayName ? ` (${displayName} 관련 원문 기반)` : ""}`;
}

async function translateTextToKorean(text, field = "effects", displayName = "") {
  const source = shortenText(text, 650);
  if (!shouldTranslateToKorean(source)) return source;
  const key = `${field}:${source}`;
  if (medicationTranslationCache[key]) return medicationTranslationCache[key];
  const attempts = [
    async () => {
      const data = await fetchJson(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(source)}&langpair=en|ko`, 7000);
      return data?.responseData?.translatedText;
    },
    async () => {
      const data = await fetchJson(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&dt=t&q=${encodeURIComponent(source)}`, 7000);
      return Array.isArray(data?.[0]) ? data[0].map((part) => part?.[0]).filter(Boolean).join("") : "";
    },
  ];
  for (const attempt of attempts) {
    try {
      const translated = shortenText(await attempt(), 700);
      if (translated && translated !== source && hasKoreanText(translated)) {
        medicationTranslationCache[key] = translated;
        localStorage.setItem("ethan-health-med-translations-v1", JSON.stringify(medicationTranslationCache));
        return translated;
      }
    } catch {
      // Try the next translation provider, then use the local glossary fallback.
    }
  }
  return glossaryKoreanTranslation(source, field, displayName);
}

async function ensureKoreanMedicationTranslations(info) {
  if (!info) return info;
  const fields = ["ingredients", "effects", "sideEffects"];
  for (const field of fields) {
    const english = info[`${field}En`] || (!hasKoreanText(info[field]) ? info[field] : "");
    const korean = info[`${field}Ko`];
    if (shouldTranslateToKorean(english) && (!korean || !hasKoreanText(korean) || isGeneratedKoreanPlaceholder(korean))) {
      info[`${field}Ko`] = await translateTextToKorean(english, field, info.displayName);
      if (field !== "ingredients") info[field] = info[`${field}Ko`];
    }
  }
  const englishInteractions = info.interactionsEn?.length ? info.interactionsEn : (info.interactions || []).filter((item) => shouldTranslateToKorean(item));
  const hasUsefulKoreanInteractions = (info.interactionsKo || []).some((item) => hasKoreanText(item) && !isGeneratedKoreanPlaceholder(item));
  if (englishInteractions.length && !hasUsefulKoreanInteractions) {
    info.interactionsKo = [];
    for (const item of englishInteractions.slice(0, 4)) {
      info.interactionsKo.push(await translateTextToKorean(item, "interactions", info.displayName));
    }
  }
  return info;
}

function externalKoreanSummary(info, field, original = "") {
  const name = info?.displayName || info?.ingredients || "해당 항목";
  if (field === "ingredients") {
    return original ? `성분명: ${shortenText(original, 180)}` : "성분 정보는 원문 데이터에서 확인되지 않았습니다.";
  }
  if (field === "effects") {
    return shouldTranslateToKorean(original) ? glossaryKoreanTranslation(original, field, name) : `${name} 관련 외부 의약품/화합물 정보를 찾았습니다.`;
  }
  if (field === "sideEffects") {
    return shouldTranslateToKorean(original) ? glossaryKoreanTranslation(original, field, name) : `${name}의 부작용/주의사항은 개인 질환, 복용량, 병용약에 따라 달라질 수 있어 전문가 확인이 필요합니다.`;
  }
  if (field === "interactions") {
    return shouldTranslateToKorean(original) ? glossaryKoreanTranslation(original, field, name) : "당일 기록된 약과의 충돌 가능성은 아래 항목에서 별도로 계산합니다.";
  }
  return original || "확인 필요";
}

function englishFallbackText(info, field, original = "") {
  if (original && !hasKoreanText(original)) return original;
  const name = info?.aliases?.find((alias) => /^[\x00-\x7F]+$/.test(alias)) || info?.ingredients || info?.displayName || "This item";
  if (field === "ingredients") return original || name;
  if (field === "effects") return "English source text is not available for this item. Check the product label or prescription details for the approved indication.";
  if (field === "sideEffects") return "English source text is not available for this item. Side effects vary by dose, condition, and other medications.";
  if (field === "interactions") return "English interaction source text is not available. Review current medications with a clinician or pharmacist.";
  return original || "Not available";
}

function medicationText(info, field, max = 240) {
  if (!info) return "";
  const ko = info[`${field}Ko`] || info[field];
  const en = info[`${field}En`] || info[`${field}Original`] || info[field];
  const value = medicationInfoLanguage === "en"
    ? englishFallbackText(info, field, en)
    : hasKoreanText(ko) ? ko : externalKoreanSummary(info, field, ko || en);
  return shortenText(value, max);
}

function medicationListText(info, field, max = 180) {
  if (!info) return "";
  const koList = info[`${field}Ko`];
  const enList = info[`${field}En`];
  const baseList = info[field];
  const selected = medicationInfoLanguage === "en" ? (enList || baseList) : (koList || baseList);
  const values = Array.isArray(selected) ? selected : [selected].filter(Boolean);
  if (!values.length) return "";
  return values
    .map((value) => {
      if (medicationInfoLanguage === "ko" && !hasKoreanText(value)) return externalKoreanSummary(info, field, value);
      if (medicationInfoLanguage === "en" && hasKoreanText(value)) return englishFallbackText(info, field, value);
      return shortenText(value, max);
    })
    .filter(Boolean)
    .map(escapeHtml)
    .join("<br>");
}

function externalKoSummaryFor(field, displayName, original = "") {
  return externalKoreanSummary({ displayName }, field, original);
}

function firstLabelText(label, keys) {
  for (const key of keys) {
    const text = shortenText(label?.[key]);
    if (text) return text;
  }
  return "";
}

function externalMedicationTerms(query, extraTerms = []) {
  const local = localMedicationInfo(query);
  const terms = uniqueValues([
    query,
    local?.displayName,
    local?.ingredients,
    ...(local?.aliases || []),
    ...translatedMedicationTerms(query),
    ...extraTerms,
  ].filter(Boolean));
  return terms
    .flatMap((term) => String(term).split(/[;,|]/).map((part) => part.trim()))
    .filter((term) => term.length >= 3 && /^[\x00-\x7F]+$/.test(term))
    .slice(0, 12);
}

function fdaSearchExpression(term) {
  const cleaned = term.replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
  const value = cleaned.includes(" ") ? `"${cleaned}"` : cleaned;
  return `(openfda.brand_name:${value} OR openfda.generic_name:${value} OR active_ingredient:${value})`;
}

function fdaInfoFromLabel(label, query) {
  const openfda = label.openfda || {};
  const names = uniqueValues([...(openfda.brand_name || []), ...(openfda.generic_name || []), ...(openfda.substance_name || [])]);
  const interactionText = firstLabelText(label, ["drug_interactions", "drug_and_or_laboratory_test_interactions", "warnings", "contraindications"]);
  const displayName = names[0] || query;
  const ingredientsEn = firstLabelText(label, ["active_ingredient", "description"]) || names.join(", ");
  const effectsEn = firstLabelText(label, ["purpose", "indications_and_usage"]);
  const sideEffectsEn = firstLabelText(label, ["adverse_reactions", "warnings", "stop_use"]);
  return {
    displayName,
    aliases: names,
    ingredients: ingredientsEn,
    ingredientsEn,
    ingredientsKo: externalKoSummaryFor("ingredients", displayName, ingredientsEn),
    effects: externalKoSummaryFor("effects", displayName, effectsEn),
    effectsEn,
    effectsKo: externalKoSummaryFor("effects", displayName, effectsEn),
    sideEffects: externalKoSummaryFor("sideEffects", displayName, sideEffectsEn),
    sideEffectsEn,
    sideEffectsKo: externalKoSummaryFor("sideEffects", displayName, sideEffectsEn),
    interactions: interactionText ? [interactionText] : [],
    interactionsEn: interactionText ? [interactionText] : [],
    interactionsKo: interactionText ? [externalKoSummaryFor("interactions", displayName, interactionText)] : [],
    source: "openFDA 라벨",
  };
}

async function fetchOpenFdaMedication(query, extraTerms = []) {
  for (const term of externalMedicationTerms(query, extraTerms)) {
    try {
      const search = encodeURIComponent(fdaSearchExpression(term));
      const data = await fetchJson(`https://api.fda.gov/drug/label.json?search=${search}&limit=1`, 5200);
      const label = data?.results?.[0];
      if (label) return fdaInfoFromLabel(label, query);
    } catch {
      // Keep trying other candidate names, then fall back to local knowledge.
    }
  }
  return null;
}

async function fetchRxNavInteractions(rxcui) {
  try {
    const data = await fetchJson(`https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${encodeURIComponent(rxcui)}`, 5200);
    return uniqueValues((data?.interactionTypeGroup || [])
      .flatMap((group) => group.interactionType || [])
      .flatMap((type) => type.interactionPair || [])
      .map((pair) => shortenText(pair.description, 220))
      .filter(Boolean))
      .slice(0, 4);
  } catch {
    return [];
  }
}

async function fetchRxNavMedication(query, extraTerms = []) {
  for (const term of externalMedicationTerms(query, extraTerms)) {
    try {
      const data = await fetchJson(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(term)}&search=2`, 5200);
      const rxcui = data?.idGroup?.rxnormId?.[0];
      if (!rxcui) continue;
      const properties = await fetchJson(`https://rxnav.nlm.nih.gov/REST/rxcui/${encodeURIComponent(rxcui)}/properties.json`, 5200).catch(() => null);
      const name = properties?.properties?.name || term;
      const interactions = await fetchRxNavInteractions(rxcui);
      return {
        displayName: name,
        aliases: uniqueValues([name, term, properties?.properties?.synonym]),
        ingredients: properties?.properties?.synonym || name,
        ingredientsEn: properties?.properties?.synonym || name,
        ingredientsKo: externalKoSummaryFor("ingredients", name, properties?.properties?.synonym || name),
        effects: "RxNav에서 표준 약물명을 확인했습니다. 구체적 효능은 처방 목적과 제품 라벨을 함께 확인하세요.",
        effectsEn: "RxNav matched a standard drug name. Check the prescription purpose and product label for the approved indication.",
        effectsKo: "RxNav에서 표준 약물명을 확인했습니다. 구체적 효능은 처방 목적과 제품 라벨을 함께 확인하세요.",
        sideEffects: "",
        interactions,
        interactionsEn: interactions,
        interactionsKo: interactions.length ? [externalKoSummaryFor("interactions", name, interactions.join(" "))] : [],
        rxcui,
        source: "RxNav",
      };
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

function pubChemValueText(value) {
  if (!value) return "";
  if (typeof value.String === "string") return value.String;
  if (Array.isArray(value.StringWithMarkup)) return value.StringWithMarkup.map((item) => item.String).filter(Boolean).join(" ");
  if (Array.isArray(value.String)) return value.String.join(" ");
  if (typeof value.Number !== "undefined") return String(value.Number);
  return "";
}

function collectPubChemSections(section, list = []) {
  if (!section) return list;
  if (section.TOCHeading || section.Information) list.push(section);
  (section.Section || []).forEach((child) => collectPubChemSections(child, list));
  return list;
}

function pubChemTextByHeading(record, patterns, maxItems = 2) {
  const sections = collectPubChemSections(record);
  return uniqueValues(sections
    .filter((section) => patterns.some((pattern) => pattern.test(section.TOCHeading || "")))
    .flatMap((section) => section.Information || [])
    .map((info) => pubChemValueText(info.Value))
    .filter(Boolean))
    .slice(0, maxItems)
    .join(" ");
}

async function fetchPubChemMedication(query, extraTerms = []) {
  for (const term of externalMedicationTerms(query, extraTerms)) {
    try {
      const cidData = await fetchJson(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(term)}/cids/JSON`, 5200);
      const cid = cidData?.IdentifierList?.CID?.[0];
      if (!cid) continue;
      const viewData = await fetchJson(`https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${encodeURIComponent(cid)}/JSON`, 7000);
      const record = viewData?.Record || {};
      const title = record.RecordTitle || term;
      const description = shortenText(record.RecordDescription || pubChemTextByHeading(record, [/description/i, /summary/i], 1), 260);
      const effects = shortenText(pubChemTextByHeading(record, [/drug indication/i, /therapeutic uses/i, /pharmacology/i, /mechanism of action/i, /drug and medication information/i], 2) || description, 280);
      const sideEffects = shortenText(pubChemTextByHeading(record, [/adverse/i, /toxicity/i, /safety and hazards/i, /health hazards/i, /contraindication/i], 2), 260);
      return {
        displayName: title,
        aliases: uniqueValues([title, term]),
        ingredients: `${title}${cid ? ` · PubChem CID ${cid}` : ""}`,
        ingredientsEn: `${title}${cid ? ` · PubChem CID ${cid}` : ""}`,
        ingredientsKo: externalKoSummaryFor("ingredients", title, `${title}${cid ? ` · PubChem CID ${cid}` : ""}`),
        effects: externalKoSummaryFor("effects", title, effects),
        effectsEn: effects || "PubChem matched this compound. Approved medical uses may vary by country and product label.",
        effectsKo: externalKoSummaryFor("effects", title, effects),
        sideEffects: externalKoSummaryFor("sideEffects", title, sideEffects),
        sideEffectsEn: sideEffects,
        sideEffectsKo: externalKoSummaryFor("sideEffects", title, sideEffects),
        interactions: [],
        cid,
        source: "PubChem",
      };
    } catch {
      // Continue with the next candidate name.
    }
  }
  return null;
}

async function fetchWikidataMedication(query) {
  const searches = uniqueValues([query, ...translatedMedicationTerms(query)]).slice(0, 5);
  for (const term of searches) {
    try {
      const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(term)}&language=ko&uselang=ko&type=item&format=json&origin=*`;
      const searchData = await fetchJson(searchUrl, 4200);
      const result = searchData?.search?.[0];
      if (!result?.id) continue;
      const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${encodeURIComponent(result.id)}&props=labels|descriptions|aliases&languages=ko|en&format=json&origin=*`;
      const entityData = await fetchJson(entityUrl, 4200);
      const entity = entityData?.entities?.[result.id];
      if (!entity) continue;
      const koLabel = entity.labels?.ko?.value;
      const enLabel = entity.labels?.en?.value;
      const koDescription = entity.descriptions?.ko?.value;
      const enDescription = entity.descriptions?.en?.value;
      const enAliases = (entity.aliases?.en || []).map((item) => item.value);
      const koAliases = (entity.aliases?.ko || []).map((item) => item.value);
      const aliases = uniqueValues([koLabel, enLabel, ...koAliases, ...enAliases, term]);
      return {
        displayName: koLabel || enLabel || term,
        aliases,
        ingredients: enLabel || koLabel || term,
        ingredientsEn: enLabel || koLabel || term,
        ingredientsKo: koLabel || externalKoSummaryFor("ingredients", koLabel || enLabel || term, enLabel || term),
        effects: koDescription || externalKoSummaryFor("effects", koLabel || enLabel || term, enDescription),
        effectsEn: enDescription || "Wikidata matched a medication or compound name. Detailed clinical information should be checked against drug databases and labels.",
        effectsKo: koDescription || externalKoSummaryFor("effects", koLabel || enLabel || term, enDescription),
        sideEffects: "",
        interactions: [],
        wikidataId: result.id,
        source: "Wikidata 이름 매칭",
        searchTerms: uniqueValues([enLabel, ...enAliases, ...translatedMedicationTerms(query)]).filter(Boolean),
      };
    } catch {
      // Try the next search term.
    }
  }
  return null;
}

function fallbackMedicationInfo(query, searchTerms = []) {
  const candidates = externalMedicationTerms(query, searchTerms).slice(0, 4);
  return {
    displayName: query,
    aliases: candidates,
    ingredients: candidates.length ? `검색 후보: ${candidates.join(", ")}` : "공개 DB에서 자동 확인되지 않았습니다.",
    ingredientsEn: candidates.length ? `Search candidates: ${candidates.join(", ")}` : "No automatic public database match was found.",
    ingredientsKo: candidates.length ? `검색 후보: ${candidates.join(", ")}` : "공개 DB에서 자동 확인되지 않았습니다.",
    effects: "일치하는 공개 DB 결과를 찾지 못했습니다. 성분명, 영문명, 제품 포장 성분표 또는 처방전을 기준으로 다시 검색하세요.",
    effectsEn: "No matching public database result was found. Try the active ingredient, English name, package ingredient list, or prescription details.",
    effectsKo: "일치하는 공개 DB 결과를 찾지 못했습니다. 성분명, 영문명, 제품 포장 성분표 또는 처방전을 기준으로 다시 검색하세요.",
    sideEffects: "정보가 확인되지 않은 항목은 복용량 변경이나 병용 판단을 앱만으로 결정하지 마세요.",
    sideEffectsEn: "Do not rely on the app alone to change dose or combine medications when the item cannot be verified.",
    sideEffectsKo: "정보가 확인되지 않은 항목은 복용량 변경이나 병용 판단을 앱만으로 결정하지 마세요.",
    interactions: [],
    source: "직접 확인 필요",
  };
}

function mergeMedicationInfo(local, rxnav, fda, pubchem, wikidata) {
  const infos = [local, fda, rxnav, pubchem, wikidata].filter(Boolean);
  if (!infos.length) return null;
  const firstValue = (...keys) => {
    for (const info of infos) {
      for (const key of keys) {
        const value = info[key];
        if (Array.isArray(value) ? value.length : value) return value;
      }
    }
    return "";
  };
  return {
    displayName: local?.displayName || fda?.displayName || rxnav?.displayName || pubchem?.displayName || wikidata?.displayName || "검색 결과",
    aliases: uniqueValues(infos.flatMap((info) => info.aliases || [])),
    ingredients: local?.ingredients || fda?.ingredients || rxnav?.ingredients || pubchem?.ingredients || wikidata?.ingredients || "",
    ingredientsKo: firstValue("ingredientsKo", "ingredients"),
    ingredientsEn: firstValue("ingredientsEn"),
    effects: local?.effects || fda?.effects || pubchem?.effects || rxnav?.effects || wikidata?.effects || "",
    effectsKo: firstValue("effectsKo", "effects"),
    effectsEn: firstValue("effectsEn"),
    sideEffects: local?.sideEffects || fda?.sideEffects || pubchem?.sideEffects || rxnav?.sideEffects || wikidata?.sideEffects || "",
    sideEffectsKo: firstValue("sideEffectsKo", "sideEffects"),
    sideEffectsEn: firstValue("sideEffectsEn"),
    interactions: uniqueValues(infos.flatMap((info) => info.interactions || [])),
    interactionsKo: uniqueValues(infos.flatMap((info) => info.interactionsKo || [])),
    interactionsEn: uniqueValues(infos.flatMap((info) => info.interactionsEn || [])),
    rxcui: rxnav?.rxcui || "",
    cid: pubchem?.cid || "",
    wikidataId: wikidata?.wikidataId || "",
    source: uniqueValues(infos.map((info) => info.source)).join(" + "),
  };
}

function medicationIdentityTerms(info, name = "") {
  return uniqueValues([name, info?.displayName, info?.ingredients, ...(info?.aliases || [])]
    .filter(Boolean)
    .flatMap((value) => String(value).split(/[,+;/]/))
    .map(normalizeMedicineName)
    .filter((term) => term.length >= 2));
}

function hasMedicationSignal(info, name, patterns) {
  const terms = medicationIdentityTerms(info, name);
  return patterns.map(normalizeMedicineName).some((pattern) =>
    terms.some((term) => term === pattern || term.includes(pattern) || pattern.includes(term)),
  );
}

function interactionMentions(info, otherInfo, otherName) {
  const text = normalizeMedicineName([...(info?.interactions || []), info?.sideEffects].join(" "));
  if (!text) return false;
  return medicationIdentityTerms(otherInfo, otherName).some((term) => term.length >= 3 && text.includes(term));
}

function medicationDisplayName(info, fallback) {
  return info?.displayName || fallback || "입력 항목";
}

function medicationPairWarnings(aInfo, bInfo, aName, bName) {
  const warnings = [];
  const aDisplay = medicationDisplayName(aInfo, aName);
  const bDisplay = medicationDisplayName(bInfo, bName);
  const aKey = normalizeMedicineName(aDisplay || aName);
  const bKey = normalizeMedicineName(bDisplay || bName);

  if (aKey && bKey && aKey === bKey) {
    warnings.push("같은 성분 또는 같은 제품일 수 있어 중복 복용 여부를 확인하세요.");
  }
  if (interactionMentions(aInfo, bInfo, bName) || interactionMentions(bInfo, aInfo, aName)) {
    warnings.push(`${aDisplay}와 ${bDisplay} 사이에 라벨/지식 데이터상 상호작용 주의 신호가 있습니다.`);
  }

  const anticoagulants = ["warfarin", "와파린", "aspirin", "아스피린", "clopidogrel", "클로피도그렐", "항응고제", "항혈소판"];
  const omega3 = ["오메가3", "omega 3", "fish oil", "epa", "dha"];
  const nsaids = ["이부프로펜", "ibuprofen", "advil", "motrin", "naproxen", "나프록센", "nsaid"];
  const minerals = ["칼슘", "마그네슘", "철분", "아연", "calcium", "magnesium", "iron", "zinc"];
  const absorptionSensitive = ["levothyroxine", "레보티록신", "갑상샘", "갑상선", "항생제", "tetracycline", "ciprofloxacin", "bisphosphonate"];
  const acetaminophen = ["타이레놀", "acetaminophen", "paracetamol", "아세트아미노펜"];
  const alcohol = ["alcohol", "알코올", "술", "음주"];

  const aHas = (patterns) => hasMedicationSignal(aInfo, aName, patterns);
  const bHas = (patterns) => hasMedicationSignal(bInfo, bName, patterns);
  if ((aHas(omega3) && bHas(anticoagulants)) || (bHas(omega3) && aHas(anticoagulants))) {
    warnings.push("오메가-3와 항응고/항혈소판 계열은 출혈 경향 증가 가능성을 약사와 확인하세요.");
  }
  if ((aHas(nsaids) && bHas(anticoagulants)) || (bHas(nsaids) && aHas(anticoagulants))) {
    warnings.push("NSAID와 항응고/아스피린 조합은 위장 출혈 또는 멍 위험을 높일 수 있습니다.");
  }
  if ((aHas(minerals) && bHas(minerals)) || (aHas(minerals) && bHas(absorptionSensitive)) || (bHas(minerals) && aHas(absorptionSensitive))) {
    warnings.push("미네랄류는 서로 또는 일부 갑상샘약/항생제 흡수를 방해할 수 있어 복용 간격을 확인하세요.");
  }
  if ((aHas(acetaminophen) && bHas(alcohol)) || (bHas(acetaminophen) && aHas(alcohol))) {
    warnings.push("아세트아미노펜과 음주는 간 부담을 키울 수 있어 피하는 편이 안전합니다.");
  }
  return uniqueValues(warnings);
}

function infoForRecordedMedication(med) {
  return med.info || localMedicationInfo(med.name) || { displayName: med.name, aliases: [], interactions: [] };
}

function detectMedicationConflicts(info, meds, name = "") {
  if (!info) return [];
  return uniqueValues((meds || [])
    .filter((med) => med.name && med.status !== "건너뜀")
    .flatMap((med) => medicationPairWarnings(info, infoForRecordedMedication(med), name, med.name)
      .map((warning) => `${med.name}: ${warning}`)))
    .slice(0, 5);
}

function detectRecordedMedicationConflicts(meds) {
  const activeMeds = (meds || []).filter((med) => med.name && med.status !== "건너뜀");
  const warnings = [];
  for (let i = 0; i < activeMeds.length; i += 1) {
    for (let j = i + 1; j < activeMeds.length; j += 1) {
      const a = activeMeds[i];
      const b = activeMeds[j];
      medicationPairWarnings(infoForRecordedMedication(a), infoForRecordedMedication(b), a.name, b.name)
        .forEach((warning) => warnings.push(`${a.name} + ${b.name}: ${warning}`));
    }
  }
  return uniqueValues(warnings).slice(0, 5);
}

function medicationInfoMatchesQuery(info, query) {
  const q = normalizeMedicineName(query);
  return medicationIdentityTerms(info, info?.displayName).some((term) => term === q || term.includes(q) || q.includes(term));
}

function medicationInfoSnapshot(info) {
  if (!info) return null;
  return {
    displayName: info.displayName,
    aliases: (info.aliases || []).slice(0, 8),
    ingredients: info.ingredients || "",
    ingredientsKo: info.ingredientsKo || "",
    ingredientsEn: info.ingredientsEn || "",
    effects: info.effects || "",
    effectsKo: info.effectsKo || "",
    effectsEn: info.effectsEn || "",
    sideEffects: info.sideEffects || "",
    sideEffectsKo: info.sideEffectsKo || "",
    sideEffectsEn: info.sideEffectsEn || "",
    interactions: (info.interactions || []).slice(0, 8),
    interactionsKo: (info.interactionsKo || []).slice(0, 8),
    interactionsEn: (info.interactionsEn || []).slice(0, 8),
    source: info.source || "",
    rxcui: info.rxcui || "",
    cid: info.cid || "",
    wikidataId: info.wikidataId || "",
  };
}

function renderMedicationLanguageButtons() {
  document.querySelectorAll("[data-med-language]").forEach((button) => {
    const isActive = button.dataset.medLanguage === medicationInfoLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function switchMedicationLanguage(language) {
  medicationInfoLanguage = language === "en" ? "en" : "ko";
  renderMedicationLanguageButtons();
  if (!activeMedicationInfo) return;
  const query = $("#medName").value.trim();
  const conflicts = detectMedicationConflicts(activeMedicationInfo, getDay().medications, query);
  renderMedicationLookup(activeMedicationInfo, conflicts, medicationInfoLanguage === "en" ? "English view" : "한국어 보기");
}

function renderMedicationLookup(info, conflicts = [], status = "") {
  const statusEl = $("#medLookupStatus");
  const panel = $("#medLookupPanel");
  renderMedicationLanguageButtons();
  if (status) statusEl.textContent = status;
  if (!info) {
    panel.innerHTML = "";
    return;
  }
  const interactions = medicationListText(info, "interactions", 180) || (medicationInfoLanguage === "en" ? "No specific interaction text has been confirmed yet." : "특정 상호작용 정보는 아직 확인되지 않았습니다.");
  const conflictText = conflicts.length ? conflicts.map((item) => escapeHtml(item)).join("<br>") : "당일 기록과 명확한 충돌 신호는 아직 없습니다.";
  const languageLabel = medicationInfoLanguage === "en" ? "English" : "한국어";
  panel.innerHTML = `
    <article class="medication-lookup-card">
      <h3>${escapeHtml(info.displayName || "검색 결과")} <span>${languageLabel}</span></h3>
      <dl>
        <dt>성분</dt>
        <dd>${escapeHtml(medicationText(info, "ingredients", 220) || (medicationInfoLanguage === "en" ? "Needs verification" : "확인 필요"))}</dd>
        <dt>효과</dt>
        <dd>${escapeHtml(medicationText(info, "effects", 240) || (medicationInfoLanguage === "en" ? "Check the product label or prescription purpose." : "제품 라벨 또는 처방 목적 확인 필요"))}</dd>
        <dt>부작용</dt>
        <dd>${escapeHtml(medicationText(info, "sideEffects", 240) || (medicationInfoLanguage === "en" ? "May vary by individual condition." : "개인 상태에 따라 다를 수 있습니다."))}</dd>
        <dt>주의</dt>
        <dd>${interactions}</dd>
        <dt>당일 충돌</dt>
        <dd>${conflictText}</dd>
        <dt>출처</dt>
        <dd>${escapeHtml(info.source || "기본 지식")}${info.rxcui ? ` · RxCUI ${escapeHtml(info.rxcui)}` : ""}${info.cid ? ` · PubChem CID ${escapeHtml(info.cid)}` : ""}${info.wikidataId ? ` · ${escapeHtml(info.wikidataId)}` : ""}</dd>
      </dl>
      <p class="safety-note">${medicationInfoLanguage === "en" ? "Reference only. For prescriptions, pregnancy/nursing, chronic conditions, planned surgery, or dose changes, confirm with a clinician or pharmacist." : "참고용 정보입니다. 처방약 복용, 임신/수유, 만성질환, 수술 예정, 복용량 변경은 의사 또는 약사와 확인하세요."}</p>
    </article>
  `;
}

async function lookupMedication(query, options = {}) {
  const trimmed = query.trim();
  const token = ++medicationLookupToken;
  if (!trimmed) {
    activeMedicationInfo = null;
    renderMedicationLookup(null, [], "한국어/영문 이름을 입력하면 성분/효과/주의사항을 검색합니다.");
    return;
  }

  const local = localMedicationInfo(trimmed);
  if (local) {
    activeMedicationInfo = local;
    renderMedicationLookup(local, detectMedicationConflicts(local, getDay().medications, trimmed), "기본 정보 표시 · 공공 DB 확인 중");
  } else {
    activeMedicationInfo = null;
    renderMedicationLookup(null, [], `"${trimmed}" 한국어명/공공 DB 검색 중`);
  }

  const wikidata = await fetchWikidataMedication(trimmed);
  if (token !== medicationLookupToken) return;
  const wikidataTerms = wikidata?.searchTerms || [];
  if (wikidata && !local) {
    activeMedicationInfo = wikidata;
    renderMedicationLookup(wikidata, detectMedicationConflicts(wikidata, getDay().medications, trimmed), "한국어 이름 매칭됨 · 의약품 DB 확인 중");
  }

  const [rxnavResult, fdaResult, pubchemResult] = await Promise.allSettled([
    fetchRxNavMedication(trimmed, wikidataTerms),
    fetchOpenFdaMedication(trimmed, wikidataTerms),
    fetchPubChemMedication(trimmed, wikidataTerms),
  ]);
  if (token !== medicationLookupToken) return;

  const rxnav = rxnavResult.status === "fulfilled" ? rxnavResult.value : null;
  const fda = fdaResult.status === "fulfilled" ? fdaResult.value : null;
  const pubchem = pubchemResult.status === "fulfilled" ? pubchemResult.value : null;
  const merged = mergeMedicationInfo(local, rxnav, fda, pubchem, wikidata);
  if (!merged) {
    const fallback = await ensureKoreanMedicationTranslations(fallbackMedicationInfo(trimmed, wikidataTerms));
    activeMedicationInfo = fallback;
    renderMedicationLookup(fallback, detectMedicationConflicts(fallback, getDay().medications, trimmed), `"${trimmed}" 직접 확인 필요`);
    return;
  }
  activeMedicationInfo = merged;
  const conflicts = detectMedicationConflicts(merged, getDay().medications, trimmed);
  if (medicationInfoLanguage === "ko") renderMedicationLookup(merged, conflicts, "영문 원문 자동 번역 중");
  await ensureKoreanMedicationTranslations(merged);
  if (token !== medicationLookupToken) return;
  activeMedicationInfo = merged;
  const sourceLabel = /openFDA|RxNav|PubChem|Wikidata/.test(merged.source) ? `${merged.source} 확인됨` : "기본 정보 확인됨";
  renderMedicationLookup(merged, conflicts, sourceLabel);
  if (options.renderAfter) render();
}

function scheduleMedicationLookup() {
  clearTimeout(medicationLookupTimer);
  const query = $("#medName").value.trim();
  if (query.length < 2) {
    activeMedicationInfo = null;
    renderMedicationLookup(null, [], "2글자 이상 입력하면 한국어/영문 약 정보를 검색합니다.");
    return;
  }
  renderMedicationLookup(activeMedicationInfo, activeMedicationInfo ? detectMedicationConflicts(activeMedicationInfo, getDay().medications, query) : [], `"${query}" 검색 준비 중`);
  medicationLookupTimer = setTimeout(() => lookupMedication(query), 450);
}

async function fetchJson(url, timeoutMs = 5200) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function sourceImageUrl(query) {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(query)}.png`;
}

function nutritionFieldIds() {
  return ["calories", "carbs", "protein", "fat", "fiber", "sugar", "sodium"];
}

function clearNutritionFields() {
  nutritionFieldIds().forEach((id) => {
    $(`#${id}`).value = "";
  });
  $("#baseUnitLabel").textContent = "검색 중";
}

function clearAutoFoodState(options = {}) {
  activeFoodBase = null;
  activeFoodSource = "";
  if (options.clearNutrition) clearNutritionFields();
  if (options.clearSuggestions) renderFoodSuggestions([]);
  if (!selectedPhoto) {
    autoPhoto = "";
    $("#photoPreview").removeAttribute("src");
    $("#photoSource").textContent = "자동";
    $(".photo-box").classList.remove("has-image");
  }
  renderFoodPairingSuggestions(null);
}

function preferredMealTypeForCurrentDate() {
  return lastMealTypeState?.date === currentDate && mealOrder.includes(lastMealTypeState.mealType)
    ? lastMealTypeState.mealType
    : "아침";
}

function rememberMealType(mealType) {
  lastMealTypeState = { date: currentDate, mealType: mealOrder.includes(mealType) ? mealType : "아침" };
  if (currentUser?.id) localStorage.setItem(userStorageKey(LAST_MEAL_TYPE_KEY), JSON.stringify(lastMealTypeState));
}

async function translateFoodQueryToEnglish(query) {
  const trimmed = query.trim();
  if (!/[가-힣]/.test(trimmed)) return "";
  if (searchTranslations[trimmed]) return searchTranslations[trimmed];
  if (foodTranslationCache[trimmed]) return foodTranslationCache[trimmed];
  const attempts = [
    async () => {
      const data = await fetchJson(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(trimmed)}`, 5200);
      return Array.isArray(data?.[0]) ? data[0].map((part) => part?.[0]).filter(Boolean).join("") : "";
    },
    async () => {
      const data = await fetchJson(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=ko|en`, 5200);
      return data?.responseData?.translatedText;
    },
  ];
  for (const attempt of attempts) {
    try {
      const translated = String(await attempt() || "").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
      if (translated && translated !== normalize(trimmed)) {
        foodTranslationCache[trimmed] = translated;
        localStorage.setItem(FOOD_TRANSLATION_KEY, JSON.stringify(foodTranslationCache));
        return translated;
      }
    } catch {
      // Food translation is a search helper; continue to other sources.
    }
  }
  return "";
}

async function foodSearchTerms(query) {
  const trimmed = query.trim();
  const translated = await translateFoodQueryToEnglish(trimmed);
  return uniqueValues([
    trimmed,
    searchTranslations[trimmed],
    translated,
    translated && !/\b(raw|cooked|bread|food)\b/i.test(translated) ? `${translated} raw` : "",
    translated && !/\b100g\b/i.test(translated) ? `${translated} 100g` : "",
  ].filter(Boolean)).slice(0, 6);
}

function candidateFromLocal(item) {
  return { ...item, source: "기본 DB", image: sourceImageUrl(item.imageQuery), quality: 92 };
}

function localFoodCandidates(query) {
  const q = normalize(query);
  if (!q) return [];
  return foodDb
    .map((item) => {
      const haystack = [item.name, ...item.aliases].map(normalize);
      const exact = haystack.some((value) => value === q);
      const starts = haystack.some((value) => value.startsWith(q));
      const includes = haystack.some((value) => value.includes(q) || q.includes(value));
      return { item, score: exact ? 100 : starts ? 88 : includes ? 70 : 0 };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => ({ ...candidateFromLocal(entry.item), quality: entry.score }));
}

function toCandidateFromProduct(product, fallbackName = "제품") {
  const nutriments = product.nutriments || {};
  const calories = number(nutriments["energy-kcal_100g"] ?? nutriments["energy-kcal"]);
  const protein = number(nutriments.proteins_100g ?? nutriments.proteins);
  const carbs = number(nutriments.carbohydrates_100g ?? nutriments.carbohydrates);
  const fat = number(nutriments.fat_100g ?? nutriments.fat);
  const fiber = number(nutriments.fiber_100g ?? nutriments.fiber);
  const sugar = number(nutriments.sugars_100g ?? nutriments.sugars);
  const sodium = number(nutriments.sodium_100g ? nutriments.sodium_100g * 1000 : nutriments.salt_100g ? nutriments.salt_100g * 393.4 : 0);
  const name = product.product_name || product.generic_name || fallbackName;
  if (!calories && !protein && !carbs && !fat) return null;
  const filledFields = [calories, protein, carbs, fat, fiber, sugar, sodium].filter((value) => value > 0).length;
  return {
    name: product.brands ? `${name} (${product.brands})` : name,
    calories,
    carbs,
    protein,
    fat,
    fiber,
    sugar,
    sodium,
    unit: product.serving_size || product.quantity || "100g",
    source: "Open Food Facts",
    image: product.image_front_url || product.image_url || "",
    quality: Math.min(96, 54 + filledFields * 7),
  };
}

async function fetchOpenFoodFacts(query) {
  const fields = "product_name,generic_name,brands,nutriments,image_front_url,image_url,serving_size,quantity";
  const terms = await foodSearchTerms(query);
  const results = [];
  for (const term of terms.slice(0, 4)) {
    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(term)}&search_simple=1&action=process&json=1&page_size=5&fields=${fields}`;
      const data = await fetchJson(url);
      results.push(...(data.products || []).map((product) => toCandidateFromProduct(product, query)).filter(Boolean));
    } catch {
      // Continue with the next search term.
    }
  }
  return dedupeCandidates(results).slice(0, 8);
}

function nutrientValue(foodNutrients, names) {
  const wanted = names.map((name) => name.toLowerCase());
  const nutrient = (foodNutrients || []).find((entry) => {
    const name = String(entry.nutrientName || entry.nutrient?.name || "").toLowerCase();
    return wanted.some((target) => name === target || name.includes(target));
  });
  return number(nutrient?.value ?? nutrient?.amount);
}

function candidateFromUsda(foodItem, query) {
  const nutrients = foodItem.foodNutrients || [];
  const calories = nutrientValue(nutrients, ["Energy"]);
  const protein = nutrientValue(nutrients, ["Protein"]);
  const carbs = nutrientValue(nutrients, ["Carbohydrate, by difference"]);
  const fat = nutrientValue(nutrients, ["Total lipid (fat)", "Total lipid"]);
  const fiber = nutrientValue(nutrients, ["Fiber, total dietary"]);
  const sugar = nutrientValue(nutrients, ["Sugars, total including NLEA", "Sugars, total"]);
  const sodium = nutrientValue(nutrients, ["Sodium, Na"]);
  if (!calories && !protein && !carbs && !fat) return null;
  return {
    name: foodItem.description || query,
    calories,
    carbs,
    protein,
    fat,
    fiber,
    sugar,
    sodium,
    unit: "100g",
    source: "USDA FoodData Central",
    image: "",
    quality: 94,
  };
}

async function fetchUsdaFoods(query) {
  const terms = await foodSearchTerms(query);
  const results = [];
  for (const term of terms.slice(0, 5)) {
    try {
      const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=${encodeURIComponent(term)}&pageSize=10&dataType=Foundation,SR%20Legacy,Survey%20%28FNDDS%29,Branded`;
      const data = await fetchJson(url, 5200);
      results.push(...(data.foods || []).map((item) => candidateFromUsda(item, query)).filter(Boolean));
    } catch {
      // Continue with the next search term.
    }
  }
  return dedupeCandidates(results).slice(0, 8);
}

async function fetchBarcodeProduct(code) {
  const fields = "product_name,generic_name,brands,nutriments,image_front_url,image_url,serving_size,quantity";
  const data = await fetchJson(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=${fields},status`);
  const candidate = data.product ? toCandidateFromProduct(data.product, code) : null;
  if (!candidate) throw new Error("제품을 찾지 못했습니다.");
  return candidate;
}

async function fetchMealDbImage(query) {
  const local = localFoodCandidates(query)[0];
  const search = local?.imageQuery || query;
  const data = await fetchJson(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`, 4200);
  return data.meals?.[0]?.strMealThumb || "";
}

async function fetchCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(`${query} food`)}&gsrnamespace=6&gsrlimit=4&prop=imageinfo&iiprop=url&iiurlwidth=640&format=json&origin=*`;
  const data = await fetchJson(url, 4500);
  const pages = Object.values(data.query?.pages || {});
  const imageInfo = pages.flatMap((page) => page.imageinfo || []).find((info) => info.thumburl || info.url);
  return imageInfo?.thumburl || imageInfo?.url || "";
}

async function findAutoPhoto(query, preferredImage = "") {
  if (preferredImage) return { url: preferredImage, source: "자동" };
  const attempts = [() => fetchMealDbImage(query), () => fetchCommonsImage(query)];
  for (const attempt of attempts) {
    try {
      const url = await attempt();
      if (url) return { url, source: "자동" };
    } catch {
      // Image lookup is optional.
    }
  }
  return { url: placeholderSvg(query), source: "기본" };
}

function estimatedFoodCandidate(query) {
  const q = normalize(query);
  const rules = [
    { pattern: /빵|bread|베이글|bagel/, base: foodDb.find((item) => item.name === "통밀빵") },
    { pattern: /밥|rice|쌀/, base: foodDb.find((item) => item.name === "현미밥") },
    { pattern: /면|noodle|파스타|pasta/, base: foodDb.find((item) => item.name === "파스타") },
    { pattern: /고기|beef|pork|소고기|돼지고기/, base: foodDb.find((item) => item.name === "스테이크") },
    { pattern: /닭|chicken/, base: foodDb.find((item) => item.name === "닭가슴살") },
    { pattern: /생선|fish|연어|salmon/, base: foodDb.find((item) => item.name === "연어구이") },
    { pattern: /채소|야채|salad|상추|양배추|브로콜리/, base: foodDb.find((item) => item.name === "샐러드") },
    { pattern: /과일|fruit|사과|바나나|딸기/, base: foodDb.find((item) => item.name === "사과") },
    { pattern: /콩|두부|tofu|bean/, base: foodDb.find((item) => item.name === "두부") },
  ];
  const match = rules.find((rule) => rule.pattern.test(q))?.base;
  if (!match) return null;
  return {
    ...candidateFromLocal(match),
    name: `${query} (유사 식품 추정)`,
    source: "유사 식품 추정",
    quality: 42,
    image: sourceImageUrl(match.imageQuery),
  };
}

async function runFoodLookup(query, options = {}) {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    $("#lookupStatus").textContent = "2글자 이상 입력하면 자동 입력";
    clearAutoFoodState({ clearNutrition: true, clearSuggestions: true });
    $("#baseUnitLabel").textContent = "1인분 기준";
    return;
  }
  const token = ++lookupToken;
  $("#lookupStatus").textContent = `"${trimmed}" 영양성분 검색 중`;
  clearNutritionFields();
  renderFoodPairingSuggestions({ name: trimmed });

  const local = localFoodCandidates(trimmed);
  renderFoodSuggestions(local);
  if (local[0] && options.autoApply) {
    applyFoodCandidate(local[0], { replaceName: false, renderAfter: false });
    $("#lookupStatus").textContent = "영양성분 자동 입력됨 · 더 정확한 결과 검색 중";
  }

  const [offResult, usdaResult, photoResult] = await Promise.allSettled([
    fetchOpenFoodFacts(trimmed),
    fetchUsdaFoods(trimmed),
    findAutoPhoto(searchTranslations[trimmed] || trimmed, local[0]?.image || ""),
  ]);
  if (token !== lookupToken) return;

  const external = offResult.status === "fulfilled" ? offResult.value : [];
  const usda = usdaResult.status === "fulfilled" ? usdaResult.value : [];
  const estimated = estimatedFoodCandidate(trimmed);
  const merged = dedupeCandidates([...local, ...usda, ...external, estimated].filter(Boolean)).slice(0, 10);
  const best = merged[0];
  const preferredPhoto = best?.image || (photoResult.status === "fulfilled" ? photoResult.value.url : "");
  if (best && options.autoApply) applyFoodCandidate({ ...best, image: preferredPhoto || best.image }, { replaceName: false, renderAfter: false });
  if (!best && preferredPhoto) setAutoPhoto(preferredPhoto, "자동");
  if (best && preferredPhoto && !selectedPhoto) setAutoPhoto(preferredPhoto, best.source);
  renderFoodSuggestions(merged);
  if (best) renderFoodPairingSuggestions(best);
  $("#lookupStatus").textContent = merged.length ? `${best.source} 결과 적용 · 품질 ${best.quality}%` : "직접 입력";
  render();
}

function scheduleFoodLookup() {
  clearTimeout(lookupTimer);
  lookupToken += 1;
  clearAutoFoodState({ clearNutrition: true, clearSuggestions: true });
  const query = $("#foodName").value.trim();
  if (query.length < 2) {
    $("#lookupStatus").textContent = "2글자 이상 입력하면 자동 입력";
    $("#baseUnitLabel").textContent = "1인분 기준";
    return;
  }
  $("#lookupStatus").textContent = `"${query}" 자동검색 준비 중`;
  lookupTimer = setTimeout(() => runFoodLookup(query, { autoApply: true }), 350);
}

function dedupeCandidates(candidates) {
  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = normalize(candidate.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderFoodSuggestions(candidates) {
  $("#foodSuggestions").innerHTML = candidates
    .map((candidate, index) => `<button type="button" data-candidate="${index}">${escapeHtml(candidate.name)} · ${escapeHtml(candidate.unit)} · 품질 ${candidate.quality}%</button>`)
    .join("");
  $("#foodSuggestions")._candidates = candidates;
}

function foodPairingIdeas(foodItem) {
  const name = foodItem?.name || $("#foodName").value.trim();
  if (!name) return [];
  const text = normalize(name);
  const ideas = [];
  const add = (label, detail) => ideas.push({ label, detail });
  const protein = number(foodItem?.protein);
  const fiber = number(foodItem?.fiber);
  const carbs = number(foodItem?.carbs);
  const fat = number(foodItem?.fat);
  const sodium = number(foodItem?.sodium);
  const sugar = number(foodItem?.sugar);

  if (/빵|bread|베이글|bagel|토스트/.test(text)) {
    add("조합: 계란 + 토마토", `${name}에는 계란 2개와 토마토를 곁들이면 단백질과 식이섬유가 보강됩니다.`);
    add("레시피: 통밀 오픈샌드", "통밀빵 위에 그릭요거트 또는 아보카도, 계란, 토마토를 올리고 후추만 더하세요.");
  }
  if (/밥|rice|고구마|감자|파스타|면|noodle|떡/.test(text) || carbs > protein * 2.8) {
    add("조합: 단백질 먼저", `${name}에는 닭가슴살, 두부, 계란, 생선 중 하나를 붙이면 혈당과 포만감이 안정적입니다.`);
    add("레시피: 균형 한 접시", "탄수화물 1, 단백질 1, 채소 2 비율로 담고 소스는 따로 찍어 먹는 방식이 좋습니다.");
  }
  if (/닭|chicken|생선|연어|salmon|스테이크|beef|돼지|pork|계란|egg|두부|tofu/.test(text) || protein >= 18) {
    add("조합: 채소 + 탄수 소량", `${name}에는 샐러드/브로콜리와 현미밥 또는 고구마 소량을 더하면 회복식으로 좋습니다.`);
    add("레시피: 고단백 볼", "단백질 식품에 채소 2가지, 탄수화물 0.5공기, 올리브오일/레몬 소량을 더하세요.");
  }
  if (/샐러드|토마토|오이|브로콜리|상추|채소|야채|vegetable|salad/.test(text) || fiber >= 4) {
    add("조합: 단백질 추가", `${name}에는 그릭요거트, 계란, 두부, 닭가슴살을 더하면 한 끼 완성도가 올라갑니다.`);
    add("레시피: 단백질 샐러드", "채소에 단백질 1가지와 견과류 조금, 식초/레몬 기반 드레싱을 더하세요.");
  }
  if (/과일|사과|바나나|딸기|포도|fruit|banana|apple/.test(text) || sugar > 10) {
    add("조합: 단백질/지방", `${name}에는 그릭요거트나 견과류를 곁들이면 당 흡수가 완만해집니다.`);
    add("레시피: 요거트 볼", "무가당 그릭요거트에 과일, 견과류, 시나몬을 더하고 꿀은 생략하세요.");
  }
  if (sodium > 800 || /라면|찌개|국|탕|김치|햄|소시지/.test(text)) {
    add("조합: 수분 + 칼륨", `${name}는 나트륨이 높을 수 있어 물, 토마토, 오이, 바나나처럼 수분/칼륨 식품을 더하세요.`);
  }
  if (!ideas.length) {
    add("조합: 단백질 + 채소", `${name}에는 단백질 1가지와 채소 2가지를 붙이면 가장 안정적입니다.`);
    add("레시피: 10분 균형식", "주재료를 굽거나 데친 뒤 채소, 현미밥 소량, 올리브오일/레몬 또는 간장 소량으로 마무리하세요.");
  }
  return ideas.slice(0, 4);
}

function renderFoodPairingSuggestions(foodItem) {
  const container = $("#foodPairingSuggestions");
  if (!container) return;
  const ideas = foodPairingIdeas(foodItem);
  container.innerHTML = ideas
    .map((idea, index) => `<button type="button" data-pairing="${index}" title="${escapeHtml(idea.detail)}">${escapeHtml(idea.label)}</button>`)
    .join("");
  container._ideas = ideas;
}

function appendPairingToNote(idea) {
  if (!idea) return;
  const note = $("#note");
  const addition = `${idea.label}: ${idea.detail}`;
  note.value = note.value.trim() ? `${note.value.trim()}\n${addition}` : addition;
}

function applyFoodCandidate(candidate, options = {}) {
  activeFoodBase = candidate;
  activeFoodSource = candidate.source;
  if (options.replaceName) $("#foodName").value = candidate.name;
  $("#baseUnitLabel").textContent = `${candidate.unit || "1인분"} 기준`;
  updateNutritionFromActiveFood();
  renderFoodPairingSuggestions(candidate);
  if (candidate.image && !selectedPhoto) setAutoPhoto(candidate.image, candidate.source);
  if (options.renderAfter !== false) render();
}

function updateNutritionFromActiveFood() {
  if (!activeFoodBase) return;
  const amount = Math.max(number($("#amount").value), 0.1);
  ["calories", "carbs", "protein", "fat", "fiber", "sugar", "sodium"].forEach((key) => {
    const digits = key === "calories" || key === "sodium" ? 0 : 1;
    $(`#${key}`).value = round(number(activeFoodBase[key]) * amount, digits);
  });
}

function setAutoPhoto(url, source) {
  autoPhoto = url;
  if (selectedPhoto) return;
  $("#photoPreview").alt = $("#foodName").value.trim() || "음식 사진";
  $("#photoPreview").src = url;
  $("#photoSource").textContent = source || "자동";
  $(".photo-box").classList.add("has-image");
}

function totalsForDay(day) {
  return day.meals.reduce(
    (sum, meal) => {
      ["calories", "carbs", "protein", "fat", "fiber", "sugar", "sodium"].forEach((key) => {
        sum[key] += number(meal[key]);
      });
      return sum;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
  );
}

function exerciseTotalsForDay(day) {
  return day.exercises.reduce(
    (sum, exercise) => {
      sum.calories += number(exercise.calories);
      sum.minutes += number(exercise.minutes);
      return sum;
    },
    { calories: 0, minutes: 0 },
  );
}

function bmiValue() {
  const heightM = number(settings.height) / 100;
  return heightM && number(settings.weight) ? number(settings.weight) / (heightM * heightM) : 0;
}

function bmiCategory(bmi) {
  if (!bmi) return { label: "정보 없음", tone: "" };
  if (bmi < 18.5) return { label: "저체중", tone: "warn" };
  if (bmi < 23) return { label: "정상", tone: "good" };
  if (bmi < 25) return { label: "주의", tone: "warn" };
  if (bmi < 30) return { label: "비만 1단계", tone: "warn" };
  return { label: "비만 2단계", tone: "warn" };
}

function healthyWeightRange() {
  const heightM = number(settings.height) / 100;
  return heightM ? [18.5 * heightM * heightM, 22.9 * heightM * heightM] : [0, 0];
}

function recommendedTargets() {
  const profile = bodyShapeProfiles[settings.bodyShape] || bodyShapeProfiles.balanced;
  const height = number(settings.height) || 170;
  const weight = number(settings.weight) || 70;
  const goalWeight = number(settings.goalWeight) || weight;
  const exerciseDays = weeklyExerciseDays();
  const activityFactor = exerciseDays >= 5 ? 1.55 : exerciseDays >= 3 ? 1.42 : 1.32;
  const bmr = 10 * weight + 6.25 * height - 5 * 32 + 5;
  const directionBias = goalWeight < weight - 1 ? -0.1 : goalWeight > weight + 1 ? 0.08 : 0;
  const calories = Math.round((bmr * activityFactor * (1 + directionBias + profile.calorieBias)) / 50) * 50;
  const protein = Math.round(goalWeight * profile.proteinPerKg);
  const fatCalories = calories * profile.fatRatio;
  const fat = Math.round(fatCalories / 9);
  const carbs = Math.max(80, Math.round((calories - protein * 4 - fat * 9) / 4));
  const fiber = Math.max(25, Math.round(calories / 1000 * 14));
  const sugar = Math.round(Math.min(55, calories * 0.08 / 4));
  const water = Math.round((Math.max(2, weight * 0.033 + (exerciseDays >= 3 ? 0.35 : 0)) * 10)) / 10;
  return { calories, protein, carbs, fat, fiber, sugar, water, profile, activityFactor, exerciseDays };
}

function weeklyExerciseDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${currentDate}T12:00:00`);
    date.setDate(date.getDate() - index);
    return getDay(toDateInputValue(date)).exercises.length > 0 ? 1 : 0;
  }).reduce((sum, value) => sum + value, 0);
}

function applyRecommendedTargets() {
  const rec = recommendedTargets();
  settings.calories = rec.calories;
  settings.protein = rec.protein;
  settings.carbs = rec.carbs;
  settings.fat = rec.fat;
  settings.fiber = rec.fiber;
  settings.sugar = rec.sugar;
  settings.water = rec.water;
  save();
  render();
}

function nutritionScore(day, totals, exerciseTotals) {
  if (!day.meals.length) return 0;
  const net = totals.calories - exerciseTotals.calories;
  let score = 100;
  score -= Math.min(24, Math.abs(net - settings.calories) / settings.calories * 45);
  if (totals.protein < settings.protein) score -= 14;
  if (totals.fiber < settings.fiber) score -= 10;
  if (totals.sodium > settings.sodium) score -= 12;
  if (totals.sugar > settings.sugar) score -= 8;
  if (day.water < settings.water) score -= 6;
  if (exerciseTotals.minutes >= 25) score += 4;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function macroRatios(totals) {
  const carbKcal = totals.carbs * 4;
  const proteinKcal = totals.protein * 4;
  const fatKcal = totals.fat * 9;
  const total = carbKcal + proteinKcal + fatKcal || 1;
  return {
    carbs: Math.round((carbKcal / total) * 100),
    protein: Math.round((proteinKcal / total) * 100),
    fat: Math.round((fatKcal / total) * 100),
  };
}

function fastingProgress() {
  const [hour, minute] = settings.fastingStart.split(":").map(Number);
  const now = new Date();
  const start = new Date();
  start.setHours(hour || 0, minute || 0, 0, 0);
  if (now < start) start.setDate(start.getDate() - 1);
  const elapsedHours = (now - start) / 36e5;
  return { elapsedHours, percent: Math.min(100, (elapsedHours / settings.fastingHours) * 100) };
}

function analyzeDay(day, totals, exerciseTotals) {
  const items = [];
  if (!day.meals.length) {
    return [{ type: "", title: "기록 대기", body: "음식명, 바코드, 즐겨찾기 중 편한 방식으로 첫 식사를 추가하세요." }];
  }
  const net = totals.calories - exerciseTotals.calories;
  const remaining = settings.calories - net;
  const ratios = macroRatios(totals);
  items.push({
    type: Math.abs(remaining) <= settings.calories * 0.1 ? "good" : remaining < 0 ? "warn" : "",
    title: remaining >= 0 ? "칼로리 예산" : "칼로리 초과",
    body: remaining >= 0 ? `${round(remaining)}kcal 남았습니다. 운동 소모를 반영한 순섭취 기준입니다.` : `${round(Math.abs(remaining))}kcal 초과했습니다. 다음 끼니는 단백질과 채소 위주가 좋습니다.`,
  });
  items.push({
    type: totals.protein >= settings.protein ? "good" : "warn",
    title: "단백질",
    body: totals.protein >= settings.protein ? `${round(totals.protein, 1)}g으로 목표를 채웠습니다.` : `${round(settings.protein - totals.protein, 1)}g 부족합니다. 닭가슴살, 두부, 생선, 달걀이 잘 맞습니다.`,
  });
  items.push({
    type: ratios.carbs > 65 || ratios.fat > 38 ? "warn" : "good",
    title: "탄단지 비율",
    body: `탄수 ${ratios.carbs}% · 단백질 ${ratios.protein}% · 지방 ${ratios.fat}%입니다.`,
  });
  items.push({
    type: totals.sodium > settings.sodium || totals.sugar > settings.sugar ? "warn" : "good",
    title: "품질 신호",
    body: `식이섬유 ${round(totals.fiber, 1)}g, 당류 ${round(totals.sugar, 1)}g, 나트륨 ${round(totals.sodium)}mg입니다.`,
  });
  items.push(mealCombinationInsight(day, totals));
  return items;
}

function nextMealRecommendation(day, totals, exerciseTotals) {
  const remainingCalories = settings.calories - (totals.calories - exerciseTotals.calories);
  const proteinGap = settings.protein - totals.protein;
  const fiberGap = settings.fiber - totals.fiber;
  const carbGap = settings.carbs - totals.carbs;
  const sodiumHigh = totals.sodium > settings.sodium * 0.75;
  const sugarHigh = totals.sugar > settings.sugar * 0.75;
  const nextMeal = inferNextMeal(day);

  let title = `${nextMeal} 추천`;
  let reason = "오늘 섭취량을 기준으로 다음 식사의 우선순위를 계산했습니다.";
  let options = [];

  if (!day.meals.length) {
    title = "첫 식사 추천";
    reason = "아직 식단 기록이 없어서 단백질과 식이섬유가 같이 있는 안정적인 시작 조합을 추천합니다.";
    options = [
      mealOption("단백질 베이스", "현미밥 0.7공기 + 닭가슴살 + 토마토", "탄수와 단백질을 과하지 않게 시작"),
      mealOption("가벼운 시작", "그릭요거트 + 바나나 + 견과류", "시간 없을 때 빠른 포만감"),
      mealOption("한식 균형", "계란 2개 + 두부 + 채소 반찬", "단백질과 부피감 확보"),
    ];
    return { title, reason, options };
  }

  if (proteinGap > 25) {
    reason = `단백질이 ${round(proteinGap, 1)}g 부족합니다. 다음 식사는 단백질을 먼저 잡는 게 좋습니다.`;
    options = [
      mealOption("고단백", "닭가슴살 150g + 샐러드 + 고구마", "단백질 보강과 탄수 보충"),
      mealOption("한식", "두부/계란 + 밥 반 공기 + 채소", "부담 적은 단백질 조합"),
      mealOption("간편식", "프로틴쉐이크 + 바나나 + 견과류", "운동 전후 빠른 보충"),
    ];
  } else if (fiberGap > 8) {
    reason = `식이섬유가 ${round(fiberGap, 1)}g 부족합니다. 채소와 과일을 더하면 포만감이 좋아집니다.`;
    options = [
      mealOption("섬유 보강", "샐러드 + 토마토 + 닭가슴살", "칼로리는 낮고 부피감은 큼"),
      mealOption("따뜻한 조합", "고구마 + 두부 + 브로콜리", "식이섬유와 단백질 동시 보강"),
      mealOption("간식", "사과 또는 딸기 + 그릭요거트", "달달하지만 비교적 안정적"),
    ];
  } else if (sodiumHigh) {
    reason = "나트륨이 높은 편입니다. 다음 식사는 국물, 소스, 가공식품을 피하는 쪽이 좋습니다.";
    options = [
      mealOption("저나트륨", "연어구이 + 샐러드 + 감자", "짠맛 없이 지방과 단백질 확보"),
      mealOption("담백한 한식", "두부 + 계란 + 생채소", "국물 없는 조합"),
      mealOption("수분 보완", "토마토 + 오이 + 닭가슴살", "수분감과 단백질 보충"),
    ];
  } else if (sugarHigh) {
    reason = "당류가 이미 높은 편입니다. 다음 식사는 단맛보다 단백질과 지방을 조금 섞는 편이 안정적입니다.";
    options = [
      mealOption("혈당 안정", "계란 + 아보카도 + 샐러드", "단맛 없이 포만감 유지"),
      mealOption("단백질 중심", "닭가슴살 + 브로콜리 + 현미밥 소량", "탄수량 조절"),
      mealOption("간식 대체", "그릭요거트 무가당 + 견과류", "당류를 낮춘 간식"),
    ];
  } else if (remainingCalories < 250) {
    reason = "남은 칼로리가 적습니다. 다음 식사는 가볍고 포만감 있는 조합이 좋습니다.";
    options = [
      mealOption("가벼운 마감", "샐러드 + 토마토 + 계란 1개", "칼로리 부담 낮음"),
      mealOption("단백질 소량", "두부 반 모 + 오이", "늦은 식사에 부담 적음"),
      mealOption("수분 중심", "토마토 + 그릭요거트 소량", "허기만 가볍게 정리"),
    ];
  } else if (carbGap > 80 && exerciseTotals.minutes >= 25) {
    reason = "운동 기록이 있고 탄수화물 여유가 있습니다. 회복을 위해 탄수+단백질 조합이 좋습니다.";
    options = [
      mealOption("회복식", "현미밥 + 닭가슴살 + 채소", "운동 후 회복 균형"),
      mealOption("간편 회복", "고구마 + 그릭요거트", "탄수와 단백질 보충"),
      mealOption("한 그릇", "비빔밥 소량 + 계란 추가", "탄수와 단백질을 함께"),
    ];
  } else {
    reason = "현재 조합이 크게 치우치지 않았습니다. 다음 식사는 목표 체형에 맞게 균형을 유지하세요.";
    options = [
      mealOption("균형식", "현미밥 + 단백질 1가지 + 채소 2가지", "가장 안정적인 기본형"),
      mealOption("가벼운 단백질", "연어/두부 + 샐러드", "지방과 단백질 균형"),
      mealOption("외식 대응", "밥은 반, 단백질은 충분히, 국물은 적게", "외식 때 실천 쉬움"),
    ];
  }

  return { title, reason, options };
}

function mealOption(label, menu, why) {
  return { label, menu, why };
}

function exerciseOption(label, workout, why) {
  return { label, workout, why };
}

function weeklyExerciseMinutes() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${currentDate}T12:00:00`);
    date.setDate(date.getDate() - index);
    return exerciseTotalsForDay(getDay(toDateInputValue(date))).minutes;
  }).reduce((sum, value) => sum + value, 0);
}

function exerciseRecommendation(day, totals, exerciseTotals) {
  const bmi = bmiValue();
  const category = bmiCategory(bmi);
  const profile = bodyShapeProfiles[settings.bodyShape] || bodyShapeProfiles.balanced;
  const weekDays = weeklyExerciseDays();
  const weekMinutes = weeklyExerciseMinutes();
  const checkin = day.checkin || {};
  const sleep = number(checkin.sleep);
  const steps = number(checkin.steps);
  const net = totals.calories - exerciseTotals.calories;
  const remaining = settings.calories - net;
  const proteinGap = settings.protein - totals.protein;
  const fatigue = (sleep && sleep < 6) || /피곤|낮음|나쁨|스트레스/.test(String(checkin.mood || ""));

  let title = `${profile.label} 운동 추천`;
  let reason = `BMI ${bmi ? round(bmi, 1) : "정보 없음"}(${category.label}), 주 ${weekDays}일 운동, 오늘 ${round(exerciseTotals.minutes)}분 기록을 반영했습니다.`;
  let options = [];

  if (!number(settings.height) || !number(settings.weight)) {
    title = "기초 정보 입력 필요";
    reason = "키와 체중을 입력하면 BMI와 목표 체형에 맞춰 운동 강도를 더 정확히 추천합니다.";
    options = [
      exerciseOption("안전 시작", "빠르게 걷기 20분", "체력 정보를 모으기 전 부담이 적은 기본 활동"),
      exerciseOption("움직임 점검", "스트레칭 10분 + 가벼운 스쿼트 2세트", "관절 가동 범위와 컨디션 확인"),
      exerciseOption("기록 우선", "오늘 걸음 수와 수면 입력", "추천 정확도를 높이는 건강 신호 확보"),
    ];
    return { title, reason, options };
  }

  if (fatigue) {
    title = "회복 우선 운동";
    reason = sleep ? `수면 ${round(sleep, 1)}시간으로 회복 신호가 약합니다. 오늘은 강도를 낮추는 편이 좋습니다.` : "컨디션 메모에 피로 신호가 있습니다. 회복을 해치지 않는 운동을 추천합니다.";
    options = [
      exerciseOption("저강도", "걷기 25-35분", "혈액순환과 칼로리 소모를 챙기되 피로 누적은 줄임"),
      exerciseOption("회복", "요가/스트레칭 15분", "허리, 고관절, 어깨 긴장 완화"),
      exerciseOption("가벼운 근활성", "맨몸 스쿼트 2세트 + 플랭크 2세트", "운동 루틴은 유지하면서 부담은 낮춤"),
    ];
  } else if (exerciseTotals.minutes >= 60) {
    title = "오늘은 회복 보강";
    reason = `이미 ${round(exerciseTotals.minutes)}분 운동했습니다. 추가 운동보다 회복과 수분, 단백질 보강이 우선입니다.`;
    options = [
      exerciseOption("쿨다운", "산책 10-15분", "심박을 천천히 낮추고 회복 촉진"),
      exerciseOption("모빌리티", "하체/등 스트레칭 12분", "근육 뭉침과 다음 운동 피로 감소"),
      exerciseOption("영양 연동", "단백질 25g + 물 500ml", "운동 효과를 식단 회복으로 연결"),
    ];
  } else if (bmi >= 25 || settings.bodyShape === "fatLoss") {
    title = "체지방 감량형 운동";
    reason = `${category.label} 범위와 목표 체형을 고려해 관절 부담은 낮추고 지속 시간을 확보하는 구성을 추천합니다.`;
    options = [
      exerciseOption("지방 연소", "빠르게 걷기 35-45분", "지속 가능하고 회복 부담이 낮은 칼로리 소모"),
      exerciseOption("근손실 방지", "전신 근력 30분", "스쿼트, 푸시업, 로우 동작으로 큰 근육 사용"),
      exerciseOption("짧은 루틴", "계단 8분 + 걷기 15분", "시간이 부족할 때 활동량을 빠르게 확보"),
    ];
  } else if (settings.bodyShape === "muscular") {
    title = "근육 증가형 운동";
    reason = proteinGap > 20 ? `단백질이 ${round(proteinGap, 1)}g 부족합니다. 근력운동은 좋지만 운동 후 단백질 보강까지 같이 잡으세요.` : "근육질 목표에 맞춰 점진적 과부하와 회복을 함께 보는 구성이 좋습니다.";
    options = [
      exerciseOption("상체/하체", "근력운동 45-60분", "큰 동작 4-5개를 세트별로 기록"),
      exerciseOption("보조 유산소", "걷기 20분", "근성장 방해 없이 활동량 보강"),
      exerciseOption("회복", "운동 후 스트레칭 10분", "다음 훈련 품질 유지"),
    ];
  } else if (settings.bodyShape === "athletic") {
    title = "수행 능력형 운동";
    reason = remaining > 350 ? "탄수화물과 칼로리 여유가 있어 운동 수행을 위한 세션을 넣기 좋습니다." : "오늘 섭취 예산을 고려해 강도는 중간 수준으로 유지하는 편이 좋습니다.";
    options = [
      exerciseOption("인터벌", "러닝 1분 빠르게/2분 천천히 x 8", "심폐 능력과 체력 향상"),
      exerciseOption("크로스", "자전거 35분", "무릎 부담을 낮추면서 유산소 확보"),
      exerciseOption("코어", "플랭크 + 런지 + 로우 25분", "운동 수행에 필요한 중심 안정성"),
    ];
  } else if (settings.bodyShape === "lean") {
    title = "슬림 탄탄형 운동";
    reason = "체지방을 낮추면서 라인을 유지하려면 근력과 저강도 유산소를 같이 가져가는 편이 좋습니다.";
    options = [
      exerciseOption("라인", "전신 근력 35분", "하체, 등, 코어를 중심으로 탄탄함 확보"),
      exerciseOption("가벼운 유산소", "빠르게 걷기 25분", "감량 흐름을 돕는 낮은 부담"),
      exerciseOption("마무리", "요가/스트레칭 12분", "자세와 유연성 보강"),
    ];
  } else {
    title = "균형형 운동 추천";
    reason = "현재 목표는 균형형입니다. 꾸준함을 만들 수 있는 중강도 운동 조합이 가장 잘 맞습니다.";
    options = [
      exerciseOption("기본", "빠르게 걷기 30분", "오늘 활동량을 안정적으로 확보"),
      exerciseOption("근력", "전신 근력 25분", "기초대사량과 자세 유지에 도움"),
      exerciseOption("컨디션", "스트레칭 10분", "수면 전 긴장 완화"),
    ];
  }

  if (!exerciseTotals.minutes && steps && steps < 5000) {
    reason += ` 걸음 수가 ${round(steps)}보라서 짧은 걷기라도 추가하면 좋습니다.`;
  } else if (!exerciseTotals.minutes && weekDays < 3) {
    reason += " 이번 주 운동 빈도가 낮아 오늘은 20분만 채워도 흐름이 좋아집니다.";
  }

  return { title, reason, options };
}

function inferNextMeal(day) {
  const logged = new Set(day.meals.map((meal) => meal.mealType));
  const missing = mealOrder.find((mealType) => !logged.has(mealType));
  if (missing) return missing;
  const hour = new Date().getHours();
  if (hour < 10) return "아침";
  if (hour < 15) return "점심";
  if (hour < 20) return "저녁";
  return "간식";
}

function mealCombinationInsight(day, totals) {
  const hasProteinMeal = day.meals.some((meal) => number(meal.protein) >= 18);
  const hasVegetableSignal = day.meals.some((meal) => number(meal.fiber) >= 4 || /샐러드|토마토|오이|상추|브로콜리|양배추|시금치|채소|야채/.test(meal.name));
  const hasHighSodiumMeal = day.meals.some((meal) => number(meal.sodium) >= 900);
  const proteinRatio = totals.protein / Math.max(1, settings.protein);
  if (!hasProteinMeal && proteinRatio < 0.65) {
    return { type: "warn", title: "조합 개선", body: "탄수화물 중심으로 기록되어 있습니다. 다음 식사는 단백질 25-35g을 먼저 확보하세요." };
  }
  if (!hasVegetableSignal) {
    return { type: "coach", title: "조합 개선", body: "채소/과일 신호가 약합니다. 토마토, 샐러드, 브로콜리처럼 부피와 식이섬유를 더하면 포만감이 좋아집니다." };
  }
  if (hasHighSodiumMeal) {
    return { type: "warn", title: "조합 개선", body: "나트륨 높은 음식이 포함되어 있습니다. 같은 날에는 국물, 소스, 가공식품을 줄이고 물을 더 챙기세요." };
  }
  return { type: "good", title: "조합 안정", body: "단백질과 식이섬유 신호가 함께 있어 포만감과 회복에 유리한 조합입니다." };
}

function recommendations(day, totals, exerciseTotals) {
  const list = [];
  const net = totals.calories - exerciseTotals.calories;
  const remaining = settings.calories - net;
  const rec = recommendedTargets();
  list.push({ type: "coach", title: `${rec.profile.label} 목표`, body: `${rec.calories}kcal · 단백질 ${rec.protein}g · 탄수 ${rec.carbs}g · 지방 ${rec.fat}g 추천. ${rec.profile.note}` });
  if (settings.protein - totals.protein > 20) list.push({ type: "warn", title: "단백질 보강", body: "다음 식사에 닭가슴살, 두부, 계란, 그릭요거트 중 하나를 붙이세요." });
  if (settings.fiber - totals.fiber > 8) list.push({ type: "", title: "식이섬유 보강", body: "샐러드, 고구마, 과일, 콩류를 한 가지 추가하면 포만감이 좋아집니다." });
  if (totals.sodium > settings.sodium) list.push({ type: "warn", title: "나트륨 조절", body: "국물과 소스 양을 줄이고 물을 0.5L 정도 더 챙기세요." });
  if (remaining > 450) list.push({ type: "", title: "남은 예산 활용", body: `${round(remaining)}kcal 남았습니다. 운동 후라면 단백질+탄수 조합이 좋습니다.` });
  if (exerciseTotals.minutes < 20) list.push({ type: "", title: "활동 추가", body: "10-20분 걷기만 추가해도 순섭취와 리포트 점수가 좋아집니다." });
  if (totals.carbs > settings.carbs * 1.15 && totals.protein < settings.protein) list.push({ type: "warn", title: "탄수-단백질 균형", body: "탄수는 목표보다 빠른데 단백질이 부족합니다. 다음 끼니는 밥/면보다 살코기, 두부, 생선을 먼저 잡으세요." });
  if (!list.length) list.push({ type: "good", title: "오늘 흐름 좋음", body: "현재 조합이 안정적입니다. 수분과 수면만 놓치지 마세요." });
  return list;
}

function render() {
  const day = getDay();
  const totals = totalsForDay(day);
  const exerciseTotals = exerciseTotalsForDay(day);
  const score = nutritionScore(day, totals, exerciseTotals);
  const net = totals.calories - exerciseTotals.calories;
  const remaining = settings.calories - net;

  $("#dateInput").value = currentDate;
  $("#weekdayLabel").textContent = dateLabel(currentDate);
  $("#dayTitle").textContent = "Ethan's Health Analysis";

  syncSettingsInputs();
  syncMealTypeDefault();
  renderSidebarLists();

  $("#dayScore").textContent = score;
  $("#scoreRing").style.setProperty("--score", `${score * 3.6}deg`);
  $("#scoreTitle").textContent = score >= 80 ? "균형이 좋습니다" : score >= 55 ? "조정하면 좋아집니다" : "기록을 채워보세요";
  $("#scoreSummary").textContent = day.meals.length ? `${day.meals.length}개 식단 · ${day.exercises.length}개 운동 · 물 ${round(day.water, 1)}L` : "식단, 운동, 수분을 합쳐 하루 점수를 계산합니다.";
  $("#heroBrief").innerHTML = renderHeroBrief(totals, exerciseTotals);

  $("#remainingCalories").textContent = `${round(remaining)}kcal`;
  $("#calorieMeter").style.width = `${Math.min(100, (net / Math.max(settings.calories, 1)) * 100)}%`;
  $("#calorieStatus").textContent = `목표 대비 ${round((net / Math.max(settings.calories, 1)) * 100)}%`;
  $("#netCalories").textContent = `${round(net)}kcal`;
  $("#intakeTotal").textContent = `섭취 ${round(totals.calories)}`;
  $("#exerciseOffset").textContent = `운동 ${round(exerciseTotals.calories)}`;
  $("#proteinTotal").textContent = `${round(totals.protein, 1)}g`;
  $("#proteinMeter").style.width = `${Math.min(100, (totals.protein / Math.max(settings.protein, 1)) * 100)}%`;
  $("#proteinStatus").textContent = `목표 ${round(settings.protein)}g`;
  $("#waterTotal").textContent = `${round(day.water, 1)}L`;

  const bmi = bmiValue();
  const category = bmiCategory(bmi);
  $("#bmiValue").textContent = bmi ? round(bmi, 1) : "-";
  $("#bmiStatus").textContent = bmi ? `${category.label} · 목표 ${round(settings.goalWeight, 1)}kg` : "신체 정보 필요";
  $("#bmiMarker").style.left = `${Math.max(2, Math.min(98, ((bmi || 18.5) - 14) / 22 * 100))}%`;

  const fasting = fastingProgress();
  $("#fastingValue").textContent = `${round(fasting.elapsedHours, 1)}h`;
  $("#fastingMeter").style.width = `${fasting.percent}%`;
  $("#fastingStatus").textContent = `목표 ${settings.fastingHours}h · ${round(fasting.percent)}%`;

  $("#scoreBadge").textContent = `${score}점`;
  $("#analysisList").innerHTML = analyzeDay(day, totals, exerciseTotals).map(renderAnalysisItem).join("");
  renderNextMealCoach(day, totals, exerciseTotals);
  $("#mealTargetSummary").textContent = `식사 예산: ${mealOrder.map((label) => `${label} ${round(mealBudget(label))}`).join(" · ")} kcal`;
  renderMealTimeline(day);
  renderExerciseCoach(day, totals, exerciseTotals);
  renderExercise(day, exerciseTotals);
  renderMedication(day);
  renderCheckin(day);
  renderReport(day, totals, exerciseTotals);
  $("#recommendationList").innerHTML = recommendations(day, totals, exerciseTotals).map(renderAnalysisItem).join("");
  renderTargetPlanPreview();
  renderRecentFoods();
}

function renderNextMealCoach(day, totals, exerciseTotals) {
  const next = nextMealRecommendation(day, totals, exerciseTotals);
  $("#nextMealTitle").textContent = next.title;
  $("#nextMealReason").textContent = next.reason;
  $("#nextMealOptions").innerHTML = next.options
    .map((option) => `
      <article class="next-option">
        <span>${escapeHtml(option.label)}</span>
        <strong>${escapeHtml(option.menu)}</strong>
        <p>${escapeHtml(option.why)}</p>
      </article>
    `)
    .join("");
}

function renderExerciseCoach(day, totals, exerciseTotals) {
  const coach = exerciseRecommendation(day, totals, exerciseTotals);
  $("#exerciseCoachTitle").textContent = coach.title;
  $("#exerciseCoachReason").textContent = coach.reason;
  $("#exerciseCoachOptions").innerHTML = coach.options
    .map((option) => `
      <article class="next-option">
        <span>${escapeHtml(option.label)}</span>
        <strong>${escapeHtml(option.workout)}</strong>
        <p>${escapeHtml(option.why)}</p>
      </article>
    `)
    .join("");
}

function renderHeroBrief(totals, exerciseTotals) {
  const rows = [
    ["탄수", `${round(totals.carbs, 1)}g`, settings.carbs],
    ["지방", `${round(totals.fat, 1)}g`, settings.fat],
    ["식이섬유", `${round(totals.fiber, 1)}g`, settings.fiber],
    ["당류", `${round(totals.sugar, 1)}g`, settings.sugar],
    ["나트륨", `${round(totals.sodium)}mg`, settings.sodium],
    ["운동", `${round(exerciseTotals.minutes)}분`, 30],
  ];
  return rows.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function syncSettingsInputs() {
  $("#targetCalories").value = settings.calories;
  $("#targetProtein").value = settings.protein;
  $("#targetCarbs").value = settings.carbs;
  $("#targetFat").value = settings.fat;
  $("#targetWater").value = settings.water;
  $("#heightInput").value = settings.height;
  $("#weightInput").value = settings.weight;
  $("#goalWeightInput").value = settings.goalWeight;
  $("#bodyShapeInput").value = settings.bodyShape;
  $("#breakfastTarget").value = settings.mealTargets.breakfast;
  $("#lunchTarget").value = settings.mealTargets.lunch;
  $("#dinnerTarget").value = settings.mealTargets.dinner;
  $("#snackTarget").value = settings.mealTargets.snack;
  $("#fastingStart").value = settings.fastingStart;
  $("#fastingHours").value = settings.fastingHours;
}

function syncMealTypeDefault() {
  if (!$("#foodName").value.trim()) $("#mealType").value = preferredMealTypeForCurrentDate();
}

function renderTargetPlanPreview() {
  const rec = recommendedTargets();
  $("#targetPlanPreview").innerHTML = [
    ["체형", rec.profile.label],
    ["칼로리", `${rec.calories}kcal`],
    ["단백질", `${rec.protein}g`],
    ["탄수", `${rec.carbs}g`],
    ["지방", `${rec.fat}g`],
  ].map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  $("#goalHint").textContent = `${rec.profile.label} 기준`;
  $("#profileHint").textContent = `목표 ${round(settings.goalWeight, 1)}kg`;
}

function renderSidebarLists() {
  $("#quickFoods").innerHTML = quickFoods.map((name) => `<button type="button" data-food="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
  $("#favoriteCount").textContent = `${settings.favorites.length}개`;
  $("#favoriteFoods").innerHTML = settings.favorites.length
    ? settings.favorites.slice(0, 12).map((item, index) => `<button type="button" data-favorite="${index}">${escapeHtml(item.name)}</button>`).join("")
    : `<span class="muted">식단 입력에서 즐겨찾기를 눌러 추가하세요.</span>`;
}

function mealBudget(mealType) {
  const key = mealKeys[mealType];
  return (settings.calories * number(settings.mealTargets[key])) / 100;
}

function mealTotals(meals) {
  return meals.reduce((sum, meal) => sum + number(meal.calories), 0);
}

function renderMealTimeline(day) {
  const timeline = $("#mealTimeline");
  if (!day.meals.length) {
    timeline.innerHTML = `<div class="empty-state">아직 기록된 식단이 없습니다.</div>`;
    return;
  }
  timeline.innerHTML = mealOrder
    .map((mealType) => {
      const meals = day.meals.filter((meal) => meal.mealType === mealType);
      const total = mealTotals(meals);
      const budget = mealBudget(mealType);
      const items = meals.map(renderMealItem).join("");
      return `
        <section class="meal-group">
          <div class="meal-group-head">
            <h3>${mealType}</h3>
            <span>${round(total)} / ${round(budget)} kcal</span>
          </div>
          <div class="meter small"><i style="width:${Math.min(100, (total / Math.max(budget, 1)) * 100)}%"></i></div>
          ${items || `<div class="empty-state compact">기록 없음</div>`}
        </section>
      `;
    })
    .join("");
}

function renderMealItem(meal) {
  return `
    <article class="log-item">
      <img class="log-photo" src="${escapeHtml(meal.photo || placeholderSvg(meal.name))}" alt="${escapeHtml(meal.name)}" />
      <div>
        <div class="log-title">
          <h3>${escapeHtml(meal.name)}</h3>
          <span>${round(meal.amount, 1)}배</span>
        </div>
        <p>${escapeHtml(meal.note || meal.source || "메모 없음")}</p>
        <div class="chips">
          <span>${round(meal.calories)} kcal</span>
          <span>단 ${round(meal.protein, 1)}g</span>
          <span>섬 ${round(meal.fiber, 1)}g</span>
          <span>품질 ${meal.quality || "-"}</span>
        </div>
      </div>
      <button class="icon-btn remove-btn" type="button" data-kind="meal" data-id="${escapeHtml(meal.id)}" aria-label="삭제">×</button>
    </article>
  `;
}

function renderExercise(day, exerciseTotals) {
  $("#exerciseMinutesTotal").textContent = `${round(exerciseTotals.minutes)}분`;
  $("#exerciseBurnTotal").textContent = `${round(exerciseTotals.calories)}kcal`;
  const timeline = $("#exerciseTimeline");
  if (!day.exercises.length) {
    timeline.innerHTML = `<div class="empty-state">아직 기록된 운동이 없습니다.</div>`;
    return;
  }
  timeline.innerHTML = day.exercises
    .map((exercise) => `
      <article class="log-item">
        <div class="exercise-icon">M</div>
        <div>
          <div class="log-title">
            <h3>${escapeHtml(exercise.name)}</h3>
            <span>${round(exercise.minutes)}분</span>
          </div>
          <p>${escapeHtml(exercise.note || "메모 없음")}</p>
          <div class="chips">
            <span>${round(exercise.calories)} kcal</span>
            <span>${escapeHtml(intensityLabel(exercise.intensity))}</span>
            <span>MET ${round(exercise.met, 1)}</span>
          </div>
        </div>
        <button class="icon-btn remove-btn" type="button" data-kind="exercise" data-id="${escapeHtml(exercise.id)}" aria-label="삭제">×</button>
      </article>
    `)
    .join("");
}

function renderMedication(day) {
  const meds = day.medications || [];
  const taken = meds.filter((med) => med.status === "복용함").length;
  const planned = meds.filter((med) => med.status === "예정").length;
  const skipped = meds.filter((med) => med.status === "건너뜀").length;
  $("#medicationBadge").textContent = `${meds.length}개`;
  $("#medicationMiniStats").textContent = meds.length ? `복용 ${taken} · 예정 ${planned} · 건너뜀 ${skipped}` : "복용 기록 없음";
  $("#medicationSummary").innerHTML = medicationInsights(meds).map(renderAnalysisItem).join("");

  const timeline = $("#medicationTimeline");
  if (!meds.length) {
    timeline.innerHTML = `<div class="empty-state">아직 기록된 약이나 영양제가 없습니다.</div>`;
    return;
  }
  timeline.innerHTML = meds
    .slice()
    .sort((a, b) => String(a.time || "99:99").localeCompare(String(b.time || "99:99")))
    .map((med) => `
      <article class="log-item medication-item">
        <div class="med-icon">${med.status === "복용함" ? "✓" : med.status === "건너뜀" ? "!" : "•"}</div>
        <div>
          <div class="log-title">
            <h3>${escapeHtml(med.name)}</h3>
            <span>${escapeHtml(med.time || "시간 없음")}</span>
          </div>
          <p>${escapeHtml([med.dose, med.withMeal, med.note].filter(Boolean).join(" · ") || "메모 없음")}</p>
          <div class="chips">
            <span>${escapeHtml(med.status)}</span>
            <span>${escapeHtml(med.withMeal)}</span>
            ${med.info?.displayName ? `<span>${escapeHtml(med.info.displayName)}</span>` : ""}
            ${med.info?.source ? `<span>${escapeHtml(med.info.source)}</span>` : ""}
          </div>
        </div>
        <button class="icon-btn remove-btn" type="button" data-kind="medication" data-id="${escapeHtml(med.id)}" aria-label="삭제">×</button>
      </article>
    `)
    .join("");
}

function medicationInsights(meds) {
  if (!meds.length) {
    return [{ type: "", title: "복용 기록 대기", body: "처방약, 영양제, 복용 시간을 기록하면 식사와 함께 하루 흐름을 볼 수 있습니다." }];
  }
  const skipped = meds.filter((med) => med.status === "건너뜀");
  const emptyTime = meds.filter((med) => !med.time);
  const withMeal = meds.filter((med) => med.withMeal === "식후" || med.withMeal === "식전");
  const conflicts = detectRecordedMedicationConflicts(meds);
  const knownInfo = meds.filter((med) => med.info?.source).length;
  const items = [
    ...(conflicts.length ? [{ type: "warn", title: "충돌 가능성", body: conflicts.slice(0, 2).join(" ") }] : []),
    { type: skipped.length ? "warn" : "good", title: "복용 상태", body: skipped.length ? `${skipped.length}개를 건너뛰었습니다. 필요한 경우 다음 복용 시간을 확인하세요.` : "오늘 등록된 약은 건너뜀 없이 관리되고 있습니다." },
    { type: emptyTime.length ? "" : "good", title: "복용 시간", body: emptyTime.length ? `${emptyTime.length}개는 시간이 비어 있습니다. 알림이 필요하면 시간을 채우세요.` : "복용 시간이 모두 기록되어 있습니다." },
  ];
  if (withMeal.length) items.push({ type: "coach", title: "식사 연동", body: `${withMeal.length}개는 식사와 연결되어 있습니다. 식단 기록과 함께 보면 놓칠 가능성이 줄어듭니다.` });
  if (knownInfo) items.push({ type: "coach", title: "정보 연결", body: `${knownInfo}개 항목은 성분/주의 정보가 저장되어 다음 충돌 분석에 반영됩니다.` });
  return items;
}

function renderCheckin(day) {
  const checkin = day.checkin || {};
  $("#stepsInput").value = checkin.steps || "";
  $("#sleepInput").value = checkin.sleep || "";
  $("#waistInput").value = checkin.waist || "";
  $("#moodInput").value = checkin.mood || "";
  const items = [
    { type: number(checkin.steps) >= 8000 ? "good" : "", title: "걸음", body: checkin.steps ? `${round(checkin.steps)}보 기록했습니다.` : "걸음 수를 입력하면 활동 흐름에 반영합니다." },
    { type: number(checkin.sleep) >= 7 ? "good" : number(checkin.sleep) ? "warn" : "", title: "수면", body: checkin.sleep ? `${round(checkin.sleep, 1)}시간 잤습니다.` : "수면을 같이 보면 과식 패턴을 찾기 쉽습니다." },
  ];
  $("#checkinSummary").innerHTML = items.map(renderAnalysisItem).join("");
}

function renderReport(day, totals, exerciseTotals) {
  const score = nutritionScore(day, totals, exerciseTotals);
  $("#qualityBadge").textContent = `${score}%`;
  $("#qualityList").innerHTML = [
    { type: totals.fiber >= settings.fiber ? "good" : "warn", title: "식이섬유", body: `${round(totals.fiber, 1)}g / 목표 ${settings.fiber}g` },
    { type: totals.sodium <= settings.sodium ? "good" : "warn", title: "나트륨", body: `${round(totals.sodium)}mg / 권장 상한 ${settings.sodium}mg` },
    { type: totals.sugar <= settings.sugar ? "good" : "warn", title: "당류", body: `${round(totals.sugar, 1)}g / 기준 ${settings.sugar}g` },
    { type: streakDays() >= 3 ? "good" : "", title: "기록 연속성", body: `${streakDays()}일 연속 기록 중입니다.` },
  ].map(renderAnalysisItem).join("");
  renderBodyInsights();
  renderWeeklyTrend();
}

function renderBodyInsights() {
  const bmi = bmiValue();
  const category = bmiCategory(bmi);
  const [healthyMin, healthyMax] = healthyWeightRange();
  const weightGap = number(settings.weight) - number(settings.goalWeight);
  $("#bodyBadge").textContent = bmi ? round(bmi, 1) : "BMI";
  const items = [
    { type: category.tone, title: `BMI ${category.label}`, body: bmi ? `현재 BMI는 ${round(bmi, 1)}입니다. 키 ${round(settings.height, 1)}cm 기준 건강 체중 범위는 약 ${round(healthyMin, 1)}-${round(healthyMax, 1)}kg입니다.` : "키와 체중을 입력하면 BMI를 계산합니다." },
    { type: Math.abs(weightGap) <= 1 ? "good" : "", title: "목표 체중", body: weightGap > 0 ? `목표까지 ${round(weightGap, 1)}kg 남았습니다.` : weightGap < 0 ? `목표보다 ${round(Math.abs(weightGap), 1)}kg 낮습니다.` : "목표 체중과 같습니다." },
    { type: "coach", title: `${(bodyShapeProfiles[settings.bodyShape] || bodyShapeProfiles.balanced).label} 플랜`, body: recommendedTargets().profile.note },
  ];
  $("#bodyInsightList").innerHTML = items.map(renderAnalysisItem).join("");
}

function renderWeeklyTrend() {
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(`${currentDate}T12:00:00`);
    date.setDate(date.getDate() - (6 - index));
    return toDateInputValue(date);
  });
  const rows = dates.map((date) => {
    const day = getDay(date);
    return { date, intake: totalsForDay(day).calories, burn: exerciseTotalsForDay(day).calories };
  });
  const max = Math.max(1, ...rows.flatMap((row) => [row.intake, row.burn]));
  $("#weeklyTrend").innerHTML = rows.map((row) => {
    const label = new Intl.DateTimeFormat("ko-KR", { weekday: "short" }).format(new Date(`${row.date}T12:00:00`));
    return `
      <div class="trend-day">
        <div class="trend-bars">
          <i style="height:${Math.max(4, (row.intake / max) * 170)}px"></i>
          <i style="height:${Math.max(4, (row.burn / max) * 170)}px"></i>
        </div>
        <span>${label}</span>
        <small>${round(row.intake)} / ${round(row.burn)}</small>
      </div>
    `;
  }).join("");
}

function renderRecentFoods() {
  const recent = Object.values(records)
    .flatMap((day) => day.meals || [])
    .reverse()
    .filter((meal, index, arr) => arr.findIndex((item) => normalize(item.name) === normalize(meal.name)) === index)
    .slice(0, 16);
  $("#recentFoods").innerHTML = recent.length
    ? recent.map((meal, index) => `<button type="button" data-recent="${index}">${escapeHtml(meal.name)}</button>`).join("")
    : `<span class="muted">저장한 식단이 쌓이면 최근 음식이 표시됩니다.</span>`;
  $("#recentFoods")._recent = recent;
}

function renderAnalysisItem(item) {
  return `<div class="analysis-item ${escapeHtml(item.type || "")}"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.body)}</p></div>`;
}

function placeholderSvg(name) {
  const label = encodeURIComponent(String(name || "Food").slice(0, 10));
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'%3E%3Crect width='220' height='220' fill='%23e7f0ea'/%3E%3Ccircle cx='110' cy='90' r='54' fill='%23ffffff' opacity='.9'/%3E%3Cpath d='M58 147c29 23 75 23 104 0' stroke='%232f7d57' stroke-width='12' fill='none' stroke-linecap='round'/%3E%3Ctext x='110' y='188' text-anchor='middle' font-family='Arial' font-size='18' font-weight='700' fill='%231f2933'%3E${label}%3C/text%3E%3C/svg%3E`;
}

function streakDays() {
  let streak = 0;
  const date = new Date(`${currentDate}T12:00:00`);
  while (streak < 365) {
    const key = toDateInputValue(date);
    if (!records[key]?.meals?.length) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

function addMeal(overrides = {}) {
  const day = getDay();
  const meal = {
    id: crypto.randomUUID(),
    mealType: $("#mealType").value,
    name: $("#foodName").value.trim(),
    amount: number($("#amount").value) || 1,
    unit: $("#baseUnitLabel").textContent.replace(" 기준", ""),
    calories: number($("#calories").value),
    carbs: number($("#carbs").value),
    protein: number($("#protein").value),
    fat: number($("#fat").value),
    fiber: number($("#fiber").value),
    sugar: number($("#sugar").value),
    sodium: number($("#sodium").value),
    note: $("#note").value.trim(),
    photo: selectedPhoto || autoPhoto,
    source: activeFoodSource || "직접 입력",
    quality: activeFoodBase?.quality || qualityFromForm(),
    createdAt: new Date().toISOString(),
    ...overrides,
  };
  day.meals.push(meal);
  rememberMealType(meal.mealType);
  resetMealForm();
  save();
  render();
  notify(`${meal.name} 식단을 저장했습니다.`);
}

function qualityFromForm() {
  const fields = ["calories", "carbs", "protein", "fat", "fiber", "sugar", "sodium"];
  return Math.min(90, 35 + fields.filter((id) => number($(`#${id}`).value) > 0).length * 8);
}

function resetMealForm() {
  $("#mealForm").reset();
  $("#mealType").value = preferredMealTypeForCurrentDate();
  $("#amount").value = 1;
  $("#baseUnitLabel").textContent = "1인분 기준";
  $("#lookupStatus").textContent = "2글자 이상 입력하면 자동 입력";
  $("#foodSuggestions").innerHTML = "";
  renderFoodPairingSuggestions(null);
  selectedPhoto = "";
  autoPhoto = "";
  activeFoodBase = null;
  activeFoodSource = "";
  $("#photoPreview").removeAttribute("src");
  $("#photoSource").textContent = "자동";
  $(".photo-box").classList.remove("has-image");
}

function addFavorite() {
  const name = $("#foodName").value.trim();
  if (!name) return;
  const favorite = activeFoodBase || {
    name,
    calories: number($("#calories").value),
    carbs: number($("#carbs").value),
    protein: number($("#protein").value),
    fat: number($("#fat").value),
    fiber: number($("#fiber").value),
    sugar: number($("#sugar").value),
    sodium: number($("#sodium").value),
    unit: $("#baseUnitLabel").textContent.replace(" 기준", ""),
    source: "즐겨찾기",
    image: autoPhoto,
    quality: qualityFromForm(),
  };
  settings.favorites = settings.favorites.filter((item) => normalize(item.name) !== normalize(favorite.name));
  settings.favorites.unshift(favorite);
  settings.favorites = settings.favorites.slice(0, 24);
  save();
  render();
  $("#lookupStatus").textContent = "즐겨찾기에 저장됨";
  notify(`${favorite.name} 즐겨찾기에 저장했습니다.`);
}

function addExercise() {
  const day = getDay();
  const name = $("#exerciseName").value.trim();
  const base = getExerciseBase(name);
  const intensity = number($("#exerciseIntensity").value) || 1;
  day.exercises.push({
    id: crypto.randomUUID(),
    name,
    minutes: number($("#exerciseMinutes").value),
    intensity,
    met: base.met * intensity,
    calories: number($("#exerciseCalories").value),
    note: $("#exerciseNote").value.trim(),
    createdAt: new Date().toISOString(),
  });
  $("#exerciseForm").reset();
  $("#exerciseMinutes").value = 30;
  $("#exerciseIntensity").value = "1";
  $("#exerciseStatus").textContent = "운동 선택 대기";
  save();
  render();
  notify(`${name} 운동을 저장했습니다.`);
}

function addMedication() {
  const day = getDay();
  const name = $("#medName").value.trim();
  const info = activeMedicationInfo && medicationInfoMatchesQuery(activeMedicationInfo, name)
    ? activeMedicationInfo
    : localMedicationInfo(name);
  day.medications.push({
    id: crypto.randomUUID(),
    name,
    dose: $("#medDose").value.trim(),
    time: $("#medTime").value,
    status: $("#medStatus").value,
    withMeal: $("#medWithMeal").value,
    note: $("#medNote").value.trim(),
    info: medicationInfoSnapshot(info),
    createdAt: new Date().toISOString(),
  });
  $("#medicationForm").reset();
  $("#medStatus").value = "복용함";
  $("#medWithMeal").value = "상관 없음";
  activeMedicationInfo = null;
  clearTimeout(medicationLookupTimer);
  renderMedicationLookup(null, [], "한국어/영문 이름을 입력하면 성분/효과/주의사항을 검색합니다.");
  save();
  render();
  notify(`${name} 복용 기록을 저장했습니다.`);
}

function getExerciseBase(name) {
  const q = normalize(name);
  const entry = Object.entries(exerciseDb).find(([key, value]) => normalize(key) === q || value.aliases.some((alias) => normalize(alias) === q));
  return entry ? { name: entry[0], ...entry[1] } : { name, met: 3.5, aliases: [] };
}

function estimateExerciseCalories() {
  const name = $("#exerciseName").value.trim();
  if (!name) return;
  const base = getExerciseBase(name);
  const minutes = number($("#exerciseMinutes").value);
  const intensity = number($("#exerciseIntensity").value) || 1;
  const weight = number(settings.weight) || 70;
  const calories = (base.met * intensity * 3.5 * weight * minutes) / 200;
  $("#exerciseCalories").value = round(calories);
  $("#exerciseStatus").textContent = `${base.name} · MET ${round(base.met * intensity, 1)}`;
}

function intensityLabel(value) {
  const intensity = number(value);
  if (intensity < 0.95) return "가볍게";
  if (intensity > 1.1) return "강하게";
  return "보통";
}

function switchTab(tabName) {
  document.querySelectorAll(".tabbar button").forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  $("#dietTab").hidden = tabName !== "diet";
  $("#exerciseTab").hidden = tabName !== "exercise";
  $("#medicationTab").hidden = tabName !== "medication";
  $("#planTab").hidden = tabName !== "plan";
  $("#reportTab").hidden = tabName !== "report";
}

function handleTabKeydown(event) {
  const buttons = [...document.querySelectorAll(".tabbar button")];
  const currentIndex = buttons.indexOf(event.currentTarget);
  if (currentIndex < 0) return;
  const keyMap = {
    ArrowRight: currentIndex + 1,
    ArrowDown: currentIndex + 1,
    ArrowLeft: currentIndex - 1,
    ArrowUp: currentIndex - 1,
    Home: 0,
    End: buttons.length - 1,
  };
  if (!(event.key in keyMap)) return;
  event.preventDefault();
  const nextIndex = (keyMap[event.key] + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  switchTab(buttons[nextIndex].dataset.tab);
}

function setDateOffset(days) {
  const next = new Date(`${currentDate}T12:00:00`);
  next.setDate(next.getDate() + days);
  currentDate = toDateInputValue(next);
  render();
}

function checkDateRollover() {
  const today = toDateInputValue(new Date());
  if (today !== lastSeenToday && currentDate === lastSeenToday) {
    currentDate = today;
    resetMealForm();
    render();
  }
  lastSeenToday = today;
}

function init() {
  $("#logoutBtn").addEventListener("click", logoutAccount);
  $("#foodOptions").innerHTML = foodDb.map((item) => `<option value="${escapeHtml(item.name)}"></option>`).join("");
  $("#exerciseOptions").innerHTML = Object.keys(exerciseDb).map((name) => `<option value="${escapeHtml(name)}"></option>`).join("");

  $("#foodName").addEventListener("input", scheduleFoodLookup);
  $("#foodName").addEventListener("paste", () => setTimeout(scheduleFoodLookup, 0));
  $("#foodName").addEventListener("compositionend", scheduleFoodLookup);
  $("#foodName").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    clearTimeout(lookupTimer);
    runFoodLookup($("#foodName").value, { autoApply: true });
  });
  $("#foodName").addEventListener("change", () => runFoodLookup($("#foodName").value, { autoApply: true }));
  $("#amount").addEventListener("input", updateNutritionFromActiveFood);
  $("#lookupFoodBtn").addEventListener("click", () => runFoodLookup($("#foodName").value, { autoApply: true }));
  $("#favoriteBtn").addEventListener("click", addFavorite);
  $("#foodSuggestions").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-candidate]");
    const candidate = $("#foodSuggestions")._candidates?.[number(button?.dataset.candidate)];
    if (candidate) applyFoodCandidate(candidate, { replaceName: true });
  });
  $("#foodPairingSuggestions").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-pairing]");
    const idea = $("#foodPairingSuggestions")._ideas?.[number(button?.dataset.pairing)];
    appendPairingToNote(idea);
  });

  $("#quickFoods").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-food]");
    if (!button) return;
    $("#foodName").value = button.dataset.food;
    runFoodLookup(button.dataset.food, { autoApply: true });
  });
  $("#favoriteFoods").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-favorite]");
    const item = settings.favorites[number(button?.dataset.favorite)];
    if (!item) return;
    $("#foodName").value = item.name;
    applyFoodCandidate(item, { replaceName: false });
  });
  $("#recentFoods").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-recent]");
    const item = $("#recentFoods")._recent?.[number(button?.dataset.recent)];
    if (!item) return;
    $("#foodName").value = item.name;
    applyFoodCandidate(item, { replaceName: false });
    switchTab("diet");
  });

  $("#barcodeBtn").addEventListener("click", async () => {
    const code = $("#barcodeInput").value.trim();
    if (!code) return;
    $("#barcodeStatus").textContent = "조회 중";
    try {
      const candidate = await fetchBarcodeProduct(code);
      $("#foodName").value = candidate.name;
      applyFoodCandidate(candidate, { replaceName: false });
      $("#barcodeStatus").textContent = "적용됨";
    } catch {
      $("#barcodeStatus").textContent = "결과 없음";
      notify("바코드 결과를 찾지 못했습니다. 음식명으로 검색해 주세요.", "error");
    }
  });

  $("#photoInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      selectedPhoto = reader.result;
      $("#photoPreview").src = selectedPhoto;
      $("#photoSource").textContent = "내 사진";
      $(".photo-box").classList.add("has-image");
    };
    reader.readAsDataURL(file);
  });

  $("#mealForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if ($("#foodName").value.trim()) addMeal();
  });

  ["exerciseName", "exerciseMinutes", "exerciseIntensity"].forEach((id) => {
    $(`#${id}`).addEventListener("input", estimateExerciseCalories);
    $(`#${id}`).addEventListener("change", estimateExerciseCalories);
  });
  $("#quickExercises").innerHTML = quickExercises.map((name) => `<button type="button" data-exercise="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
  $("#quickExercises").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-exercise]");
    if (!button) return;
    $("#exerciseName").value = button.dataset.exercise;
    estimateExerciseCalories();
  });
  $("#exerciseForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if ($("#exerciseName").value.trim()) addExercise();
  });
  $("#saveExerciseBtn").addEventListener("click", (event) => {
    event.preventDefault();
    if ($("#exerciseName").value.trim()) addExercise();
  });

  $("#medicationForm").addEventListener("submit", (event) => {
    event.preventDefault();
    if ($("#medName").value.trim()) addMedication();
  });
  $("#medName").addEventListener("input", scheduleMedicationLookup);
  $("#medName").addEventListener("paste", () => setTimeout(scheduleMedicationLookup, 0));
  $("#medName").addEventListener("compositionend", scheduleMedicationLookup);
  $("#medName").addEventListener("change", () => lookupMedication($("#medName").value));
  document.querySelectorAll("[data-med-language]").forEach((button) => {
    button.addEventListener("click", () => switchMedicationLanguage(button.dataset.medLanguage));
  });

  $("#checkinForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const day = getDay();
    day.checkin = {
      steps: number($("#stepsInput").value),
      sleep: number($("#sleepInput").value),
      waist: number($("#waistInput").value),
      mood: $("#moodInput").value,
    };
    save();
    render();
    notify("체크인을 저장했습니다.");
  });

  $("#plannerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    settings.mealTargets = {
      breakfast: number($("#breakfastTarget").value),
      lunch: number($("#lunchTarget").value),
      dinner: number($("#dinnerTarget").value),
      snack: number($("#snackTarget").value),
    };
    settings.fastingStart = $("#fastingStart").value || "20:00";
    settings.fastingHours = number($("#fastingHours").value) || 14;
    save();
    render();
    notify("목표 플랜을 저장했습니다.");
  });
  $("#generateTargetBtn").addEventListener("click", applyRecommendedTargets);

  ["targetCalories", "targetProtein", "targetCarbs", "targetFat", "targetWater", "heightInput", "weightInput", "goalWeightInput"].forEach((id) => {
    $(`#${id}`).addEventListener("input", (event) => {
      const map = {
        targetCalories: "calories",
        targetProtein: "protein",
        targetCarbs: "carbs",
        targetFat: "fat",
        targetWater: "water",
        heightInput: "height",
        weightInput: "weight",
        goalWeightInput: "goalWeight",
      };
      settings[map[id]] = number(event.target.value);
      save();
      estimateExerciseCalories();
      render();
    });
  });
  $("#bodyShapeInput").addEventListener("change", (event) => {
    settings.bodyShape = event.target.value;
    save();
    render();
  });

  $("#prevDay").addEventListener("click", () => setDateOffset(-1));
  $("#nextDay").addEventListener("click", () => setDateOffset(1));
  $("#dateInput").addEventListener("change", () => {
    currentDate = $("#dateInput").value || toDateInputValue(new Date());
    render();
  });
  $("#waterMinus").addEventListener("click", () => {
    const day = getDay();
    day.water = Math.max(0, number(day.water) - 0.25);
    save();
    render();
  });
  $("#waterPlus").addEventListener("click", () => {
    const day = getDay();
    day.water = number(day.water) + 0.25;
    save();
    render();
  });
  $("#clearDayBtn").addEventListener("click", async () => {
    const confirmed = await askConfirm(`${currentDate} 기록을 삭제할까요? 이 날짜의 식단, 운동, 약 기록이 모두 삭제됩니다.`, "오늘 기록 삭제");
    if (!confirmed) return;
    delete records[currentDate];
    save();
    render();
    notify(`${currentDate} 기록을 삭제했습니다.`);
  });
  $("#exportBtn").addEventListener("click", () => {
    try {
      const blob = new Blob([JSON.stringify({ user: currentUser?.username, exportedAt: new Date().toISOString(), settings, records }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `ethan-health-${currentUser?.id || "export"}-${currentDate}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      notify("내보내기 파일을 준비했습니다.");
    } catch {
      notify("내보내기를 완료하지 못했습니다.", "error");
    }
  });

  $("#mealTimeline").addEventListener("click", handleRemoveClick);
  $("#exerciseTimeline").addEventListener("click", handleRemoveClick);
  $("#medicationTimeline").addEventListener("click", handleRemoveClick);
  document.querySelectorAll(".tabbar button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
    button.addEventListener("keydown", handleTabKeydown);
  });
  document.addEventListener("error", handleImageError, true);
  renderMedicationLanguageButtons();
  setInterval(checkDateRollover, 60000);

  switchTab("diet");
  render();
}

function handleRemoveClick(event) {
  const button = event.target.closest(".remove-btn");
  if (!button) return;
  const day = getDay();
  if (button.dataset.kind === "meal") day.meals = day.meals.filter((meal) => meal.id !== button.dataset.id);
  if (button.dataset.kind === "exercise") day.exercises = day.exercises.filter((exercise) => exercise.id !== button.dataset.id);
  if (button.dataset.kind === "medication") day.medications = day.medications.filter((med) => med.id !== button.dataset.id);
  save();
  render();
}

function handleImageError(event) {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  const fallback = placeholderSvg(image.alt || $("#foodName").value || "Food");
  image.src = fallback;
  if (image === $("#photoPreview") && !selectedPhoto) {
    autoPhoto = fallback;
    $("#photoSource").textContent = "기본";
  }
}

initAuth();
