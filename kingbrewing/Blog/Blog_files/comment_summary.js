/* Copyright (c) 2006 by Apple Computer, Inc.  All Rights Reserved. */

var commentJavascriptVersion = "$Revision: 1.13 $";

var time = new Date().getTime();

// Pick entry summaries up by loading JavaScript data for each entry. ?wsc=summary.js
if (commentsActivated) {
	for (var entry in entryURLs) {
		document.write('<script src="' +  entry + '?wsc=summary.js&ts=' + time + '" type="text/javascript"></script>');
	}
}

// Loads localization
document.write('<script src="http://www.mac.com/1/up/comments/scripts/loc.js" type="text/javascript" charset="utf-8"></script>');

// Loads utility objects
document.write('<script src="http://www.mac.com/1/up/comments/scripts/utility.js" type="text/javascript" charset="utf-8"></script>');

// Aliases
function initCommentSummary()
{
	initComments();
}

function insertCommentCountStrings()
{
	initComments();
}

function initComments() 
{
	setLocale();
	var commentCount;
	for (var entry in entryURLs) {
		if (entryURLs[entry].comments || entryURLs[entry].count > 0) {
			commentCount = document.getElementById('comments_' + entryURLs[entry].order);
			if (commentCount !== null) {
				commentCount.innerHTML = commentCountString(entryURLs[entry].count);
			} 
			commentCount = null;
		} 
	}
}
