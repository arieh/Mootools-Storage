(function($,window,undef){

window['Storage'] = new Class({
    Implements : [Options]
    , options : {
          path : '*'
        , name : window.location.hostname
        , duration : 60*60*24*30
    }
    , storage : null
    , initialize : function(options){
         var $this = this;
         
         this.setOptions(options);
         
         if (window.localStorage){ //HTML5 storage
            this.storage = window.localStorage;
         }else if (Browser.Engine.trident){ //IE < 8
            	this.storage = (function(){
                    var storage = document.createElement("span");
                    storage.style.behavior = "url(#default#userData)";
                    $(document.body).adopt(storage);  
                    storage.load($this.options.name);
                    
                    return {
                        setItem : function(name,value){
                            storage.setAttribute(name,value);
                            storage.save($this.options.name);
                        }
                        , getItem : function (name){
                            return storage.getAttribute(name);
                        }
                        , removeItem : function(name){
                            storage.removeAttribute(name);
                            storage.save($this.options.name);
                        }
                    };
                })();
         }else if (window.globalStorage){ //FF<3.5
            this.storage = (function(){
                storage = globalStorage[$this.options.name];
                return {
                        setItem : function(name,value){
                            storage[name] = value;
                        }
                        , getItem : function (name){
                            return storage[name].value;
                        }
                        , removeItem : function(name){
                            delete(storage[name]);
                        }
                    };
            })();
         }else{ //All others
            this.storage = (function(){
                var options ={
                    path : $this.options.path
                    , duration : $this.options.duration
                };
                
                return {
                        setItem : function(name,value){
                             Cookie.write(name,value,options);
                        }
                        , getItem : function (name){
                             return Cookie.read(name);
                        }
                        , removeItem : function(name){
                             Cookie.dispose(name);
                        }
                    };
            })();
         }
    },
    set : function(name,value){
        this.storage.setItem(name,JSON.encode(value));
        return this;
    }
    , get : function (name){
        
        return JSON.decode(this.storage.getItem(name));
    }
    , remove : function (name){
        this.storage.removeItem(name);
        return this;
    }
});

})(document.id,this);