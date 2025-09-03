const mockReels = [
  {
    id: "1",
    title: "Morning Routine That Changed My Life",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    niche: "Lifestyle",
    script: "Wake up at 5 AM. Start with meditation for 10 minutes. Then workout for 30 minutes. Make a healthy breakfast. Plan your day. This simple routine transformed my productivity and mental health.",
    stats: { likes: 12500, views: 89000, shares: 2300 },
    creator: "@lifestyle_guru"
  },
  {
    id: "2", 
    title: "Quick Cooking Hack Everyone Should Know",
    thumbnail: "https://images.unsplash.com/photo-1556909114-6b89c4b6e3e7?w=400&h=600&fit=crop",
    niche: "Food",
    script: "Here's a game-changing cooking hack: Add a splash of pasta water to your sauce. The starch helps bind everything together. Your pasta will taste restaurant-quality every time!",
    stats: { likes: 8900, views: 67000, shares: 1800 },
    creator: "@chef_secrets"
  },
  {
    id: "3",
    title: "3 Productivity Apps That Actually Work",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
    niche: "Tech",
    script: "Stop downloading random productivity apps. These 3 actually work: Notion for organizing everything, Todoist for task management, and Forest for staying focused. Game changers!",
    stats: { likes: 15600, views: 102000, shares: 3200 },
    creator: "@tech_productivity"
  },
  {
    id: "4",
    title: "Transform Your Space on a Budget",
    thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=600&fit=crop",
    niche: "Home",
    script: "Your space affects your mood. Here's how to transform any room for under $100: Add plants, change the lighting, rearrange furniture, and add one statement piece. Instant upgrade!",
    stats: { likes: 9800, views: 71000, shares: 2100 },
    creator: "@home_vibes"
  },
  {
    id: "5",
    title: "Mindset Shift That Made Me Successful",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop",
    niche: "Motivation",
    script: "I stopped asking 'Why me?' and started asking 'How can I grow from this?' Every challenge became a chance to level up. This one mindset shift changed everything.",
    stats: { likes: 22100, views: 156000, shares: 4800 },
    creator: "@mindset_master"
  }
];

const tones = [
  { value: "funny", label: "Funny" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "motivational", label: "Motivational" },
  { value: "educational", label: "Educational" }
];

const languages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "hinglish", label: "Hinglish" }
];