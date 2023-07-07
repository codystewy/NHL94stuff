// ==UserScript==
// @name         NHL94 Online adds coaches names to team names.
// @namespace    http://www.nhl94online.com/
// @version      1.0
// @description  uses plain JavaScript to get a few tables and joins them on the coaches' names based on href selectors in bla..bla..bla...
// @author       Stewy
// @match        https://www.nhl94online.com/html/coachpage.php*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function retrieveTables() {
    // Retrieve the tables using XPath
    var gamesTable = document.querySelector('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(2) table tbody tr:nth-of-type(2) td:nth-of-type(1) div table:nth-of-type(2) tbody tr td div table tbody tr:nth-of-type(5) td div table');
    var coachesTable = document.querySelector('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(1) table tbody tr td table:nth-of-type(2)');

    return {
      gamesTable: gamesTable,
      coachesTable: coachesTable
    };
  }

  function updateTeamNames() {
    var tables = retrieveTables();

    if (!tables.gamesTable || !tables.coachesTable) {
      console.log('Tables not found.');
      return;
    }

    var rows = tables.gamesTable.querySelectorAll('tr');

    rows.forEach(function(row) {
      var columns = row.querySelectorAll('td');

      if (columns.length >= 4) {
        var awayTeamCell = columns[1];
        var homeTeamCell = columns[3];

        var awayTeam = awayTeamCell.innerText.trim();
        var homeTeam = homeTeamCell.innerText.trim();

        var awayCoachRow = findCoachRow(tables.coachesTable, awayTeam);
        var homeCoachRow = findCoachRow(tables.coachesTable, homeTeam);

        var awayCoachName = awayCoachRow ? awayCoachRow.querySelector('td:nth-of-type(2)').innerText.trim() : '';
        var homeCoachName = homeCoachRow ? homeCoachRow.querySelector('td:nth-of-type(2)').innerText.trim() : '';

        awayTeamCell.innerHTML = awayTeam + ' (Coach: ' + awayCoachName + ')';
        homeTeamCell.innerHTML = homeTeam + ' (Coach: ' + homeCoachName + ')';
      }
    });
  }

  function findCoachRow(table, teamName) {
    var rows = table.querySelectorAll('tr');
    for (var i = 1; i < rows.length; i++) { // Start from index 1 to skip the table header row
      var row = rows[i];
      var column = row.querySelector('td:first-of-type');
      var anchor = column.querySelector('a');
      if (anchor && anchor.innerText.trim() === teamName) {
        return row;
      }
    }
    return null;
  }

  // Run the script when the page has finished loading
  window.addEventListener('load', updateTeamNames);
})();
