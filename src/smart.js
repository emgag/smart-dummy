
class cmd {
    constructor(init){
        this.init = init;
    }

    push(fn){
        fn()
    }

    run(){
        this.init.forEach(fn => fn())
    }
}

const init = function(){
    const logPrefix = '[Smart Dummy] ';
    const map = window._sasDummy || {};

    console.log(logPrefix + 'Initialize');

    if(Object.keys(map).length === 0){
        console.log(logPrefix + "Warning: format map (_sasDummy) not found or empty")
    }

    window.sas = {
        cmd: new cmd(window.sas.cmd),
        setup: function(config){
            console.log(logPrefix + 'setup() called with config', config);
        },
        call: function(type, config){
            if(type === 'std'){
                console.log(logPrefix + 'call(std) called with config', config, 'dispatching to to render()');
                window.sas.render(config.formatId);
                return;
            }

            console.log(logPrefix + 'call(' + type  + ') called with config', config);
        },
        render: function(format){
            console.log(logPrefix + 'render(' + format  + ') called, rendering format');

            if(!map.hasOwnProperty(format)){
                console.log(logPrefix + 'render(' + format  + ') ignored: format config not found');
                return;
            }

            let img = document.createElement('img');
            img.setAttribute('src', map[format]);

            let e = document.getElementById('sas_' + format);

            if(!e){
                console.log(logPrefix + 'render(' + format  + ') failed: sas_' + format + ' container not found');
                return;
            }

            e.appendChild(img);
        }
    };

    window.sas.cmd.run();
};

if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)){
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
