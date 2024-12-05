//app/data/articles.tsx
export interface Article {
    id: number;
    title: string;
    tldr: string;
    author: string;
    content: string;
  }
  
  export const articles: Article[] = [
    {
      id: 1,
      title: "The Art of Strength Training",
      tldr: "Learn the basics of strength training and its benefits.",
      author: "Jane Doe",
      content: "Strength training is a key component of fitness that involves working muscles against resistance to improve strength, muscle mass, and overall health. Using tools like free weights, resistance bands, or bodyweight exercises, strength training can target different muscle groups and yield benefits such as increased muscle tone, improved bone density, and a boosted metabolism. Consistency and proper technique are essential for progress and injury prevention.\nThe core principle of strength training is progressive overload, which means gradually increasing the intensity or resistance to challenge muscles. Whether through heavier weights, more reps, or additional sets, this principle promotes muscle growth and strength. Rest and recovery are equally important to allow muscles to repair and grow stronger after each session.\nEffective exercises like squats, deadlifts, bench presses, and pull-ups are crucial for targeting major muscle groups. Strength training can be customized based on individual goals, from muscle building to fat loss. By staying consistent, incorporating variety, and focusing on proper form, strength training can help you achieve lasting physical and mental benefits.",
    },
    {
      id: 2,
      title: "Cardio Workouts for Beginners",
      tldr: "Simple cardio routines to improve your stamina.",
      author: "John Smith",
      content: "Full article content for Cardio Workouts.",
    },
    {
      id: 3,
      title: "Meditation Techniques for Anxiety",
      tldr: "Reduce stress with these meditation tips.",
      author: "Sarah Connor",
      content: "Full article content for Meditation Techniques.",
    },
    {
      id: 4,
      title: "Home Workout Routines",
      tldr: "Effective exercises you can do without equipment.",
      author: "Alice Cooper",
      content: "Full article content for Home Workouts.",
    },
    {
      id: 5,
      title: "The Truth About Sports Nutrition",
      tldr: "Debunking myths about sports diets.",
      author: "Michael Jordan",
      content: "Full article content for Sports Nutrition.",
    },
  ];
  