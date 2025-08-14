// Citr 
// Javascript to expose cite attribute from blockquote and q elements in a meaningful way
// Copyright (C) 2013  Corey Mwamba
// downloaded: https://github.com/coreymwamba/citr-js

  //  This program is free software: you can redistribute it and/or modify
  //  it under the terms of the GNU Affero General Public License as
  //  published by the Free Software Foundation, either version 3 of the
  //  License, or (at your option) any later version.

 //   This program is distributed in the hope that it will be useful,
 //   but WITHOUT ANY WARRANTY; without even the implied warranty of
 //   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 //   GNU Affero General Public License for more details.

 //   You should have received a copy of the GNU Affero General Public License
 //   along with this program.  If not, see <http://www.gnu.org/licenses/>



var footnote_heading_text = "Sources";
var footnode_annotation = "This list was created automatically.";
// var footnote_class = "";

 // insertAfter function is from Stack Overflow - http://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// and THIS is from CodeTricks - http://code-tricks.com/javascript-get-element-by-class-name/

function getElementByClass (className, parent) {
  parent || (parent = document);
  var descendants= parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}

var footnotes = getElementByClass('footnote');
var marginalia = getElementByClass('marginalia');
var harvard = getElementByClass('harvard');
var indirect =  getElementByClass('indirect');
var bq = document.getElementsByTagName('blockquote');
var iq = document.getElementsByTagName('q');


// process all blockquotes
	for (var i = 0; i < bq.length; i++) {
		var quoteRef = bq[i].getAttribute('cite');
		var quoteTitle = bq[i].getAttribute('title');
		// we only need to create a citation if there's a reference or a title 
		if (quoteRef || quoteTitle) {
			var quoteCite  = document.createElement('cite');
			if (quoteRef && quoteTitle) {
				var refLink = document.createElement('a');
				refLink.href = quoteRef;
				refLink.innerText = quoteTitle;
				quoteCite.appendChild(refLink);
			}
			else {
				quoteCite.innerText = quoteTitle; 
			}
		if (bq[i].className.indexOf('footnote') < 0) {
		bq[i].appendChild(quoteCite);
		}
		}
	}
// process class member 

	// indirect quotes
	for (var i = 0; i < indirect.length; i++) {
		var quote = indirect[i];
		quote.style='quotes: none';
	}
	if (footnotes) {
		var footList = document.createElement('ol');	
	}
	// indirect, harvard like: (Kwabena Nketia 1974, p.35)
	for (var i = 0; i < harvard.length; i++) {
		var quote = harvard[i];
		// build the reference
		var quoteCite  = document.createElement('cite');
		var quoteRef = quote.getAttribute('cite');
		var quoteTitle = quote.getAttribute('title');
		quoteCite.innerHTML = ' (';
		if (quoteRef && quoteTitle) {
			var quoteLink = document.createElement('a');
			quoteLink.setAttribute('href',quoteRef);
			quoteLink.innerHTML = quoteTitle;
		}
		else {
			var quoteLink = document.createTextNode(quoteTitle); 
		}
		quoteCite.appendChild(quoteLink);
		quoteCite.innerHTML +=  ')';
		insertAfter(quote,quoteCite);
	}
	// create footnote cite and link with []
	for (var i = 0; i < footnotes.length; i++) {
		var quote = footnotes[i];
		var quoteAft = document.createElement('span');
		quoteAft.innerHTML = '[';
		var aftLink = document.createElement('a');
		quoteAft.appendChild(aftLink);
		aftLink.setAttribute('href', '#cite-' + (i + 1));
		aftLink.innerText = i + 1;
		aftLink.innerHTML = i + 1;
		quoteAft.appendChild(aftLink);
		quoteAft.innerHTML += ']';
		if (quote.nodeName == 'Q') {
			insertAfter(quote,quoteAft);
		}
		else if (quote.nodeName == 'BLOCKQUOTE')  {
			var lastPara = quote.lastChild;
			if (lastPara.nodeName == '#text') {
				var ele = lastPara.previousSibling;
				ele.appendChild(quoteAft);
			}
			else { 
				lastPara.appendChild(quoteAft); 
				}
		}
	
		// create the footnote entry
		var quoteRef = quote.getAttribute('cite');
		var quoteTitle = quote.getAttribute('title');
		var quoteCite  = document.createElement('li');
		quoteCite.value = i + 1;
		quoteCite.id = 'cite-' + quoteCite.value;
		if (quoteRef && quoteTitle) {
			var quoteLink = document.createElement('a');
			quoteLink.setAttribute('href',quoteRef);
			quoteLink.innerHTML = quoteTitle;
		}
		else {
			var quoteLink = document.createTextNode(quoteTitle); 
		}
		quoteCite.appendChild(quoteLink);
		footList.appendChild(quoteCite);
	}
	
	// marginalia qoute: invisible till mouse over, no footnote
	for (var i = 0; i < marginalia.length; i++) {
		var quote = marginalia[i];
		var  quoteParent = quote.parentNode;
		//modify this line to get the style that you want
		quoteParent.style = 'display: inline-block; width: 70%; vertical-align: text-top; margin-top: 0.5em';
		var quoteRef = quote.getAttribute('cite');
		var quoteTitle = quote.getAttribute('title');
		//this does not have to be an aside if you don't want - it could be a <div>
		var quoteCite  = document.createElement('aside');
		//modify this line to get the style that you want
		quoteCite.style = 'width: 20%; display: inline-block; margin-left: 1.5em; vertical-align: text-top; margin-top:0.5em;text-align: left; font-size: 0.7em';	
		quoteCite.id = 'marginnote-' + (i +1);
		if (quoteRef && quoteTitle) {
			var quoteLink = document.createElement('a');
			quoteLink.setAttribute('href',quoteRef);
			quoteLink.innerHTML = quoteTitle;
		}
		else {
			var quoteLink = document.createTextNode(quoteTitle); 
		}
		quoteCite.appendChild(quoteLink);				
		insertAfter(quoteParent,quoteCite);			
	}


	// create a new section with references
	
	if (footnotes.length) {
		var bodyFoot = document.createElement('section');
		bodyFoot.className = "sources"; // added to match portfolio css
		// added: get the article object
		parents = document.getElementsByTagName("article");
		parent = null;
		if (parents.length > 0) {parent = parents[parents.length -1];}
		if (!parent) { parent=document.body;}
		// original headings, slightly changed
		var footHeading = document.createElement('h2');
		footHeading.innerHTML = footnote_heading_text;
		// added a caption:
		var footCaption = document.createElement('p');
		// footCaption.className = footnote_class;
		footCaption.innerHTML = footnode_annotation;
		// add new Heading
		bodyFoot.appendChild(footHeading);
		// this is the original add
		bodyFoot.appendChild(footList);
		// this is an additional add
		bodyFoot.appendChild(footCaption);
		// changed from document.body.appendChild(bodyFoot)
		parent.appendChild(bodyFoot);
	}