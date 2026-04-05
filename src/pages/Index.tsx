import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import AuthScreen from "@/components/AuthScreen";
import AvatarSelectScreen from "@/components/AvatarSelectScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatScreen from "@/components/ChatScreen";
import { type CompanionAvatar, type Gender } from "@/lib/avatars";

type AppScreen = "splash" | "auth" | "avatar" | "onboarding" | "welcome" | "chat";

const Index = () => {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [userName, setUserName] = useState("Friend");
  const [userGender, setUserGender] = useState<Gender>("male");
  const [companion, setCompanion] = useState<CompanionAvatar | null>(null);

  const handleLogout = () => {
    setScreen("auth");
    setUserName("Friend");
    setCompanion(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <SplashScreen key="splash" onComplete={() => setScreen("auth")} />
        )}
      </AnimatePresence>

      {screen === "auth" && (
        <AuthScreen
          onLogin={(name, gender) => {
            setUserName(name);
            setUserGender(gender);
            setScreen("avatar");
          }}
        />
      )}

      {screen === "avatar" && (
        <AvatarSelectScreen
          userGender={userGender}
          onSelect={(avatar) => {
            setCompanion(avatar);
            setScreen("onboarding");
          }}
        />
      )}

      {screen === "onboarding" && companion && (
        <OnboardingScreen
          companion={companion}
          onComplete={(name) => {
            setUserName(name);
            setScreen("welcome");
          }}
        />
      )}

      {screen === "welcome" && companion && (
        <WelcomeScreen
          userName={userName}
          companion={companion}
          onContinue={() => setScreen("chat")}
        />
      )}

      {screen === "chat" && companion && (
        <ChatScreen userName={userName} companion={companion} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
