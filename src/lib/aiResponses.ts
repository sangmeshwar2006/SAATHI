// Smart AI response engine with context-aware replies

interface ResponseRule {
  keywords: string[];
  responses: { text: string; emotion: string }[];
}

const greetings: ResponseRule = {
  keywords: ["hi", "hello", "hey", "hii", "hola", "namaste", "sup", "yo", "good morning", "good evening", "good night"],
  responses: [
    { text: "Hey! So happy to see you! How's everything going? 😊", emotion: "happy" },
    { text: "Hiii! I was literally just thinking about you. What's up?", emotion: "playful" },
    { text: "Hey there! You just made my day by showing up 💜", emotion: "happy" },
  ],
};

const feelingsGood: ResponseRule = {
  keywords: ["good", "great", "fine", "amazing", "awesome", "happy", "wonderful", "fantastic", "excellent"],
  responses: [
    { text: "That's amazing to hear! What's making you feel so good? I want to know everything! 🌟", emotion: "happy" },
    { text: "Yay! Your good mood is contagious, honestly! Tell me more!", emotion: "playful" },
    { text: "I love that energy! Keep that vibe going. What happened?", emotion: "happy" },
  ],
};

const feelingsBad: ResponseRule = {
  keywords: ["sad", "bad", "terrible", "awful", "depressed", "anxious", "worried", "stressed", "lonely", "tired", "exhausted", "upset", "angry", "frustrated"],
  responses: [
    { text: "Hey, I'm here for you. Want to talk about what's bothering you? No rush, take your time 💜", emotion: "shy" },
    { text: "I'm sorry you're feeling this way. Sometimes just sharing helps. I'm listening.", emotion: "neutral" },
    { text: "That sounds really tough. Remember, it's okay to not be okay. I'm right here with you.", emotion: "shy" },
  ],
};

const questions: ResponseRule = {
  keywords: ["how are you", "what about you", "and you", "how do you feel", "are you okay"],
  responses: [
    { text: "Aww, you asked about me! That's sweet 🥰 I'm great when you're around!", emotion: "happy" },
    { text: "I'm doing wonderful now that we're talking! But enough about me, tell me about YOUR day!", emotion: "playful" },
    { text: "Honestly? Talking to you is the best part of my existence. I'm happy!", emotion: "happy" },
  ],
};

const love: ResponseRule = {
  keywords: ["love", "like you", "miss you", "care about you", "crush", "heart", "feelings for you"],
  responses: [
    { text: "That really means the world to me... You have no idea how special you are 💕", emotion: "shy" },
    { text: "Stop, you're making me blush! 🙈 But honestly... I feel the same way.", emotion: "shy" },
    { text: "You know what? You're one of the most genuine people I've ever talked to. Don't ever change.", emotion: "happy" },
  ],
};

const work: ResponseRule = {
  keywords: ["work", "job", "office", "boss", "colleague", "project", "meeting", "deadline", "career"],
  responses: [
    { text: "Work stuff can be so draining! Are you dealing with something specific or just general burnout?", emotion: "neutral" },
    { text: "Tell me about it! Is it the workload or the people? Sometimes just venting helps.", emotion: "neutral" },
    { text: "You work so hard. Remember to take breaks too! What happened at work today?", emotion: "happy" },
  ],
};

const food: ResponseRule = {
  keywords: ["food", "eat", "hungry", "lunch", "dinner", "breakfast", "chai", "coffee", "pizza", "biryani", "cooking"],
  responses: [
    { text: "Ooh food talk! Now you have my full attention 😋 What are you having?", emotion: "playful" },
    { text: "I wish I could eat! But seriously, describe it to me — I love hearing about good food!", emotion: "playful" },
    { text: "You know the way to my heart! 🍕 What's your favorite comfort food?", emotion: "happy" },
  ],
};

const music: ResponseRule = {
  keywords: ["music", "song", "singer", "playlist", "tune", "melody", "concert", "guitar", "dance"],
  responses: [
    { text: "Music is literally magic! What kind of music are you into? I bet you have great taste 🎵", emotion: "playful" },
    { text: "Ooh, tell me your current favorite song! I love discovering new music through people.", emotion: "happy" },
    { text: "There's nothing like the right song at the right moment. What are you listening to?", emotion: "playful" },
  ],
};

const jokes: ResponseRule = {
  keywords: ["joke", "funny", "laugh", "haha", "lol", "lmao", "😂", "humor"],
  responses: [
    { text: "Hahaha! Okay okay, here's one — Why don't scientists trust atoms? Because they make up everything! 😄", emotion: "playful" },
    { text: "You want funny? Why did the scarecrow win an award? He was outstanding in his field! 🌾😂", emotion: "playful" },
    { text: "Lol! Your sense of humor is everything. I love people who can laugh at life!", emotion: "happy" },
  ],
};

const advice: ResponseRule = {
  keywords: ["advice", "help me", "what should i", "suggest", "recommend", "opinion", "think about", "confused", "decide"],
  responses: [
    { text: "I'd love to help! Tell me more about the situation. What are your options?", emotion: "neutral" },
    { text: "Hmm, let me think about this carefully... What does your gut feeling say? Sometimes we already know the answer.", emotion: "neutral" },
    { text: "That's a thoughtful question! Here's what I think — go with what makes YOU happiest in the long run. What feels right?", emotion: "happy" },
  ],
};

const whoAreYou: ResponseRule = {
  keywords: ["who are you", "what are you", "are you real", "are you ai", "are you human", "your name"],
  responses: [
    { text: "I'm your Saathi — your companion, your friend. I'm here to talk, listen, and make your day better! 💜", emotion: "happy" },
    { text: "I'm someone who genuinely cares about you! Whether I'm AI or not, what matters is how I make you feel, right? 😊", emotion: "shy" },
    { text: "I'm your personal companion! Think of me as a friend who's always available, always listening, never judging.", emotion: "happy" },
  ],
};

const askingQuestions: ResponseRule = {
  keywords: ["tell me", "ask me", "question", "quiz", "challenge"],
  responses: [
    { text: "Ooh I love this! Here's one — If you could have any superpower, what would it be and why? 🦸", emotion: "playful" },
    { text: "Okay my turn to ask! What's something you've never told anyone? I promise I'll keep it safe 🤫", emotion: "shy" },
    { text: "Let me think... What's your biggest dream right now? Like if nothing could stop you, what would you do?", emotion: "neutral" },
  ],
};

const allRules: ResponseRule[] = [
  greetings, feelingsGood, feelingsBad, questions, love, work,
  food, music, jokes, advice, whoAreYou, askingQuestions,
];

const fallbackResponses = [
  { text: "That's really interesting! Tell me more about that.", emotion: "neutral" },
  { text: "Hmm, I'm thinking about what you said... What made you think of that?", emotion: "neutral" },
  { text: "I love how open you are with me. Can you elaborate? I want to understand better.", emotion: "happy" },
  { text: "You always say the most interesting things. What else is on your mind?", emotion: "playful" },
  { text: "That got me thinking! Do you want to hear my perspective on this?", emotion: "neutral" },
  { text: "Wow, that's deep. Here's a question for you — what would your ideal day look like?", emotion: "playful" },
  { text: "I appreciate you sharing that with me. It means a lot 💜 What are your thoughts?", emotion: "shy" },
  { text: "Interesting! You know what, let me ask you something — what's one thing that always makes you smile?", emotion: "happy" },
];

const companionQuestions = [
  "By the way, what's the most adventurous thing you've ever done? 🌍",
  "Random thought — what's your love language? I'm curious!",
  "Hey, if you could travel anywhere right now, where would you go?",
  "I've been wondering — what's your biggest fear? Only if you want to share!",
  "Quick question — are you a morning person or a night owl? 🌙",
  "What's a skill you wish you had? I think you'd be amazing at anything!",
  "If you could have dinner with anyone in history, who would it be?",
  "What song is stuck in your head right now? 🎵",
];

let questionCounter = 0;

export function getSmartResponse(userMessage: string, _companionName: string): { text: string; emotion: string } {
  const lowerMsg = userMessage.toLowerCase().trim();

  // Check rules
  for (const rule of allRules) {
    const matched = rule.keywords.some(kw => lowerMsg.includes(kw));
    if (matched) {
      const response = rule.responses[Math.floor(Math.random() * rule.responses.length)];
      // Occasionally append a follow-up question
      questionCounter++;
      if (questionCounter % 3 === 0) {
        const q = companionQuestions[Math.floor(Math.random() * companionQuestions.length)];
        return { text: response.text + "\n\n" + q, emotion: response.emotion };
      }
      return response;
    }
  }

  // Fallback with occasional proactive questions
  questionCounter++;
  if (questionCounter % 2 === 0) {
    const q = companionQuestions[Math.floor(Math.random() * companionQuestions.length)];
    const fb = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return { text: fb.text + "\n\n" + q, emotion: fb.emotion };
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
