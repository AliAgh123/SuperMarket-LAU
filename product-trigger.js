window.correctProducts = 0;
window.wrongProducts = 0;
const ADD_VALUE = 0.1;


window.x = -0.2;
window.y = 0;
window.z = -0.4;
AFRAME.registerComponent('product-collector', {
    schema: {
        myType: { type: 'string', default: 'correct' },
        price: { type: 'number', default: 0},
        productName: { type: 'string', default: 'null'}
    },

    init: function() {

        let el = this.el;
        let data = this.data;
        const correctProduct = document.querySelectorAll(".Items").length - 1;
        let totalPrice = document.getElementById("total-price");
        var cost = Number(totalPrice.getAttribute('price'));
        // let holdedProducts = [totalPrice.getAttribute('holdedProducts')];
        
        console.log(this.data.price);
        console.log(this.data.productName);
        // console.log("the client is holding: " + holdedProducts);
        let items = document.getElementsByClassName("Items");
        console.log(items);
        console.log(items[0].getAttribute('product-collector').productName);
        let ss = "";
        for(i of items){
            ss += i.getAttribute('product-collector').productName;
        }
        console.log(ss);


        var wrongProduct;
        console.log('corrrect ' + el.getAttribute('product-collector'));
        el.addEventListener("correctCollect", function() {
            cost = cost + data.price;
            
            // hlioynntrgnfl correctProduct=document.querySelectorAll('.newItems');  
            console.log('corrrect product' + el.getAttribute('product-collector').productName);
            el.setAttribute("animation", "property: scale; to:2 2 2; dur:2000; easing: linear; loop: false");
            el.className = "trolly"
            
            let holdedProducts = document.getElementsByClassName("trolly");
            let s = ""
            for(i of holdedProducts){
                let addInfo = i.getAttribute('product-collector').productName + " " + i.getAttribute('product-collector').price;
                s += addInfo;
            }
            
            // holdedProducts.push(data.productName);
            totalPrice.setAttribute('text', 'value', "cost price is " + cost + "$ for the " + data.productName + " the holded products are " + s);
            totalPrice.setAttribute('price', cost);
            
            // el.setAttribute('material','color','blue');
            //  el.setAttribute('static-body', 'enabled:true');
            setTimeout(() => {
                var new_element = el.cloneNode(true);
                el.parentNode.removeChild(el);
                console.log(window.z);
                //new_element.object3D.position.z=0;
                //new_element.object3D.position.y=0;
                //window.x=(el.object3D.position.x- document.getElementById('trolly').getAttribute("position").x)-1;
                //window.z=el.object3D.position.z+ document.getElementById('trolly').getAttribute("position").z;
                //window.y=el.object3D.position.y- document.getElementById('trolly').getAttribute("position").y;
                console.log(window.z);
                if (window.x >= 0.2)
                    window.x = window.x - 0.1;
                else if (window.x < 0.2 && window.z <= 0.3)
                    window.z = window.z + 0.2;
                //else window.z=window.z+0.1;
                else if (window.z >= 0.3) {
                    window.x = window.x + 0.1;
                    window.z = 0.1;
                }
                setTimeout(() => {

                    new_element.setAttribute("position", "" + window.x + " 0.6 " + window.z);
                    new_element.setAttribute("scale", "1 1 1");

                    document.getElementById('trolly').appendChild(new_element);
                    
                }, 1000);
            }, 1000);
            items++;
            document.querySelectorAll(".Items").length--;
            console.log(document.querySelectorAll(".Items").length);

            if (document.querySelectorAll(".Items").length < 2) {
                document.querySelector('#EndTxt').setAttribute('value', 'You Win');
                setTimeout(() => {
                    location.reload();

                }, 5000);
            }
        })

        el.addEventListener("wrongCollect", function() {
            el.setAttribute('static-body', 'enabled:true');

            console.log('wrong product' + el);
            window.wrongProducts++;
            window.x += 0.1;

            //document.getElementById('trolly').appendChild(wrongProduct[wrongProduct[0]]); 
            setTimeout(() => {
                var new_element = el.cloneNode(true);
                el.parentNode.replaceChild(new_element, el);
                document.getElementById('trolly').firstElementChild.appendChild(new_element);
                new_element.setAttribute("position", { x: window.x, y: 0, z: window.z });

            }, 2000);

        })
        el.addEventListener("grab", function() {
            var newel = el.cloneNode(true);
            el.parentNode.replaceChild(newel, el);
            document.getElementById("lefthand").appendChild(newel);
            newel.setAttribute("position", ".5  1.2 -.8");
            console.log("emit" + newel.parentElement.id);


        })

    }

});