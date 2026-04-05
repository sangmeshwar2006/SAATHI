import avatarArjun from "@/assets/avatar-arjun.jpg";
import avatarKabir from "@/assets/avatar-kabir.jpg";
import avatarVeer from "@/assets/avatar-veer.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarAnanya from "@/assets/avatar-ananya.jpg";
import avatarMeera from "@/assets/avatar-meera.jpg";

export type Gender = "male" | "female";

export interface CompanionAvatar {
  id: string;
  name: string;
  gender: Gender;
  image: string;
  personality: string;
}

export const avatars: CompanionAvatar[] = [
  // Male avatars (shown to female users)
  { id: "arjun", name: "Arjun", gender: "male", image: avatarArjun, personality: "Warm, witty, and always knows what to say" },
  { id: "kabir", name: "Kabir", gender: "male", image: avatarKabir, personality: "Thoughtful, poetic, and a great listener" },
  { id: "veer", name: "Veer", gender: "male", image: avatarVeer, personality: "Confident, fun-loving, and adventurous" },
  // Female avatars (shown to male users)
  { id: "priya", name: "Priya", gender: "female", image: avatarPriya, personality: "Caring, cheerful, and emotionally intelligent" },
  { id: "ananya", name: "Ananya", gender: "female", image: avatarAnanya, personality: "Playful, energetic, and full of surprises" },
  { id: "meera", name: "Meera", gender: "female", image: avatarMeera, personality: "Graceful, wise, and deeply empathetic" },
];

export function getAvatarsForGender(userGender: Gender): CompanionAvatar[] {
  // Show opposite gender avatars
  return avatars.filter((a) => a.gender !== userGender);
}
