# NHL94 Online Adds Coaches' Names to Team Names User Script

This user script adds the coaches' names next to the team names on the NHL94 Online coach page. It retrieves specific tables using XPath and joins them based on the coaches' names.

## Installation

1. Install a user script manager extension for your browser such as Tampermonkey.
2. Click on the Tampermonkey extension icon and choose "Create a new script".
3. Copy the contents of the [append_coaches_name_to_team.user.js](append_coaches_name_to_team.user.js) file.
4. Replace the existing template in the Tampermonkey editor with the copied script.
5. Save the script.

## Usage

1. Navigate to the [NHL94 Online coach page](https://www.nhl94online.com/html/coachpage.php).
2. The script will automatically run when the page loads.
3. The team names in the games table will be updated to include the respective coaches' names.

## Notes

- This user script is designed to work specifically on the NHL94 Online coach page.
- The script uses jQuery and XPath to retrieve and manipulate the tables.
- The coach names are retrieved based on specific HTML structure assumptions. Modifying the script to work with changes to the page structure may require adjustments to the XPath selectors used.
- This user script does not require any additional grants or permissions.

## License

This user script is released under the [MIT License](LICENSE).