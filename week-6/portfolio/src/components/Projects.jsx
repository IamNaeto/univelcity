import React from "react";

const projects = [
  {
    title: "AirBNB Clone",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam eaque at obcaecati magni cumque nulla maxime odio id suscipit. Aliquam, voluptate! Vitae vel, earum quibusdam tempore ducimus quam corrupti ut.",
    image:
      "https://moralis.io/wp-content/uploads/2022/04/22_04_airbnb-clone-web3-full-text-v.jpg",
  },
  {
    title: "Spotify Clone",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatem mollitia quod sint molestias fugiat? Esse totam quos quae aliquid ducimus dicta doloremque dolorem fuga porro, rerum, laborum exercitationem ea.",
    image:
      "https://repository-images.githubusercontent.com/636382929/7f38c0b4-4ced-441b-a342-5fcfa79ea89b",
  },
  {
    title: "Notebook",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non commodi beatae error ducimus blanditiis temporibus laboriosam dignissimos, officia porro. A atque expedita laborum inventore quae, hic iure sit similique fuga!",
    image: "https://i.ytimg.com/vi/PmRSdlMkm1c/maxresdefault.jpg",
  },
  {
    title: "Velibrary",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi, nesciunt magni quibusdam labore ad neque ipsa eum quam illo tenetur recusandae optio eaque? Fugit a, laudantium ipsam architecto nisi beatae.",
    image: "https://cdn.optipic.io/site-104380/images/library/elibrary_.jpg",
  },
  {
    title: "Univelcity Clone",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor vitae dolores possimus explicabo placeat tempora aliquam incidunt illo eum exercitationem laboriosam labore recusandae, iusto omnis illum, modi aut veniam quae!",
    image:
      "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/rz2nhioru3tu7uocwibs",
  },
  {
    title: "ChatBot",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, cum. Earum at omnis deserunt debitis, officiis dolorum ut odio, praesentium in totam molestias a! Eveniet facilis ipsam iusto minima sunt!",
    image:
      "https://images.prismic.io//intuzwebsite/d9daef05-a416-4e84-b0f8-2d5e2e3b58d8_A+Comprehensive+Guide+to+Building+an+AI+Chatbot%402x.png?w=2400&q=80&auto=format,compress&fm=png8",
  },
];

const Projects = () => (
  <div className="mt-10">
    <h2 className="text-2xl font-semibold mb-2">Projects</h2>
    <p className="600 mb-4">Feel free to explore my projects.</p>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-300 text-gray-900 rounded-lg p-4 shadow-md"
        >
          <h3 className="text-xl">{project.title}</h3>
          <img
            src={project.image}
            alt={project.title}
            className="my-4 mx-auto"
            style={{ maxWidth: "200px" }}
          />
          <p>{project.description}</p>
          <a href="#" className="text-blue-500 hover:underline">
            View Project
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
