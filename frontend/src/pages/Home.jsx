import Hero from "../components/Hero";
import QuickIntro from "../components/QuickIntro";
import WhatWeDo from "../components/WhatWeDo";
import WeeklyPrograms from "../components/WeeklyPrograms";
import ImpactCommunity from "../components/ImpactCommunity";
import StudentTestimonials from "../components/StudentTestimonials";
import LatestUpdates from "../components/LatestUpdates";

const Home = () => {
  return (
    <main>
      <Hero />
      <QuickIntro />
      <WhatWeDo />
      <WeeklyPrograms />
      <ImpactCommunity />
      <StudentTestimonials />
      <LatestUpdates />
    </main>
  );
};

export default Home;
