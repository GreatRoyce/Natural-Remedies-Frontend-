import remedyOne from "../assets/c1a61715a4ece0cccaef016e982cf1c7.jpg";
import remedyTwo from "../assets/bd25ddc5e8c11524774024fb0517ebcd.jpg";
import remedyThree from "../assets/af2878a8c71ed196b27f90141ecc57b2.jpg";
import remedyFour from "../assets/f92ad62791ff6ecc128838292061fe8c.jpg";

export const remedyData = [
  {
    id: 1,
    title: "Lemon Water",
    category: "Detox",
    image: remedyOne,
    contributor: "Royce",
    ingredients: `
- 1 fresh lemon
- 1 cup warm water
- Optional: 1 tsp honey
    `,
    duration: "5 minutes",
    preparation: `
1. Squeeze fresh lemon juice into warm (not boiling) water.
2. Stir well.
3. Add honey if desired.
    `,
    usage: `
Drink first thing in the morning on an empty stomach.
Supports digestion, hydration, and mild detoxification.
    `,
  },

  {
    id: 2,
    title: "Ginger Honey Tea",
    category: "Cold & Flu",
    image: remedyTwo,
    contributor: "Royce",
    ingredients: `
- 1 inch fresh ginger (sliced)
- 1 cup water
- 1 tbsp honey
- Optional: squeeze of lemon
    `,
    duration: "10-15 minutes",
    preparation: `
1. Boil water and add sliced ginger.
2. Let simmer for 10 minutes.
3. Strain into a cup.
4. Add honey and optional lemon.
    `,
    usage: `
Drink 1-2 times daily to soothe sore throat, reduce cough, and support immunity.
    `,
  },

  {
    id: 3,
    title: "Turmeric Milk",
    category: "Inflammation",
    image: remedyThree,
    contributor: "Royce",
    ingredients: `
- 1 cup milk (or almond milk)
- 1/2 tsp turmeric powder
- 1/4 tsp black pepper
- 1 tsp honey
    `,
    duration: "5-7 minutes",
    preparation: `
1. Heat milk gently (do not boil).
2. Add turmeric and black pepper.
3. Stir well and simmer for 2-3 minutes.
4. Add honey before drinking.
    `,
    usage: `
Drink at night to reduce inflammation, support joints, and improve sleep quality.
    `,
  },

  {
    id: 4,
    title: "Garlic Booster",
    category: "Immunity",
    image: remedyFour,
    contributor: "Royce",
    ingredients: `
- 1 raw garlic clove (crushed)
- 1 tbsp honey
- Optional: 1 tsp olive oil
    `,
    duration: "2 minutes",
    preparation: `
1. Crush garlic and let sit for 1 minute.
2. Mix with honey (and olive oil if desired).
    `,
    usage: `
Take once daily to support immune health.
Best taken in the morning.
    `,
  },
];
