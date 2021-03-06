/*

TODO
––––––––––––––––––––––––––––––––––

* Export character format
* Slice IMG-Layers automatical
* Generate true CSS-Margin and -Padding
* generate buttons
* generate inputs
* Shadow/inner Shadow
* Hover/active
* Problems with illustrator effects
* export TextFrames with Inline Styles

SOLVED
------------------------------------
2010-11-30 [Standart Format] fliegt raus
2010-11-30 CSS borders
2010-12-01 Different HTML Doctypes
2012-08-24 Some bugfixes, changes the style.css behavior, so there is no need to create any folder
2012-10-14 Bugfixes, cssme() function works correct

*/
var doc = app.activeDocument;
var css = new Array();
mypath = doc.path;

var myHTML = new File (mypath + "/index.html");
myHTML.open ("w:");

var w = new Window ("dialog","Options",undefined,{closeButton:true});
w.orientation ="row";

var doctypes = new Array ("HTML5","XHTML 1.1","XHTML 1.0 Strict","XHTML 1.0 Transitional","HTML 4.01 Strict");

var myGroup = w.add("group");
myGroup.orientation = "column"
myGroup.alignChildren = "left";
	
	var mydoctypeGroup = myGroup.add("group");
	mydoctypeGroup.orientation = "row";
		mydoctypeGroup.add("statictext",undefined,"HTML Doctype");
		var doctypeDD = mydoctypeGroup.add("dropdownlist");
		doctypeDD.selected = 1;
		for (i=0;i<doctypes.length;i++) {
			doctypeDD.add("item",doctypes[i]);
		}

	var myInputGroup = myGroup.add ("group");
		myInputGroup.add ("statictext", undefined, "Language");
		var languageText = myInputGroup.add ("edittext", undefined, "en");
		languageText.chracters = 5;

var myButtonGroup = w.add ("group");
myButtonGroup.orientation = "column";
myButtonGroup.add ("button", undefined, "OK");
myButtonGroup.add ("button", undefined, "Cancel");
w.show();

var htmldoctypeheader = new Array (
	"<!DOCTYPE html>\n" +
	"<html lang=\""+ languageText.text +"\">\n" +
	"<head>\n" + 
	"\t<meta charset=\"utf-8\" />\n\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\">\n" +
	"\t<title>untitled</title>\n\n" +
	"</head>\n",
	
	"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\"\n" +
	"\"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">\n" +
	"<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\""+ languageText.text +"\">\n" +
	"<head>\n" + 
	"\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\">\n" +
	"\t<title>untitled</title>\n\n" +
	"</head>\n",
    
	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"\n" +
	"\t\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" +
	"<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\""+ languageText.text +"\" lang=\""+ languageText.text +"\">\n" +
	"<head>\n" + 
	"\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
	"\t<title>untitled</title>\n\n" +
	"</head>\n",
    
	"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n" +
	"\t\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n" +
	"<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\""+ languageText.text +"\" lang=\""+ languageText.text +"\">\n" +
	"<head>\n" +
	"\t<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
	"\t<title>untitled</title>\n\n" +
	"</head>\n",
    
	"<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01//EN\"\n" +
	"\"http://www.w3.org/TR/html4/strict.dtd\">\n" +
	"<html lang=\""+ languageText.text +"\">\n" +
	"<head>\n" +
	"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
	"<title>untitled</title>\n" +
	"</head>",
    
	"<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\"\n" +
	"\"http://www.w3.org/TR/html4/loose.dtd\">\n" +
	"<html lang=\""+ languageText.text +"\">\n" +
	"<head>\n" +
	"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
	"\t<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"screen\" title=\"no title\" charset=\"utf-8\">\n" +
	"<title>untitled</title>\n" +
	"</head>"
);

var head = htmldoctypeheader[doctypeDD.selection.index];

myHTML.write(head);
if (doc.layers[0].name != "body") myHTML.writeln("<body>");

for (i=0; i<doc.layers.length; i++){
	//myHTML.write(doc.layers[i].name);
	if (doc.layers[i].visible == true) {
		//alert (doc.layers[i].name);
		myHTML.write(tagme (doc.layers[i],0));
	}
}
if (doc.layers[0].name != "body") myHTML.writeln("</body>");
myHTML.write("</html>\n");
myHTML.close();

//paragraphstocss ();


/*
for (i=0;i<doc.paragraphStyles.length;i++) {
	if (doc.paragraphStyles[i].characterAttributes.textFont != null) alert(doc.paragraphStyles[i].characterAttributes.textFont.family);
}

for (z=0; z<doc.characterStyles.length; z++) {
	if (doc.characterStyles[z].name.substring(0,1) != "[") {
		if (!isArray(css[doc.characterStyles[z].name]))  css[doc.characterStyles[z].name] = new Array();

		if(doc.characterStyles[z].characterAttributes.textFont != null) {
			css[doc.characterStyles[z].name]["font"] = capsulate(doc.characterStyles[z].characterAttributes.textFont.family);
		}
		if (doc.characterStyles[z].characterAttributes.fillColor.red != null) {
			css[doc.characterStyles[z].name]["color"] = "#" + hexathis(doc.characterStyles[z].characterAttributes.fillColor.red.toString(16)) +
				hexathis(doc.characterStyles[z].characterAttributes.fillColor.green.toString(16)) +
				hexathis(doc.characterStyles[z].characterAttributes.fillColor.blue.toString(16));
		}
	}
}
*/
cssme();
var myCSS = new File (mypath + "/style.css");
myCSS.open("w:");
var e;
for (key in css){
	e =  key + "{";
	for (newkey in css[key]) {
		e += newkey + ": " + css[key][newkey] +";";
	}
	e += "}\n";
	myCSS.write(e);
}
myCSS.close();


function tagme (mylayer,ebene) {
	var tagname = String(mylayer.name);
	var j;
	var tab = "";


	for (t=0;t<ebene;t++) {
		tab += "\t";
	}

	var sublayers = mylayer.layers.length;

	var myarray = tagname.split("#");
	if (myarray[1] != "") {
		var myid = myarray[1];
		tagname = myarray[0]; 
	}
	
	var myarray = tagname.split(".");
	if (myarray[1] != "") {
		var myclass = myarray[1];
		tagname = myarray[0];
	}
	
	var e = "";
	if (mylayer.parent.name != "li" && tagname != "a") e += tab;
	e += "<" + tagname
	
	if (myclass) {
		e += " class=\"" + myclass + "\"";
	}
	if (myid) {
		e += " id=\"" + myid + "\"";
	}
	if (tagname == "img" || tagname == "br") {
		e += " /";
	}
	
	e += ">"
	if (tagname != "li" && tagname != "a" && tagname.substring(0,1) != "h" && mylayer.parent.name != "li" && mylayer.parent.name != "a" && mylayer.parent.name.substring(0,1) != "h") e += "\n"; 
	
	//Recusive function for sublayers
	if (sublayers > 0) {
		for (j=0; j<sublayers; j++) {
			if (mylayer.layers[j].visible == true) e += tagme(mylayer.layers[j],ebene+1);
		}
	}
	if (tagname != "img" && tagname != "br") {
		for (k=0;k<mylayer.pageItems.length;k++) {
			if (mylayer.pageItems[k].hidden != true) {
				if (mylayer.pageItems[k].name == "background") {
					if (!isArray(css[mylayer.name])) css[mylayer.name] = new Array();
					
					css[mylayer.name]["height"] = mylayer.pageItems[k].height + "px";
					
					if (mylayer.pageItems[k].width < doc.width) {
						css[mylayer.name]["width"] = mylayer.pageItems[k].width + "px";
					}
		
					if (mylayer.pageItems[k].fillColor.typename == "RGBColor" ) {
						css[mylayer.name]["background"] =  "#" + hexathis(mylayer.pageItems[k].fillColor.red.toString(16)) +
							hexathis(mylayer.pageItems[k].fillColor.green.toString(16)) +
							hexathis(mylayer.pageItems[k].fillColor.blue.toString(16)) ;
					} else if (mylayer.pageItems[k].fillColor.typename == "GradientColor" ) {
						css[mylayer.name]["background"] = "-moz-linear-gradient(center top, ";
						
						for (h=0;h<mylayer.pageItems[k].fillColor.gradient.gradientStops.length;h++) {
							css[mylayer.name]["background"] += "#" +hexathis(mylayer.pageItems[k].fillColor.gradient.gradientStops[h].color.red.toString(16)) +
								hexathis(mylayer.pageItems[k].fillColor.gradient.gradientStops[h].color.green.toString(16)) +
								hexathis(mylayer.pageItems[k].fillColor.gradient.gradientStops[h].color.blue.toString(16)) +
								" " + Math.round(mylayer.pageItems[k].fillColor.gradient.gradientStops[h].rampPoint) + "%";
							if (h+1 < mylayer.pageItems[k].fillColor.gradient.gradientStops.length) {
								css[mylayer.name]["background"] += ",";
							}
						}
						css[mylayer.name]["background"] += ")";
					}
				} else if (mylayer.pageItems[k].name.substring(0,6) == "border") {
					if (!isArray(css[mylayer.name])) css[mylayer.name] = new Array();
					var bordername = mylayer.pageItems[k].name;
					css[mylayer.name][bordername] = mylayer.pageItems[k].strokeWidth  + "px solid " + "#" +
						hexathis(mylayer.pageItems[k].strokeColor.red.toString(16)) +
						hexathis(mylayer.pageItems[k].strokeColor.green.toString(16)) +
						hexathis(mylayer.pageItems[k].strokeColor.blue.toString(16));
					//alert(mylayer.pageItems[k].name);
				}
	
				if (mylayer.pageItems[k].typename == "TextFrame") {
					if (mylayer.name != "li" && mylayer.name != "a" && mylayer.name.substring(0,1) != "h") e += tab + "\t"+mylayer.pageItems[k].contents+"\n";
                       else e += mylayer.pageItems[k].contents;
				}
			}
		}
		if (tagname != "li" && tagname != "a" && tagname.substring(0,1) != "h") e += tab;
		e += "</" + tagname + ">";
		if (mylayer.parent.name != "li" && tagname != "a") e += "\n";
	}
	return e;
}


function hexathis (hex) {
	if (hex.length == 1) {
		hex = "0" + hex;
	}
	
	return hex;
}

function capsulate (mystring) {
	if (mystring.search(" ")) {
		mystring = "\"" + mystring + "\"";
	}
	return mystring;
}

function paragraphstocss () {
	var e = "";
	
	for (j=0;j<doc.paragraphStyles.length;j++) {
		aname = String(doc.paragraphStyles[j].name);
		//alert(doc.paragraphStyles[j].paragraphAttributes.hyphenation);
		
		if (aname.substring(0,1) != "[" ) {
			if (!isArray(css[aname]))  css[aname] = new Array();
			css[aname]["font"] = "";
			if (doc.paragraphStyles[j].characterAttributes.textFont != "null") css[aname]["font"] += capsulate(doc.paragraphStyles[j].characterAttributes.textFont.family) + " ";
			
			css[aname]["font"] += Math.round(doc.paragraphStyles[j].characterAttributes.size) + "/" +
				Math.round(doc.paragraphStyles[j].characterAttributes.leading) + " " +
				"#" + hexathis(doc.paragraphStyles[j].characterAttributes.fillColor.red.toString(16)) +
				hexathis(doc.paragraphStyles[j].characterAttributes.fillColor.green.toString(16)) +
				hexathis(doc.paragraphStyles[j].characterAttributes.fillColor.blue.toString(16));
		}
	}
}

function cssme () {
	var e = "";
	for (j=0;j<doc.textFrames.length;j++) {
		if (doc.textFrames[j].hidden == false) {
			if (doc.textFrames[j].parent.name != "img" || doc.textFrames[j].name != "") {
				aname = String(doc.textFrames[j].story.textRange.paragraphStyles[0].name);
				if (aname.substring(0,1) != "[" ) {
					if (!isArray(css[aname]))  css[aname] = new Array();
					css[aname]["font"] = doc.textFrames[j].paragraphs[0].characterAttributes.size + "/" +
						doc.textFrames[j].paragraphs[0].characterAttributes.leading + " " +
						capsulate(doc.textFrames[j].paragraphs[0].characterAttributes.textFont.family);
					css[aname]["color"] = "#" + hexathis(doc.textFrames[j].paragraphs[0].characterAttributes.fillColor.red.toString(16)) +
						hexathis(doc.textFrames[j].paragraphs[0].characterAttributes.fillColor.green.toString(16)) +
						hexathis(doc.textFrames[j].paragraphs[0].characterAttributes.fillColor.blue.toString(16));
				}
			}
		} 
	}
}

function isArray(testObject) {   
	return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
}