// ==UserScript==
// @name         NHL94 Online adds coaches names to team names.
// @namespace    http://www.nhl94online.com/
// @version      1.0
// @description  uses xpath to get a few tables and joins them on the coaches name based on href selectors in bla..bla..bla...
// @author       Stewy
// @match        https://www.nhl94online.com/html/coachpage.php*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
  'use strict';

  // Your jQuery code goes here

  $(document).ready(function() {
    // Retrieve the tables using XPath
    var gamesTable = $('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(2) table tbody tr:nth-of-type(2) td:nth-of-type(1) div table:nth-of-type(2) tbody tr td div table tbody tr:nth-of-type(5) td div table');
    var coachesTable = $('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(1) table tbody tr td table:nth-of-type(2)');

    // Iterate over each row of the games table
    gamesTable.find('tr').each(function(index, row) {
      // Get the away team name from column 1 and home team name from column 3
      var awayTeamCell = $(row).find('td:eq(1)');
      var homeTeamCell = $(row).find('td:eq(3)');
      var awayTeam = awayTeamCell.text().trim();
      var homeTeam = homeTeamCell.text().trim();

      // Find the coach name for the away team in the coaches table
      var awayCoachName = coachesTable.find('tr:contains(' + awayTeam + ')').find('td:eq(1)').text().trim();
      // Find the coach name for the home team in the coaches table
      var homeCoachName = coachesTable.find('tr:contains(' + homeTeam + ')').find('td:eq(1)').text().trim();

      // Update the away team cell's HTML to include the coach's name
      awayTeamCell.html(awayTeam + ' (Coach: ' + awayCoachName + ')');
      // Update the home team cell's HTML to include the coach's name
      homeTeamCell.html(homeTeam + ' (Coach: ' + homeCoachName + ')');
    });
  });
})();
