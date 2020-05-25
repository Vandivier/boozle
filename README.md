# boozle

Boozle is a set of tools for you to make your own game.
These tools are generally meant to facilitate house rule RPG game play.

The three main tools are:

1. A CSV, or spreadsheet, defining some basic game rules and world content. Feel free to make your own.
2. A random number generator (RNG). This script randomly selects events and other things out of the CSV.
3. A general game pattern. See below section. This can be modified, but it provides a simple game starting point.

## Running the random event generator script

1. Copy the game-template-rules.csv and rename game-current-rules.csv
2. Activate or deactivate each rule by putting a 0 or 1 in the is-active column.
3. Creating a random event is the default action. To run the default action type `npm start`.
4. To execute a custom action use `npm run custom-action my-action`.
    1. This will select a random row from the game-current-rules.csv spreadsheet where the rule-type column is "my-action".
5. To execute a simple roll use `npm run simple-roll`
    1. This will return a random number inclusively between 1 and 6.
    2. More complex rolls like `npm run simple-roll 5d10` are supported. Supported formats are here: http://rpg.greenimp.co.uk/dice-roller/

## General Game Pattern

You can do whatever you want, but here's a basic pattern if you aren't sure what to do:

1. Pick meta rule with optional meta-rule modifiers.
    1. It's recommended you have at least one player who has played before. Then you can let them control mechanics, etc.
2. Decisionmakers then select game mechanics.
3. Assign turn order. The default turn order identification mechanic is everyone rolls a die in alphabetical name order and high roll goes first.
4. Take turns.
    1. Default turn content is to get 1 action point. That is, take 1 strategic action followed by 1 random action.
    2. If a player obtains additional action points, the ratio of strategic action to random action is determined by decisionmakers.
