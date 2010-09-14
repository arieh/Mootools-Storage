LocalStorage
===========
This Class supplies an interface for a cross-browser local storage. For browsers that support this feature (FF2+, IE5+, Safari 4+) it will use the built in storage mechanism. For other browsers it will use Cookies.

The Current Browser Support:

  * IE8+, FF3.5+, Safari 4+ : Will use the HTML5 localStorage API
  * FF<3.5 : Will use the globalStorage API
  * For all others, will use cookies to store data (maybe later I will add Flash Cookie storage).  

How To Use
-------------
Pretty simple - initialize, then use the setters and getters:

    #JS
    var st = new LocalStorage();
    
    st.set('name',{a:'aaa',b:'bbb'});
    
    //on another day/page
    st.get('name');
    
    st.remove('name');
    
    
Options
--------
  * name : this will be used for security on FF<3.5. For cross browser functionality, this should not use anything other than the current doman.
  * path : used for cookie allowed path. Again, for cross browser you should not tuch this.
  * duration : used for cookie duration