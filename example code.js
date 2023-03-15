
const functions = (function() {

    function LinkObjectToNode(element) {
        const object = Object.create(domHandle.objectNodeFunctionality)
        object.id = element.id
        object.html = element
        object.giveItDeviceClass(element)
        return object
    }
    function makeBabies(target) {
        const   father = target.html
        const obt = []
        for (const child of  father.children) { //todo specify by class or id
            const item = target.makeDropDownItem(child, target)
            obt.push(item)
        } return obt
    }
    function linkObjectToHisKids(object)  {
        object.kids = object.makeBabies(object)
        return object
    }

}())


const imageSliderFactory = (HTMLElement) => {
return
}

