import CharacterCard from "./ui/CharacterCard"
import MenuCard from "./ui/MenuCard"


export default function Home() {
  const menuCards = [
   {
    title: "PROJECTS",
    tagline: "// CASE STUDIES",
    color: "#b88cff",
    icon: "/PROJECTS.svg",
  },
  {
    title: "SKILLS",
    tagline: "// TECH STACK",
    color: "#b88cff",
    icon: "/SKILLS.svg",
  },
  {
    title: "EXPERIENCE",
    tagline: "// WORK HISTORY",
    color: "#b88cff",
    icon: "/EXPERIENCE.svg",
  },
  {
    title: "SERVICES",
    tagline: "// WHAT I OFFER",
    color: "#b88cff",
    icon: "/SERVICES.svg",
  },
  {
    title: "BLOG",
    tagline: "// WRITING",
    color: "#b88cff",
    icon: "/BLOGS.svg",
  },
  {
    title: "EXPERIMENTS",
    tagline: "// SIDE PROJECTS",
    color: "#b88cff",
    icon: "/EXPERIMENTS.svg",
  },
  {
    title: "RESUME",
    tagline: "// DOWNLOAD",
    color: "#b88cff",
    icon: "/RESUME.svg",
  },
  {
    title: "CONTACT",
    tagline: "// GET IN TOUCH",
    color: "#b88cff",
    icon: "/CONTACT.svg",
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
