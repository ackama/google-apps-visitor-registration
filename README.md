# Google Apps Script-powered Visitor Check-In System

This repository contains set up instructions and Google Script files to allow for a registration form that accepts registrations for visitors. It is intended to be a starting point, which is why it is not delivered in the form of a [Google Apps Script Library](https://developers.google.com/apps-script/guide_libraries). Please use these scripts to get your own system going, then customize it to meet your needs!

# Features

* Auto-populates are "Who are you here to see?" field from a spreadsheet
* Records responses to the form in a spreadsheet for logging (kind of built-into Google Forms, but I'm claiming it)
* Posts a message to a configurable Slack channel when a visitor checks in
* Posts a direct message to the person the visitor is there to see on Slack

# How we use it

* We have an iPad set up in our reception that has guided access on that keeps the form open at all times.
* Visitors (mostly remember to) fill in the form
* We have a Slack channel, "#wellington-doorbell" which has messages posted to it. People who receive visitors frequently subscribe to this channel, all others can do so if they wish, but don't have to.
* We have a moderated list of staff members in a spreadsheet that updates the "Who are you here to see?" field. By moderated, I mean that it has a list of frequently visited people referred to by name, and a bunch of general options, such as "I am a courier with a delivery", etc. Each of these "staff members" has a corresponding Slack username that will be DM'd in addition to the channel when a visitor checks-in for them (e.g. "I am a courier with a delivery" goes to our office manager).
* The combination of a Slack DM and channel mention is usually enough to get people to the door.

# Setting up

This project was set up specifically for our needs with a bunch of experimentation, so there's a few steps that need to be done to set up your own instance.

1. To set up the form, along with the recording of responses in a spreadsheet and the slack integration, check out the [more detailed README in the `form/` directory](form/README.md).
2. To extend the form spreadsheet with a new sheet for recording staff members that automatically update the options in the form, check out the [other detailed README in the `spreadsheet/` directory](spreadsheet/README.md).

# License

See [LICENSE.md](LICENSE.md)
