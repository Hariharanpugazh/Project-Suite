import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex-1" />
      <div className="flex gap-8 justify-center flex-1">
        <div className="relative group">
          <Link to="/projects" className="cursor-pointer">Projects</Link>
        </div>
        <div className="relative group">
          <span className="cursor-pointer">Institutions</span>
        </div>
        <span className="cursor-pointer">About</span>
      </div>
      <div className="flex-1 flex justify-end">
        <button className="bg-yellow-400 px-8 py-2 rounded-md font-medium text-sm">
          Login
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <h1 className="text-5xl font-bold mb-8 leading-tight">
          Welcome to the <br />
          <span className="text-yellow-400">project portal</span> of SNS
        </h1>
        <Link to="/projects" className="bg-yellow-400 px-8 py-2 rounded-md font-medium text-sm">
          View Projects
        </Link>
      </div>
    </div>
  );
}

function ProjectCard({ title, description, image, imageAlt, reverse }) {
  const content = (
    <>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="border border-gray-300 px-6 py-2 rounded-md text-sm">
          Learn More
        </button>
      </div>
      <div className="w-full md:w-1/3">
        <img src={image} alt={imageAlt} className="rounded-lg w-full h-auto" />
      </div>
    </>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-8">
      {reverse ? React.Children.toArray(content.props.children).reverse() : content}
    </div>
  );
}

function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Latest Projects</h2>
        <p className="text-yellow-400 max-w-2xl mx-auto">
          Join SNS Hub to access latest news, mentorship funding to launch and scale your business.
        </p>
      </div>
      <div className="space-y-8">
        <ProjectCard
          title="Project #1"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae justo et dolor facilisis consequat. Integer feugiat metus nec orci tristique, ut gravida eros tristique. Suspendisse potenti, aliqueut ac ligula id magna accumsan fermentum. Ut eget lectus nec risus luctus tincidunt vel vel ipsum."
          image="/path/to/project1.png"
          imageAlt="Project 1"
        />
        <ProjectCard
          title="Project #2"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae justo et dolor facilisis consequat. Integer feugiat metus nec orci tristique, ut gravida eros tristique. Suspendisse potenti, aliqueut ac ligula id magna accumsan fermentum. Ut eget lectus nec risus luctus tincidunt vel vel ipsum."
          image="/path/to/project2.png"
          imageAlt="Project 2"
          reverse
        />
        <ProjectCard
          title="Project #3"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae justo et dolor facilisis consequat. Integer feugiat metus nec orci tristique, ut gravida eros tristique. Suspendisse potenti, aliqueut ac ligula id magna accumsan fermentum. Ut eget lectus nec risus luctus tincidunt vel vel ipsum."
          image="/path/to/project3.png"
          imageAlt="Project 3"
        />
      </div>
      <div className="text-center mt-12">
        <Link to="/projects" className="border border-gray-300 px-6 py-2 rounded-md text-sm">
          View all projects
        </Link>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
    </>
  );
}

export default Home;

