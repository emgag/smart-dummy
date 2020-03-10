
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

const log = function(msg, context){
    if(typeof window._sasDummy === 'undefined' || !window._sasDummy.debug){
        return;
    }

    const logPrefix = '[Smart Dummy] ';

    if(context){
        console.log(logPrefix, msg, context);
        return;
    }

    console.log(logPrefix, msg);
};

const init = function(){
    const logPrefix = '[Smart Dummy] ';
    const config = window._sasDummy || {};
    const map = window._sasDummy.formats || {};

    log('Initialize');

    if(Object.keys(map).length === 0){
        log("Warning: format map (_sasDummy) not found or empty")
    }

    window.sas = {
        cmd: new cmd(window.sas.cmd),
        setup: function(config){
            log('setup() called with config', config);
        },
        call: function(type, config){
            if(type === 'std'){
                log('call(std) called with config', config, 'dispatching to to render()');
                window.sas.render(config.formatId);
                return;
            }

            log('call(' + type  + ') called with config', config);
        },
        render: function(format){
            log('render(' + format  + ') called, rendering format');

            if(!map.hasOwnProperty(format)){
                log('render(' + format  + ') ignored: format config not found');
                return;
            }

            let img = document.createElement('img');
            img.setAttribute('src', map[format]);

            let e = document.getElementById('sas_' + format);

            if(!e){
                log('render(' + format  + ') failed: sas_' + format + ' container not found');
                return;
            }

            e.appendChild(img);
        },
        setGdprConsentData: function(consent){
            log('setGdprConsentData() called with consent string', consent)
        }
    };

    window.sas.cmd.run();
};

if(document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)){
    init();
} else {
    document.addEventListener("DOMContentLoaded", init);
}
