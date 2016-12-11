function handleFormSubmission(evt) {
  var form = evt.source;
  var formResponse = evt.response;
  var guestNameItemId = PropertiesService.getScriptProperties().getProperty("GUEST_NAME_FORM_ITEM_ID");
  var hostNameItemId = PropertiesService.getScriptProperties().getProperty("HOST_NAME_FORM_ITEM_ID");

  var guestNameItem = form.getItemById(guestNameItemId);
  var guestNameResponse = formResponse.getResponseForItem(guestNameItem);
    var guestName = guestNameResponse.getResponse();

  var hostNameItem = form.getItemById(hostNameItemId);
  var hostNameResponse = formResponse.getResponseForItem(hostNameItem);

  var hostFullName = hostNameResponse.getResponse();
  var hostSlackName = findSlackUsernameForStaffMemberName_(hostFullName);

  
  Logger.log("Finding Slack user " + hostFullName);
  Logger.log("Notifying slack user " + hostSlackName);

  if (! hostSlackName)
    return;

  postResponse_(hostSlackName, guestName);
}

function postResponse_(slackUsername, visitorName) {

  var slackUsernameToPostAs = PropertiesService.getScriptProperties().getProperty("SLACK_USERNAME");
  var slackChannelToPostTo  = PropertiesService.getScriptProperties().getProperty("SLACK_CHANNEL");

  var directMessagePayload = {
    "channel": "@" + slackUsername,
    "username": slackUsernameToPostAs,
    "icon_emoji": ":office:",
    "text": (visitorName || "Someone") + " is here to see " + slackUsername + "!"
  };

  var directMessageRequestOptions = {
    'method': 'POST',
    'payload': JSON.stringify(directMessagePayload)
  };

  var channelPayload = {
    "channel": slackChannelToPostTo,
    "username": slackUsernameToPostAs,
    "icon_emoji": ":office:",
    "text": (visitorName || "Someone") + " is here to see @" + slackUsername + "!"
  };

  var channelRequestOptions = {
    'method': 'POST',
    'payload': JSON.stringify(channelPayload)
  };


  var url = PropertiesService.getScriptProperties().getProperty("SLACK_WEBHOOK_URL");

  var directMessageResponse = UrlFetchApp.fetch(url, directMessageRequestOptions);
  var channelResponse = UrlFetchApp.fetch(url, channelRequestOptions);
}


function findSlackUsernameForStaffMemberName_(staffMemberName) {
  var spreadsheetId = PropertiesService.getScriptProperties().getProperty("STAFF_MEMBERS_SPREADSHEET_ID");
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var staffMembersSheet = ss.getSheetByName("Staff Members");


  // get the values in the first column accept header row 1
  var staffMemberValues = staffMembersSheet.getRange(2, 1, staffMembersSheet.getMaxRows() - 1, 2).getValues();

  // convert 2D to 1D array and ignore empty cells
  for(var i = 0; i < staffMemberValues.length; i++)
    if(staffMemberValues[i][0] !== "" && staffMemberValues[i][0] === staffMemberName)
      return staffMemberValues[i][1];


  return null;
}

