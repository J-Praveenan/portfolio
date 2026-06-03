import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  FileText,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

import {
  Github,
  Linkedin,
  Phone,
  Mail,
} from "lucide-react";


const aboutStats = [
  { label: "Years of experience", value: "3+" },
  { label: "Technologies mastered", value: "5+" },
  { label: "Companies worked with", value: "15+" },
];

const projects = [
  {
    title: "Artify Chain",
    description:
      "AI-powered NFT platform built on Cardano for generating, minting, and verifying digital artwork ownership using blockchain technology.",
    image: "/assets/projects/artify-chain.webm",
    href: "https://artify-chain-five.vercel.app/",
  },
  {
    title: "Green Dot Chain",
    description:
      "Blockchain-based sustainability platform that converts IPL dot balls into verified tree plantation records using Cardano NFTs and IPFS.",
    image: "/assets/projects/green-dot-chain.webm",
    href: "https://green-dot-chain.vercel.app/",
  },
  {
    title: "Shipment Tracker DApp",
    description:
      "Decentralized shipment tracking application using smart contracts to monitor package status, ownership, and delivery updates on-chain.",
    image: "/assets/projects/shipment-tracker.webm",
    href: "https://github.com/J-Praveenan/cardano-shipment-tracker",
  },
  {
    title: "Cardano NFT Minting DApp",
    description:
      "Cardano native asset management DApp enabling secure minting and burning of custom blockchain tokens with wallet integration.",
    image: "/assets/projects/cardano-minting-burning-dapp.webm",
    href: "https://github.com/J-Praveenan/cardano-nft-minting-dapp",
  },
  {
    title: "Cardano Vault DApp",
    description:
      "Smart contract vault application built with Aiken and MeshJS to securely lock and unlock ADA through validator scripts.",
    image: "/assets/projects/vault-app.webm",
    href: "https://github.com/J-Praveenan/cardano-vault-dapp",
  },
  {
    title: "Cardano Transaction Dashboard",
    description:
      "Real-time blockchain analytics dashboard for tracking Cardano wallet balances, transactions, and on-chain activity using Blockfrost APIs.",
    image: "/assets/projects/cardano-tx-dashboard.webm",
    href: "https://github.com/J-Praveenan/cardano-tx-dashboard",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Creating stellar user interfaces and web experiences using the latest technologies.",
    icon: Code2,
  },
  {
    service: "UX Design",
    description:
      "Building intuitive, user-centric designs that drive engagement and conversion.",
    icon: Frame,
  },
  {
    service: "SEO Optimization",
    description:
      "Enhancing your website's visibility in search engines for increased organic traffic.",
    icon: SearchCheck,
  },
  {
    service: "Responsive Design",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    service: "Backend Development",
    description:
      "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Eye,
  },
];


const skills = [
  { name: "Aiken", image: "/assets/skills/aiken.png" },
  { name: "React.js", image: "/assets/skills/react.png" },
  { name: "MeshJS", image: "/assets/skills/meshjs.png" },
  { name: "JavaScript", image: "/assets/skills/javascript.png" },
  { name: "TypeScript", image: "/assets/skills/typescript.png" },
  { name: "Next.js", image: "/assets/skills/nextjs.png" },
  { name: "Java", image: "/assets/skills/java.png" },
  { name: "SpringBoot", image: "/assets/skills/spring-boot.png" },
  { name: "MySql", image: "/assets/skills/mysql.png" }, 
  { name: "PostgreSql", image: "/assets/skills/postgresql.png" },
  { name: "Python", image: "/assets/skills/python.png" },
  { name: "Postman", image: "/assets/skills/postman.png" },
];


const certifications = [
  {
    title: "Cardano Smart Contract Development",
    image: "/assets/certifications/coinceylon.jpeg",
  },
  {
    title: "AI & Blockchain for Business Leaders",
    image: "/assets/certifications/ai-and-blockchain.png",
  },
  {
    title: "Web Design for Beginners",
    image: "/assets/certifications/web-design.png",
  },
  {
    title: "Python for Beginners",
    image: "/assets/certifications/python.png",
  }
];

const badges = [
  {
    title: "Cardano Blockchain Fundamentals",
    image: "/assets/badges/blockchain-fundamentals.png",
    href: "https://www.credly.com/badges/06de1667-150b-405d-81f0-ea92a489407c/public_url",
  },
  {
    title: "Aiken Smart Contract",
    image: "/assets/badges/aiken.png",
    href: "https://www.credly.com/badges/dd8da7e9-15ed-40ad-966b-7974359c976f/public_url",
  },
  {
    title: "AI and Blockchain",
    image: "/assets/badges/ai-and-blockchain.png",
    href: "https://www.credly.com/badges/6bc3cc4b-8aa5-4817-b3ca-0d6a75c47038/public_url",
  },
];



export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [activeCert, setActiveCert] = useState<{
  title: string;
  image: string;
} | null>(null);


  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>blockchain</span>
              <span className={styles.pill}>cardano</span>
              <span className={styles.pill}>smart-contract</span>
              <span className={styles.pill}>web3</span>
              <span className={styles.pill}>full-stack</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Praveenan J.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Cardano Blockchain Developer specializing in smart contracts, Plutus,
                on-chain and off-chain architecture, and decentralized application (dApp)
                development.
              </p>

              <div
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-6 flex items-center space-x-4"
              >
                {/* GitHub */}
                <div className="group relative">
                  <Link href="https://github.com/J-Praveenan" target="_blank">
                    <div className="rounded-full bg-white/5 p-3 transition hover:bg-white/10">
                      <Github className="h-5 w-5 text-foreground" />
                    </div>
                  </Link>
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    GitHub
                  </span>
                </div>

                {/* LinkedIn */}
                <div className="group relative">
                  <Link href="https://www.linkedin.com/in/praveenan00/" target="_blank">
                    <div className="rounded-full bg-white/5 p-3 transition hover:bg-white/10">
                      <Linkedin className="h-5 w-5 text-foreground" />
                    </div>
                  </Link>
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    LinkedIn
                  </span>
                </div>

                {/* Phone */}
                <div className="group relative">
                  <Link href="tel:+94752240286">
                    <div className="rounded-full bg-white/5 p-3 transition hover:bg-white/10">
                      <Phone className="h-5 w-5 text-foreground" />
                    </div>
                  </Link>
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    +94752240286
                  </span>
                </div>

                {/* Email */}
                <div className="group relative">
                  <Link href="mailto:praveenanjvp@gmail.com">
                    <div className="rounded-full bg-white/5 p-3 transition hover:bg-white/10">
                      <Mail className="h-5 w-5 text-foreground" />
                    </div>
                  </Link>
                  <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                    praveenanjvp@gmail.com
                  </span>
                </div>
              </div>


            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link
                href="/assets/resume/Praveenan_Resume.pdf"
                target="_blank"
                download
              >
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                   Download CV <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <Image src={"/assets/profile.png"} alt="prfile" width={680} height={500}/>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            className="my-20 flex max-w-6xl flex-col space-y-16"
          >
            {/* Intro text stays */}
            <h2 className="text-3xl font-light tracking-tighter xl:text-[40px]">
              Technologies, tools, and certifications I’ve gained while building
              real-world blockchain and web applications.
            </h2>

            {/* ===== SKILLS ===== */}
            <div>
              <h3 className="mb-8 text-2xl font-semibold tracking-tight">
                🚀 Skills
              </h3>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      width={36}
                      height={36}
                      className="mb-3 object-contain"
                    />
                    <span className="text-sm font-medium tracking-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
            
          </div>
        </section>

        <section id="certifications" data-scroll-section>
          <div>
            <h3 className="mb-8 text-2xl font-semibold tracking-tight">
              🎓 Certifications
            </h3>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }) as any,
              ]}
              className="w-full"
            >
              <CarouselContent>
                {certifications.map((cert) => (
                  <CarouselItem
                    key={cert.title}
                    className="basis-full sm:basis-1/2 md:basis-1/3"
                  >
                    <div
                      onClick={() => setActiveCert(cert)}
                      className="cursor-pointer overflow-hidden rounded-xl bg-white/5 shadow-md transition hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div className="flex h-[460px] items-center justify-center bg-white p-4">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          width={500}
                          height={700}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="p-4 text-center">
                        <span className="text-sm tracking-tight text-muted-foreground">
                          {cert.title}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="-left-12 bg-white/10 text-white hover:bg-white/20" />
              <CarouselNext className="-right-12 bg-white/10 text-white hover:bg-white/20" />
            </Carousel>
          </div>
        </section>

        <section id="badges" data-scroll-section>
          {/* ===== BADGES ===== */}
            <div className="mt-20">
              <h3 className="mb-8 text-2xl font-semibold tracking-tight">
                🏅 Badges
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {badges.map((badge) => (
                  <Link
                    key={badge.title}
                    href={badge.href}
                    target="_blank"
                    className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl bg-white/5 shadow-md transition hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center p-2">
                      <Image
                        src={badge.image}
                        alt={badge.title}
                        width={500}
                        height={500}
                        className="object-contain"
                      />
                    </div>

                    <div className="p-2 text-center">
                      <span className="text-xs tracking-tight text-muted-foreground">
                        {badge.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

        </section>


        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Streamlined digital experiences.
            </h2>

            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Blockchain applications and decentralized solutions I&apos;ve built using
              Cardano, Aiken, MeshJS, Next.js, and smart contracts.
            </p>

            {/* Horizontal Carousel */}
            <div className="mt-14">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: false,
                  }) as any,
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem
                      key={project.title}
                      className="basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <Card
                        id="tilt"
                        className="overflow-hidden border-white/10 bg-white/5 backdrop-blur"
                      >
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank">
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="aspect-video h-[250px] w-full object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={400}
                                className="aspect-video h-[250px] w-full object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>

                        <CardContent className="p-5">
                          <h3 className="text-lg font-semibold tracking-tight text-white">
                            {project.title}
                          </h3>

                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>

                          <Link
                            href={project.href}
                            target="_blank"
                            className="mt-4 inline-flex items-center text-sm text-primary transition hover:underline"
                          >
                            View Project
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious className="-left-5 border-white/10 bg-white/10 text-white hover:bg-white/20" />
                <CarouselNext className="-right-5 border-white/10 bg-white/10 text-white hover:bg-white/20" />
              </Carousel>

              {/* Project Counter */}
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            className="my-32"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              💼 Experience
            </span>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Internship Experience.
            </h2>

            <p className="mt-2 text-base tracking-tight text-muted-foreground xl:text-lg">
              Professional experience gained through full-stack software engineering
              and enterprise application development.
            </p>

            {/* Experience Card */}
            <div className="mt-14">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/[0.07]">

                {/* Top */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      Full Stack Developer Intern
                    </h3>

                    <Link
                      href="https://invictainnovations.com/index.html"
                      target="_blank"
                      className="mt-1 inline-flex items-center text-base text-primary transition hover:underline"
                    >
                      Invicta Innovations (Pvt.) Ltd.
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                    Jul 2024 – Jan 2025 · 6 Months
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 max-w-4xl text-[15px] leading-7 text-muted-foreground">
                  Worked as a Full Stack Developer focusing on enterprise-level web and
                  mobile application development using React, Java, PostgreSQL, and
                  modern backend technologies. Contributed to frontend and backend
                  feature implementation, API integration, database management, bug
                  fixing, and real-world software deployment workflows.
                </p>

                {/* Skills */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "React",
                    "Java",
                    "PostgreSQL",
                    "Spring Boot",
                    "REST APIs",
                    "Git",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Publications */}
        <section id="publications" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            className="my-32"
          >
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              📚 Publications
            </span>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Research & Publications.
            </h2>

            <p className="mt-2 text-base tracking-tight text-muted-foreground xl:text-lg">
              Academic research and publications focused on artificial intelligence,
              image processing, and real-world technology applications.
            </p>

            {/* Publication Card */}
            <div className="mt-14">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:bg-white/[0.07]">

                {/* Top */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                      Gaze Tracking System
                    </h3>

                    <Link
                      href="https://ieeexplore.ieee.org/document/11497785"
                      target="_blank"
                      className="mt-2 inline-flex items-center text-base text-primary transition hover:underline"
                    >
                      Published in IEEE Xplore
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground">
                    2026
                  </div>
                </div>

                {/* Description */}
                <p className="mt-6 max-w-4xl text-[15px] leading-7 text-muted-foreground">
                  Final year research project focused on developing an intelligent
                  gaze tracking system using computer vision and image processing
                  techniques. The research explores real-time eye movement detection
                  and tracking methodologies for interactive and assistive technology
                  applications.
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "IEEE",
                    "Computer Vision",
                    "Image Processing",
                    "AI",
                    "Eye Tracking",
                    "Research",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to
              discussing new projects.
            </p>
            <Link href="mailto:wendoj@proton.me" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>
      </div>


      {/* ===== CERTIFICATE MODAL ===== */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white"
            >
              ✕ Close
            </button>

            {/* Image */}
            <Image
              src={activeCert.image}
              alt={activeCert.title}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />

            {/* Title */}
            <p className="mt-3 text-center text-sm text-white/70">
              {activeCert.title}
            </p>
          </div>
        </div>
      )}

    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
