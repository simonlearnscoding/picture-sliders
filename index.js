const nav = () => {
  const general = {
    // ...

    // ...

    getDestinationObject(direction) {
      const length = this.pictures.length;
      const element = document.getElementsByClassName("selected");
      let DirectionId =
        (parseInt(element[0].id) + parseInt(direction)) % length;
      if (DirectionId < 0) {
        DirectionId = length - 1;
      }
      // const destinationElement = document.getElementById(`${DirectionId}`)
      const obj = this.pictures.filter((pic) => pic.id == DirectionId);
      const indexObj = obj[0].indexPicture;
      return indexObj;
    },
    startTimer() {
      general.timer = setInterval(() => {
        this.father.moveByOne(1);
      }, 5000);
    },
    stopTimer() {
      console.log("Ive been called");
      clearInterval(general.timer);
      general.timer = null;
    },
    moveByOne(direction) {

      const destinationObj = this.getDestinationObject(direction);
      this.scrollByArrowFunction(destinationObj);
    },
    scrollByArrowFunction(object) {
      this.unselectAll();
      object.html.classList.add("selected");
      this.scrollMovement(object.imagereferedTo);
    },
    scrollByReference(element) {
      this.unselectAll();
      element.classList.add("selected");
      this.scrollMovement(this.imagereferedTo);
      this.stopTimer();
      // this.startTimer();
    },

    unselectAll() {
      const indexPics = document.getElementsByClassName("picture-index");
      for (index of indexPics) {
        index.classList.remove("selected");
      }
    },
    scrollMovement(obj) {
      obj.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
  };
  return general;
};

const Objectfactory = (HTMLElement) => {
  const obj = Object.create(nav());
  obj.id = HTMLElement.id;
  obj.html = HTMLElement;
  return obj;
};
const imageSliderFactory = (HTMLElement) => {
  const obj = Objectfactory(HTMLElement);
  obj.pictures = createChildren(obj);
  obj.arrows = createarrows(obj);
  selectFirstImage();
  obj.father = obj;
  // obj.startSliding()
  obj.startTimer();

  // obj.restartSliding = () => {
  //     clearInterval(this.startSliding)
  //     this.startSliding =  setInterval(() => {Slider.moveByOne(1)}, 5000)
  // }
  return obj;

  function selectFirstImage() {
    const firstSelect = obj.pictures[0].indexPicture;
    firstSelect.scrollByReference(firstSelect.html);
  }
  function createChildren(father) {
    const childrenHTML = document.getElementsByClassName("picture");
    const children = [];
    let counter = 0;
    for (let item of childrenHTML) {
      children.push(imageObjectFactory(item, counter, father));
      counter += 1;
    }
    return children;
  }
  function createarrows(father) {
    const arrowObj = {};
    const Arrows = document.getElementsByClassName("arrow");
    arrowObj.arrowLeft = ArrowFactory(Arrows[0], father);
    arrowObj.arrowRight = ArrowFactory(Arrows[1], father);
    return arrowObj;
  }
};
const imageObjectFactory = (HTMLElement, indexNumber, father) => {
  const obj = Objectfactory(HTMLElement);
  obj.id = indexNumber;
  obj.father = father;
  obj.indexPicture = createReference(obj, indexNumber, father);

  function createReference(obj, indexNumber, father) {
    const container = document.getElementById("index-container");
    const element = document.createElement("div");
    element.id = indexNumber;
    element.classList.add("picture-index");
    container.appendChild(element);
    const object = ObjectReferenceFactory(element, obj);
    object.father = father;
    return object;
  }

  return obj;
};
const ObjectReferenceFactory = (HTMLElement, referenced) => {
  const obj = Object.create(nav());
  Object.assign(obj, Objectfactory(HTMLElement));
  obj.imagereferedTo = referenced.html;
  HTMLElement.addEventListener("click", () => {
    obj.scrollByReference(obj.html);
  });
  return obj;
};
const ArrowFactory = (element, father) => {
  const obj = Object.create(nav());
  obj.direction = getDirection(element);
  Object.assign(obj, Objectfactory(element));
  obj.father = father;
  element.addEventListener("click", obj.moveByOne.bind(father, obj.direction));
  return obj;
  function getDirection(element) {
    return Array.from(element.classList).includes("back") ? -1 : 1;
  }
};

SliderElement = document.getElementById("container");
const Slider = imageSliderFactory(SliderElement);
console.log(Slider);
