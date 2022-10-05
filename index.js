const nav =() => {
    const general = {
        getDestinationObject(direction) {
            const length = this.pictures.length
            const element = document.getElementsByClassName('selected')
            let DirectionId = (parseInt(element[0].id) + parseInt(direction)) % length
            if (DirectionId < 0) {
                DirectionId = length - 1
            }
            // const destinationElement = document.getElementById(`${DirectionId}`)
            const obj = this.pictures.filter(pic => pic.id == DirectionId)
            const indexObj = obj[0].indexPicture
            return indexObj
        },
        moveByOne(direction) {
            const destinationObj = this.getDestinationObject(direction)
            this.scrollByArrowFunction(destinationObj)

        },
        scrollByArrowFunction(object) {
            this.unselectAll()
            object.html.classList.add('selected')
            this.scrollMovement(object.imagereferedTo)
            this.restartSliding()

        },
        scrollByReference(element) {
            this.unselectAll()
            element.classList.add('selected')
            this.scrollMovement(this.imagereferedTo)
        },
        unselectAll(){
            const indexPics = document.getElementsByClassName('picture-index')
            for (index of indexPics) {
                index.classList.remove('selected')
            }
        },
        scrollMovement(obj) {
            obj.scrollIntoView({behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })
            this.restartSliding()
        }
    }
    return general
}


const Objectfactory = (HTMLElement) => {
    const obj = Object.create(nav())
    obj.id = HTMLElement.id
    obj.html = HTMLElement
    obj.timer = nav().startSliding
    return obj
}
const imageSliderFactory = (HTMLElement, ) => {
    const obj = Objectfactory(HTMLElement)
    obj.pictures = createChildren()
    obj.arrows = createarrows(obj)
    obj.startSliding
    selectFirstImage()

    obj.startSliding = setInterval(() => {Slider.moveByOne(1)}, 5000),
    obj.restartSliding = () => {
        clearInterval(this.startSliding)
        this.startSliding =  setInterval(() => {Slider.moveByOne(1)}, 5000)
    }
    obj.startSliding
    return obj

    function selectFirstImage() {
        const firstSelect = obj.pictures[0].indexPicture
        firstSelect.scrollByReference(firstSelect.html)
    }
    function createChildren() {
        const childrenHTML = document.getElementsByClassName('picture')
        const children = []
        let counter = 0
        for (let item of childrenHTML) {
            children.push(imageObjectFactory(item, counter))
            counter +=1
        }
        return children}
    function createarrows(father) {
        const arrowObj = {}
        const Arrows = document.getElementsByClassName('arrow')
        arrowObj.arrowLeft = ArrowFactory(Arrows[0], father)
        arrowObj.arrowRight = ArrowFactory(Arrows[1], father)
        return arrowObj
    }
}
const imageObjectFactory = (HTMLElement, indexNumber) => {
    const obj = Objectfactory(HTMLElement)
    obj.id = indexNumber
    obj.indexPicture = createReference(obj, indexNumber)

    function createReference(obj, indexNumber) {
        const container = document.getElementById('index-container')
        const element = document.createElement('div')
        element.id = indexNumber;
        element.classList.add('picture-index')
        container.appendChild(element);
        const object = ObjectReferenceFactory(element, obj);
        return object
    }

    return obj
}
const ObjectReferenceFactory = (HTMLelement, referenced) => {
    const obj = Object.create(nav())
    Object.assign(obj, Objectfactory(HTMLelement))
    obj.imagereferedTo = referenced.html
    HTMLelement.addEventListener('click', () => {obj.scrollByReference(obj.html)})
    return obj
}
const ArrowFactory = (element, father) => {

    const obj = Object.create(nav())
    obj.direction = getDirection(element)
    Object.assign(obj, Objectfactory(element))
    obj.father = father
    element.addEventListener('click', obj.moveByOne.bind(father, obj.direction))
    return obj
    function getDirection(element) {
        return (Array.from(element.classList).includes('back') ? -1 : 1)}

}

SliderElement = document.getElementById('container')
const Slider = imageSliderFactory(SliderElement)
console.log(Slider)





