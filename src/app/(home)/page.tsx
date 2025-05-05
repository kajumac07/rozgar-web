import CategorySectionComponent from "./components/CategorySection";
import HeroSectionComp from "./components/Hero";
import InfoSectionComponent from "./components/InfoSection";
import NewJobListingComponent from "./components/NJobListening";

export default function Home() {
  return (
    <div>
      <HeroSectionComp />
      <CategorySectionComponent />
      <InfoSectionComponent />
      <NewJobListingComponent />
    </div>
  );
}
