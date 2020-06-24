class Stack{

    constructor(){

        this.stack = [];
        this.top = -1;
    }

    isEmpty(){

        return this.top === -1;
    }

    push(item){

        this.top++;
        this.stack[this.top] = item;
    }

    pop(){

        if(!this.isEmpty()){
            var item = this.stack[this.top];
            this.top--;
            return item;
        }
    }
}

stk = new Stack();

function loadSVG() {

    var object = document.getElementById('svg_object');
    var svgObject = object.contentDocument;
    
    var style = svgObject.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = '@import url("cssSVG.css");';

    var svg = svgObject.getElementsByTagName('svg')[0];
    svg.insertBefore(style,svg.firstChild);
    
    object.width = svg.getAttribute('width');
    object.height = svg.getAttribute('height');
    
    var element = svg.getElementsByTagName('*');
    var i;
    for(i = 0; i < element.length; i++){

        element[i].addEventListener("click", function(){
        
            if(svg.getElementById(this.id) != null){
                svg.getElementById(this.id).classList.add("click");
            }
        });
    }
}

function undo(){
    
    while(!stk.isEmpty()){
        
        var item = stk.pop();

        if(item.tagName === 'g'){

            var tempParts = item.getElementsByTagName("*");
            var i;
            for(i = 0; i < tempParts.length; i++){

                tempParts[i].classList.remove("cluster_rack_shelf");
                tempParts[i].classList.remove("click");
            }
        }
        else{

            item.classList.remove("bin");
            item.classList.remove("click");            
        }
    }
}

function applyCSS(){

    var square = document.getElementById("svgID").value;
    var svgObject = document.getElementById('svg_object').contentDocument;
    var svg = svgObject.getElementsByTagName('svg')[0];
    var element = svg.getElementById(square);
        
    if(element == null)
        alert("No such element exists!!");
    else{
        undo();

        stk.push(element);
        //for particular cluster/rack/shelf
        if(element.tagName === 'g'){    

            var parts = element.getElementsByTagName("*");
            var i;
            for(i = 0; i < parts.length; i++){

                parts[i].classList.add("cluster_rack_shelf");
                parts[i].classList.remove("bin");
                
                window.scrollTo(parts[i].getAttribute('x') - 200, parts[i].getAttribute('y') - 200);
            }
        }
        //for particular bin
        else{ 
            
            element.classList.add("bin");
            
            window.scrollTo(element.getAttribute('x') - 200, element.getAttribute('y') - 200);
        }
    }
}

