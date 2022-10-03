
const functions = (function() {

    fn = {
    LinkObjectToNode(elementId) {
        const element = document.getElementById(elementId)
        const object = {}
        try{
            object.id = element.id}
        catch(e) {
            console.log('element has no class')
        }

        object.html = element
        return object
    },

    linkObjectToHisKids(object, classname)  {
        object.kids = object.makeBabies(object, classname)
        return object
    },
    createObject(classname, nodeObject) {
        switch (classname) {
            case'picture':
                return imageObjectFactory(nodeObject)
                break;
        }
    },
    makeBabies(fatherObject, classname) {
            const father = fatherObject.html
            const obt = []
            for (const child of  father.children){
                pushIfRightClass(classname, child)
                for(const grandChild of child.children){
                    pushIfRightClass(classname, grandChild)
                }
                } return obt

        function pushIfRightClass(classname, child) {
            if([...child.classList].includes(classname)) {
                const item = fatherObject.createObject(classname, child)
                obt.push(item)}
        }
    },

    getObjectPictures(fatherObject) {
        return this.linkObjectToHisKids(fatherObject, 'picture')
    },
    scrolltoObject(obj) {
        obj.scrollIntoView({behavior: 'smooth',
            block: 'center',
            inline: 'center'
        })
    }}
    return fn
}())

const factory = (HTMLElement) => {
    const obj = Object.create(functions)
    Object.assign(obj, obj.LinkObjectToNode(HTMLElement))
    return obj
}

const imageSliderFactory = (HTMLElement) => {
   const obj = factory(HTMLElement)
    obj.pictures = obj.getObjectPictures(obj)
    return obj
}

const imageObjectFactory = (HTMLElement) => {
    const obj = factory(HTMLElement)
    return obj
}

const Slider = imageSliderFactory('container')
console.log(Slider)


