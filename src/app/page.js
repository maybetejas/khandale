import CharacterCard from "./ui/CharacterCard"
import MenuCard from "./ui/MenuCard"

export default function Home() {
  const menuCards = [
    {
      title: "SKILLS TREE",
      tagline: "// SYSTEM UPGRADE",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "PROJECT DELTA",
      tagline: "// HIGH PRIORITY",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "MISSION LOG",
      tagline: "// ARCHIVE",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "ASSET VAULT",
      tagline: "// STORAGE",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "CONTACT NODE",
      tagline: "// COMMUNICATION",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "EXPERIMENTS",
      tagline: "// LAB MODE",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "DATA CORE",
      tagline: "// PROCESSING",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "TERMINAL",
      tagline: "// DIRECT ACCESS",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "ANALYTICS",
      tagline: "// INSIGHTS",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "SECURITY",
      tagline: "// ENCRYPTED",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "ROADMAP",
      tagline: "// FUTURE OPS",
      color: "#b88cff",
      icon: "/ss.svg",
    },
    {
      title: "ARCHIVE",
      tagline: "// HISTORY",
      color: "#b88cff",
      icon: "/ss.svg",
    },
  ];

  return (
    <div className="dashboard">
      <CharacterCard />
      <div id="cardGrid">
        {menuCards.map((card, index) => (
          <MenuCard
            key={index}
            title={card.title}
            tagline={card.tagline}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>

    </div>
  )

}
