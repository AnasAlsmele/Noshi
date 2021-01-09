let _ = (id: string, multi: boolean = false) => {
    if(document.getElementById(id) != null){
        return document.getElementById(id);
    }else if(document.getElementsByClassName(id).length > 0){
        if(multi){
            return document.getElementsByClassName(id);
        }else{
            return document.getElementsByClassName(id)[0];
        }
    }
    errorScreen(lang.errors.e+"'<b>"+id+"</b>' "+lang.errors.tnf);
}

let ajax = (
    type: string = "GET",
    link: string, 
    state: boolean = true,
    data: any = ""
    ) :any => {
    let x = new XMLHttpRequest();
    x.onreadystatechange = () => {
        if(this.readyState == '4' && this.status == '200'){
            return x.responseText;    
        }
    }
    x.open(type,link,state);
    x.send(data);
}

class CE {
    private props: {
        'tag': string;
        'id': string;
        'name': string;
        'style': string;
        'class': string;
        'disabled': boolean;
        'text': string;
        'html': any;
        "src": string;
        "child": Node;
        "placeholder": string;
    }
    private propsNames = {
        "id":"id",
        "name":"name",
        "style":"style",
        "class":"className",
        "disabled":"disabled",
        "text":"innerText",
        "html":"innerHTML",
        "placeholder":"placeholder"
    };
    public tag: Node;

    constructor(props){
        let propsKeys = Object.keys(props);
        this.props = props;     
        let tag = document.createElement(this.props.tag);
        propsKeys.forEach(element => {
            if(element === "child"){
                tag.appendChild(this.props.child);
            }else{
                tag[this.propsNames[element]] = this.props[element];
            }
        });
        if(props.tag === "script" || props.tag === "img"){
            tag.setAttribute("src", this.props.src);
        }
        this.tag = tag;
    }
}

// set language 
let folderLang: string = "en";
document.head.appendChild(
    new CE({
        "tag":"script",
        "src":"./lang/"+folderLang+".js"
    }).tag
);

let errorScreen = (msg: string) => {
    document.body.innerHTML = "";
    document.body.appendChild(
        new CE({
            "tag":"code",
            "html":msg,
            "class":"error-screen"
        }).tag
    );
}

window.addEventListener("load",() => {
    // let b = _("li");
    // let c = new CE({
    //     "tag":"div",
    //     "class":"holder",
    //     "child": new CE({
    //         "tag":"div",
    //         "class":"div",
    //         "child": new CE({
    //             "tag":"input",
    //             "class":"input-placeholder large",
    //             "id":"test-input",
    //             "placeholder":"hello world!",
    //             "style":"color: red; background-color: #359869;"
    //         }).tag
    //     }).tag
    // });
    // document.body.appendChild(c.tag);
});