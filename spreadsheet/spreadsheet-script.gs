function updateFormStaffMembers(){
  // a way to get the items from the form
  var formId = PropertiesService.getScriptProperties().getProperty("CHECK_IN_FORM_ID");
  var form = FormApp.openById(formId);
  
  var staffListMultiChoiceItemId = PropertiesService.getScriptProperties().getProperty("STAFF_LIST_FORM_ELEMENT_ID");
  var staffList = form.getItemById(staffListMultiChoiceItemId).asMultipleChoiceItem();

  var ss = SpreadsheetApp.getActive();
  var staffMembersSheet = ss.getSheetByName("Staff Members");

  // get the values in the first column accept header row 1
  var staffMemberValues = staffMembersSheet.getRange(2, 1, staffMembersSheet.getMaxRows() - 1).getValues();
  var staffMemberNames = [];

  // convert 2D to 1D array and ignore empty cells
  for(var i = 0; i < staffMemberValues.length; i++)    
    if(staffMemberValues[i][0] != "")
      staffMemberNames[i] = staffMemberValues[i][0];


  // populate the list
  staffList.setChoiceValues(staffMemberNames);
}
