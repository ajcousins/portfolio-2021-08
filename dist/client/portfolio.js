const projects = JSON.parse(document.querySelector("#data").value);

const thumbContainer = document.querySelector(".navbar__thumb-container");

const yPos = [];

const cursor = document.querySelector(".navbar__cursor");

const data = [...projects.data];
data.forEach((project) => {
  const img = document.createElement("img");
  img.setAttribute("src", project.icon);
  img.classList.add("navbar__thumb");

  const section = document.getElementById(project.id);
  const y = section.getBoundingClientRect().top + window.pageYOffset - 150;

  img.addEventListener("mousedown", () => {
    window.scrollTo({ top: y, behavior: "smooth" });
  });

  yPos.push(y);

  thumbContainer.appendChild(img);
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset + 100 >= yPos[0]) {
    cursor.style.width = "5em";
  } else {
    cursor.style.width = "0";
  }

  yPos.forEach((y, i) => {
    if (window.pageYOffset + 100 >= y) {
      cursor.style.marginLeft = 88 * i;
    }
  });
});
