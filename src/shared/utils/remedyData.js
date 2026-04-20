import remedyOne from "../../assets/c1a61715a4ece0cccaef016e982cf1c7.jpg";
import remedyTwo from "../../assets/bd25ddc5e8c11524774024fb0517ebcd.jpg";
import remedyThree from "../../assets/af2878a8c71ed196b27f90141ecc57b2.jpg";
import remedyFour from "../../assets/f92ad62791ff6ecc128838292061fe8c.jpg";

export const remedyData = [
  {
    id: 1,
    title: "Lemon Water",
    category: "Detox",
    image: remedyOne,
    contributor: "Royce",
    ingredients: [
      { id: 1, text: "1 fresh lemon" },
      { id: 2, text: "1 cup warm water" },
      { id: 3, text: "Optional: 1 tsp honey" }
    ],
    duration: "5 minutes",
    preparation: [
      { id: 1, text: "Squeeze fresh lemon juice into warm (not boiling) water." },
      { id: 2, text: "Stir well." },
      { id: 3, text: "Add honey if desired." }
    ],
    usage: "Drink first thing in the morning on an empty stomach. Supports digestion, hydration, and mild detoxification."
  },
  {
    id: 2,
    title: "Ginger Honey Tea",
    category: "Cold & Flu",
    image: remedyTwo,
    contributor: "Royce",
    ingredients: [
      { id: 1, text: "1 inch fresh ginger (sliced)" },
      { id: 2, text: "1 cup water" },
      { id: 3, text: "1 tbsp honey" },
      { id: 4, text: "Optional: squeeze of lemon" }
    ],
    duration: "10-15 minutes",
    preparation: [
      { id: 1, text: "Boil water and add sliced ginger." },
      { id: 2, text: "Let simmer for 10 minutes." },
      { id: 3, text: "Strain into a cup." },
      { id: 4, text: "Add honey and optional lemon." }
    ],
    usage: "Drink 1-2 times daily to soothe sore throat, reduce cough, and support immunity."
  },
  {
    id: 3,
    title: "Turmeric Milk",
    category: "Inflammation",
    image: remedyThree,
    contributor: "Royce",
    ingredients: [
      { id: 1, text: "1 cup milk (or almond milk)" },
      { id: 2, text: "1/2 tsp turmeric powder" },
      { id: 3, text: "1/4 tsp black pepper" },
      { id: 4, text: "1 tsp honey" }
    ],
    duration: "5-7 minutes",
    preparation: [
      { id: 1, text: "Heat milk gently (do not boil)." },
      { id: 2, text: "Add turmeric and black pepper." },
      { id: 3, text: "Stir well and simmer for 2-3 minutes." },
      { id: 4, text: "Add honey before drinking." }
    ],
    usage: "Drink at night to reduce inflammation, support joints, and improve sleep quality."
  },
  {
    id: 4,
    title: "Garlic Booster",
    category: "Immunity",
    image: remedyFour,
    contributor: "Royce",
    ingredients: [
      { id: 1, text: "1 raw garlic clove (crushed)" },
      { id: 2, text: "1 tbsp honey" },
      { id: 3, text: "Optional: 1 tsp olive oil" }
    ],
    duration: "2 minutes",
    preparation: [
      { id: 1, text: "Crush garlic and let sit for 1 minute." },
      { id: 2, text: "Mix with honey (and olive oil if desired)." }
    ],
    usage: "Take once daily to support immune health. Best taken in the morning."
  }
];