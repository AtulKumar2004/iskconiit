import { motion, useReducedMotion } from "framer-motion";

const sections = [
  {
    id: "what-is-it",
    eyebrow: "Hare Krishna Philosophy",
    title: "What Is It?",
    mantra: [
      "Hare Krishna Hare Krishna",
      "Krishna Krishna Hare Hare",
      "Hare Rama Hare Rama",
      "Rama Rama Hare Hare",
    ],
    summary:
      "The maha-mantra is the sublime method for reviving our Krishna consciousness.",
  },
  {
    id: "the-key",
    eyebrow: "Consciousness is the Key",
    title: "The Key",
    image: "/modes.png",
    caption:
      "All living beings in the material world are controlled like puppets by the three modes of nature. Those modes are in turn controlled by Lord Sri Krishna, the Supreme Personality of Godhead.",
    paragraphs: [
      "As living spiritual souls we are all originally Krishna conscious entities, but due to our association with matter from time immemorial, our consciousness is now polluted by material atmosphere. In this polluted concept of life, we are all trying to exploit the resources of material nature, but actually we are becoming more and more entangled in her complexities. This illusion is called maya, or hard struggle for existence for winning over the stringent laws of material nature. This illusory struggle against the material nature can at once be stopped by revival of our Krishna consciousness.",
      "Krishna consciousness is not an artificial imposition on the mind. This consciousness is the original energy of the living entity. When we hear the transcendental vibration, this consciousness is revived and the process is recommended by authorities for this age. By practical experience also, we can perceive that by chanting this maha-mantra, or the great chanting for deliverance, one can at once feel transcendental ecstasy from the spiritual stratum.",
      "When one is factually on the plane of spiritual understanding, surpassing the stages of sense, mind and intelligence, one is situated on the transcendental plane. This chanting of Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare, Hare Rama, Hare Rama, Rama Rama, Hare Hare is directly enacted from the spiritual platform, surpassing all lower status of consciousness, namely sensual, mental, and intellectual.",
    ],
  },
  {
    id: "process-goal",
    eyebrow: "Krishna's Name",
    title: "The Process and the Goal",
    paragraphs: [
      "There is no need of understanding the language of the mantra, nor is there any need of mental speculation, nor any intellectual adjustment for chanting this maha-mantra. It springs automatically from the spiritual platform, and as such, anyone can take part in this transcendental sound vibration without any previous qualification and dance in ecstasy. We have seen it practically. Even a child can take part in the chanting, or even a dog can take part in it.",
      "This chanting should be heard from the lips of a pure devotee of the Lord so that immediate effect can be achieved. As far as possible, chanting from the lips of a non-devotee should be avoided, as much as milk touched by the lips of a serpent causes poisonous effect.",
      "The word Hara is a form of addressing the energy of the Lord. Both Krishna and Rama are forms of addressing directly the Lord and they mean, \"the highest pleasure eternal.\" Hara is the supreme pleasure potency of the Lord. This potency, when addressed as Hare, helps us in reaching the Supreme Lord.",
      "The material energy, called maya, is also one of the multi-potencies of the Lord, as much as we are also marginal potency of the Lord. The living entities are described as superior energy than matter. When the superior energy is in contact with the inferior energy, it becomes an incompatible situation. But when the supreme marginal potency is in contact with the spiritual potency, Hara, it becomes the happy, normal condition of the living entity.",
    ],
  },
  {
    id: "make-life-sublime",
    eyebrow: "Chant the Maha Mantra",
    title: "Make Your Life Sublime!",
    image: "/dancing.png",
    caption:
      "Lord Caitanya taught this philosophy through the chanting of the holy name, which is the sound incarnation of the Lord. Since the Lord is the absolute whole, there is no difference between His holy name and His transcendental form.",
    reverse: true,
    mantra: [
      "Hare Krishna Hare Krishna",
      "Krishna Krishna Hare Hare",
      "Hare Rama Hare Rama",
      "Rama Rama Hare Hare",
    ],
    paragraphs: [
      "The three words, namely Hara, Krishna, and Rama, are transcendental seeds of the maha-mantra, and the chanting is a spiritual call for the Lord and His internal energy Hara for giving protect the conditioned soul. This chanting is exactly like the genuine cry of a child for its mother. Mother Hara helps the devotee achieve the grace of the Supreme Father, Hari or Krishna, and the Lord reveals Himself to the devotee who chants this mantra sincerely.",
      "Therefore no other means of spiritual realization is as effective in this age of quarrel and hypocrisy as the chanting of the maha-mantra: Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare.",
    ],
  },
  {
    id: "bhakti-brief",
    eyebrow: "Bhakti in Brief",
    title: "The Nectar of Devotion",
    paragraphs: [
      "Bhakti means devotional service. Every person in this world is serving something, driven by affection and the taste it provides. A family man serves for his loved ones, a philanthropist serves for humanity, and a nationalist serves for the nation. This driving taste is called rasa. Material rasa is sweet for a moment but quickly fades, so we keep changing roles and chasing new forms of enjoyment. This cycle of taking and renouncing is known as bhoga-tyaga. The happiness that comes from sense gratification is capala-sukha, flickering and unstable, and it never satisfies the soul for long.",
      "Material achievements and roles end with the body. In any field of activity, the results of our actions are finished at death. Bhakti-rasa, however, is amrita, a taste that does not die. Bhagavad-gita teaches that even a little advancement in devotional service saves one from the greatest danger of wasting this human life. The law of destiny, or daiva, awards the next body from 8,400,000 forms according to our present actions. When our life is engaged in Krishna consciousness, the future becomes auspicious, and the path continues instead of being reset by loss and confusion.",
      "Devotional service is not a forced rejection of life; it is a positive, loving engagement with the Supreme. As the heart is purified, the senses become fit to serve, and service becomes natural and joyful. Under the guidance of the acarya, devotion matures from regulated practice to spontaneous eagerness. The many rasas of devotion unfold, and the soul tastes a steady joy that does not depend on changing circumstances. This is why bhakti is described as eternal and complete.",
      "Every living being has a natural propensity to love. The missing point is where to place that love so that it brings harmony rather than frustration. Bhakti teaches that Krishna is the supreme beloved. When love is offered to Krishna, love for family, society, and all beings becomes purified and balanced. It is like watering the root of a tree: the nourishment goes to every leaf and branch. In the same way, when the heart is connected to Krishna, all relationships are strengthened in the right spirit.",
      "Material civilization may advance in comfort, yet the soul remains restless because the root is still unattended. The Nectar of Devotion explains the simple method of turning the one switch that brightens everything: love for Krishna. As soon as this love awakens, the fire of dissatisfaction is cooled, and life gains meaning beyond temporary success. Self-realization and realization of Krishna come together, just as seeing the sunrise allows us to see ourselves. Bhakti restores that light and gives the soul its true home.",
    ],
  },
  {
    id: "essence",
    eyebrow: "The Essence",
    title: "Of Vedic Knowledge",
    image: "/gita.png",
    list: [
      "Krishna is the Supreme Absolute Truth.",
      "He possesses all energies, material and spiritual.",
      "He is the ocean of rasa, the taste of relationship.",
      "Living entities are His separated parts.",
      "Being minute, they can be conditioned by material energy.",
      "In liberation, they are free from material nature.",
      "Reality is one and different from Sri Hari (abheda and bheda).",
      "Pure devotional service is the highest duty for all beings.",
      "Pure love of Krishna is the ultimate goal of life.",
    ],
  },
];

const About = () => {
  const reduceMotion = useReducedMotion();

  const containerVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 },
        },
      };

  const itemVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <main className="bg-[#F8F5EF] text-[#241d20]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#D4AF37]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#4A1F2D]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.7),transparent_60%)]" />
        </div>
      </div>

      <div className="space-y-16 px-6 pb-20 sm:space-y-20 sm:pb-24 lg:px-12 lg:pb-28">
        {sections.map((section) => {
          const hasImage = Boolean(section.image);
          const isReversed = section.reverse;
          const isParchment = section.id === "what-is-it";
          const isSublime = section.id === "make-life-sublime";
          const centerHeadings = section.id === "process-goal" || section.id === "bhakti-brief";

          return (
            <motion.section
              key={section.id}
              className={
                isParchment
                  ? "relative overflow-hidden parchment-bg -mx-6 sm:-mx-6 lg:-mx-12"
                  : "mx-auto max-w-6xl"
              }
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {isParchment ? (
                <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:py-20 lg:px-12">
                  <motion.p
                    variants={itemVariants}
                    className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
                  >
                    {section.eyebrow}
                  </motion.p>
                  <motion.h2
                    variants={itemVariants}
                    className="mt-4 font-display text-3xl font-semibold text-[#F8F5EF] sm:text-4xl"
                  >
                    {section.title}
                  </motion.h2>
                  <motion.div
                    variants={itemVariants}
                    className="mx-auto mt-6 max-w-lg rounded-3xl border border-white/30 bg-white/10 px-6 py-5 text-sm uppercase tracking-[0.25em] text-white/90 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] sm:text-base"
                  >
                    {section.mantra?.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </motion.div>
                  {section.summary && (
                    <motion.p
                      variants={itemVariants}
                      className="mt-6 text-base text-white/80 sm:text-lg"
                    >
                      {section.summary}
                    </motion.p>
                  )}
                </div>
              ) : hasImage ? (
                <div
                  className={`grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <motion.div
                    variants={itemVariants}
                    className={`space-y-4 ${isSublime ? "text-left" : ""}`}
                  >
                    {isSublime && (
                      <motion.div variants={itemVariants} className="h-px w-12 bg-[#D4AF37]/70" />
                    )}
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                        isSublime ? "text-[#4A1F2D]/70" : "text-[#D4AF37]"
                      }`}
                    >
                      {section.eyebrow}
                    </p>
                    <h2 className="font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl">
                      <span className="heading-highlight">{section.title}</span>
                    </h2>
                    {section.paragraphs?.map((text) => (
                      <p key={text} className="text-sm leading-relaxed text-[#3b3237] sm:text-base">
                        {text}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="mt-4 space-y-2 text-sm text-[#3b3237] sm:text-base">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {isSublime && section.mantra && (
                      <motion.div
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-lg text-sm uppercase tracking-[0.25em] text-[#4A1F2D]/70 sm:text-base lg:mx-0"
                      >
                        {section.mantra.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants} className="group relative">
                    <div className="absolute -inset-2 rounded-3xl bg-[#D4AF37]/10 blur-2xl" />
                    <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_70px_-40px_rgba(18,9,12,0.45)]">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />
                      {section.caption && (
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <div className="rounded-2xl bg-black/55 px-4 py-3 text-xs leading-relaxed text-white/90 backdrop-blur">
                            {section.caption}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="mx-auto max-w-4xl text-left">
                  <motion.p
                    variants={itemVariants}
                    className={`text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37] ${
                      centerHeadings ? "text-center" : ""
                    }`}
                  >
                    {section.eyebrow}
                  </motion.p>
                  <motion.h2
                    variants={itemVariants}
                    className={`mt-4 font-display text-3xl font-semibold text-[#2a1b22] sm:text-4xl ${
                      centerHeadings ? "text-center" : ""
                    }`}
                  >
                    <span className="heading-highlight">{section.title}</span>
                  </motion.h2>
                  {section.mantra && (
                    <motion.div
                      variants={itemVariants}
                      className="mx-auto mt-6 max-w-md rounded-3xl border border-[#D4AF37]/30 bg-white/70 px-6 py-5 text-sm uppercase tracking-[0.25em] text-[#4A1F2D] shadow-[0_18px_40px_-28px_rgba(74,31,45,0.35)]"
                    >
                      {section.mantra.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </motion.div>
                  )}
                  {section.summary && (
                    <motion.p
                      variants={itemVariants}
                      className="mt-6 text-base text-[#3b3237] sm:text-lg"
                    >
                      {section.summary}
                    </motion.p>
                  )}
                  {section.paragraphs?.map((text) => (
                    <motion.p
                      key={text}
                      variants={itemVariants}
                      className="mt-4 text-sm leading-relaxed text-[#3b3237] sm:text-base"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              )}
            </motion.section>
          );
        })}
      </div>
    </main>
  );
};

export default About;
