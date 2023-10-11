// ==UserScript==
// @name         NHL94 Online -> add coaches Name to schedule with Discord link
// @namespace    http://www.nhl94online.com/
// @version      2.0
// @description  uses xpath to get a few tables and joins them on the coaches name based on href selectors in bla..bla..bla...
// @author       Stewy
// @match        https://www.nhl94online.com/html/coachpage.php*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        var gamesTable = $('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(2) table tbody tr:nth-of-type(2) td:nth-of-type(1) div table:nth-of-type(2) tbody tr td div table tbody tr:nth-of-type(5) td div table');
        var coachesTable = $('html body table:nth-of-type(3) tbody tr:nth-of-type(1) td:nth-of-type(1) table tbody tr td table:nth-of-type(2)');
        // YOU MUST UPDATE THIS TABLE TO GET CLICKABLE COACHES NAMES THAT GO TO DM IN DISCORD
        var discordUrls = {
            'coaches_name': 'https://discord.com/channels/@me/{url_unique_to_you}',
            'coaches_name': 'https://discord.com/channels/@me/{url_unique_to_you}'
        };

        // Function to hide played games
        function hidePlayedGames() {
            gamesTable.find('tr').each(function(index, row) {
                var game_played = $(row).find('td:eq(6)').text().trim();
                if (!game_played.includes('-')) {
                    $(row).hide();
                }
            });
        }

        gamesTable.find('tr').each(function(index, row) {
            var awayTeamCell = $(row).find('td:eq(1)');
            var homeTeamCell = $(row).find('td:eq(3)');
            var awayTeam = awayTeamCell.text().trim();
            var homeTeam = homeTeamCell.text().trim();

            var awayCoachName = coachesTable.find('tr:contains(' + awayTeam + ')').find('td:eq(1)').text().trim();
            var homeCoachName = coachesTable.find('tr:contains(' + homeTeam + ')').find('td:eq(1)').text().trim();

            var awayCoachLink = discordUrls[awayCoachName] ? '<a href="' + discordUrls[awayCoachName] + '" target="_blank">' + awayCoachName + '</a>' : awayCoachName;
            var homeCoachLink = discordUrls[homeCoachName] ? '<a href="' + discordUrls[homeCoachName] + '" target="_blank">' + homeCoachName + '</a>' : homeCoachName;

            awayTeamCell.html(awayTeam + ' (Coach: ' + awayCoachLink + ')');
            homeTeamCell.html(homeTeam + ' (Coach: ' + homeCoachLink + ')');
        });

        // Inject a button below the games table
        var toggleButton = $('<button>').text('Toggle Played Games').css({
            'display': 'block',
            'margin': '10px 0',
            'padding': '5px 10px'
        });
        gamesTable.after(toggleButton);

        var gamesAreHidden = false;

        // Toggle visibility of played games on button click
        toggleButton.click(function() {
            if (gamesAreHidden) {
                gamesTable.find('tr').show();
                gamesAreHidden = false;
            } else {
                hidePlayedGames();
                gamesAreHidden = true;
            }
        });
    });
})();
