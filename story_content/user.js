window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  // Install the click listener only once
if (!window.slDropdownCloserInstalled) {

    window.slDropdownCloserInstalled = true;

    document.addEventListener("click", function () {

        setTimeout(function () {

            var player = GetPlayer();

            // Ignore the same click that opened the dropdown
            if (player.GetVar("IgnoreNextClick") === true) {

                // Reset so the NEXT click can close the dropdown
                player.SetVar("IgnoreNextClick", false);

                return;
            }

            // Any subsequent click closes the open dropdown
            player.SetVar("CloseDropdown", true);

        }, 50);

    });
}
}

window.Script2 = function()
{
  /*
==========================================================
SLIDE 1.6: UNLOCK NEXT AFTER REVIEWING ALL THREE TABS
==========================================================

PURPOSE:
Check whether the learner has completed all three
AWS access method tabs.

The Next button will unlock only when all three
review variables are TRUE.

WHEN TO TRIGGER:
Execute JavaScript when the timeline starts
on the Base Layer of slide 1.6 Access2AWS.

STORYLINE VARIABLES:
ConsoleReviewed       (True/False)
CLIReviewed           (True/False)
ProgrammaticReviewed  (True/False)
AccessTabsComplete    (True/False)

IMPORTANT:
Each review variable must become TRUE only after
the learner completes the 15-second reading period
and clicks Close on the corresponding layer.

This script does not directly modify the Next button.
A separate Storyline trigger will enable Next when
AccessTabsComplete becomes TRUE.
==========================================================
*/

var player = GetPlayer();

// Reset the completion check.
player.SetVar("AccessTabsComplete", false);

// Clear any previously running timer.
if (window.accessTabsTimer) {
    clearInterval(window.accessTabsTimer);
}

// Check completion every 500 milliseconds.
window.accessTabsTimer = setInterval(function () {

    var consoleDone = player.GetVar("ConsoleReviewed");
    var cliDone = player.GetVar("CLIReviewed");
    var programmaticDone = player.GetVar("ProgrammaticReviewed");

    // All three tabs must be completed.
    if (
        consoleDone === true &&
        cliDone === true &&
        programmaticDone === true
    ) {

        // Mark the activity as completed.
        player.SetVar("AccessTabsComplete", true);

        // Stop checking once all tabs are completed.
        clearInterval(window.accessTabsTimer);

        window.accessTabsTimer = null;
    }

}, 500);
}

window.Script3 = function()
{
  /*
==========================================================
SLIDE 1.7: IAM POLICIES - UNLOCK NEXT BUTTON
==========================================================

PURPOSE:
Track the completion of all six IAM Policy tabs.

The Next button becomes available only after the
learner has reviewed all six policy layers.

WHEN TO TRIGGER:
Execute JavaScript when the timeline starts
on the Base Layer of slide 1.7 IAM Policies.

STORYLINE VARIABLES:

AllowReviewed             (True/False)
ImplicitDenyReviewed      (True/False)
ExplicitDenyReviewed      (True/False)
LeastPrivilegeReviewed    (True/False)
IdentityPolicyReviewed    (True/False)
ResourcePolicyReviewed    (True/False)

PoliciesComplete          (True/False)

IMPORTANT:

1. All variables must initially be False.

2. Each review variable becomes True when the
   learner clicks Close on its corresponding layer.

3. Each layer's Close button must remain disabled
   for the first 15 seconds.

4. A separate Storyline trigger enables Next when
   PoliciesComplete becomes True.

5. The script automatically stops checking once
   all six policy tabs have been completed.

==========================================================
*/

var player = GetPlayer();


// -------------------------------------------------------
// STEP 1: STOP ANY PREVIOUS COMPLETION CHECK
// -------------------------------------------------------

if (window.iamPoliciesTimer) {

    clearInterval(window.iamPoliciesTimer);

    window.iamPoliciesTimer = null;

}


// -------------------------------------------------------
// STEP 2: CHECK ALL SIX REVIEW VARIABLES
// -------------------------------------------------------

function checkIAMPoliciesCompletion() {

    var allowDone =
        player.GetVar("AllowReviewed");

    var implicitDenyDone =
        player.GetVar("ImplicitDenyReviewed");

    var explicitDenyDone =
        player.GetVar("ExplicitDenyReviewed");

    var leastPrivilegeDone =
        player.GetVar("LeastPrivilegeReviewed");

    var identityPolicyDone =
        player.GetVar("IdentityPolicyReviewed");

    var resourcePolicyDone =
        player.GetVar("ResourcePolicyReviewed");


    // ---------------------------------------------------
    // STEP 3: UNLOCK NEXT ONLY WHEN ALL SIX ARE TRUE
    // ---------------------------------------------------

    if (

        allowDone === true &&

        implicitDenyDone === true &&

        explicitDenyDone === true &&

        leastPrivilegeDone === true &&

        identityPolicyDone === true &&

        resourcePolicyDone === true

    ) {

        // Mark the policy activity as completed.

        player.SetVar("PoliciesComplete", true);


        // Stop checking once everything is completed.

        clearInterval(window.iamPoliciesTimer);

        window.iamPoliciesTimer = null;

    }

}


// -------------------------------------------------------
// STEP 4: CHECK COMPLETION EVERY 500 MILLISECONDS
// -------------------------------------------------------

// Run an initial check when the slide opens.

checkIAMPoliciesCompletion();


// Continue checking if the activity is not complete.

if (player.GetVar("PoliciesComplete") !== true) {

    window.iamPoliciesTimer = setInterval(

        checkIAMPoliciesCompletion,

        500

    );

}
}

window.Script4 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script5 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script6 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script7 = function()
{
  /*
========================================================
STORYLINE 360 – VALIDATE IAM USER LOGIN DETAILS
========================================================

Purpose:
Validates the learner's IAM username and password before
allowing them to continue in the AWS simulation.

Storyline trigger:
Execute JavaScript

When:
User clicks the login / submit button after entering
the IAM username and password.

Storyline variables used:
UserName
Password
EntryValid
ValidationMessage
AlexCreated
CurrentIAMUser

Expected username:
alex.morgan

Expected password:
AWSLab@2026!

What this script does:
1. Reads the learner's username and password.
2. Removes unnecessary spaces.
3. Converts the username to lowercase.
4. Checks whether the username field is empty.
5. Checks whether the username is alex.morgan.
6. Checks whether the password field is empty.
7. Checks whether the password is correct.
8. Prevents alex.morgan being created twice in the same
   lab session if AlexCreated is already True.
9. If everything is correct:
   - CurrentIAMUser becomes alex.morgan
   - EntryValid becomes True
   - ValidationMessage is cleared

Storyline setup:
Use EntryValid = True to allow the learner to continue.

Use ValidationMessage in a text box such as:
%ValidationMessage%

Important:
The password is written directly inside this JavaScript,
so change it here if the lab password changes later.
========================================================
*/

(function () {

    var player = GetPlayer();

    // Read learner input
    var username = player.GetVar("UserName") || "";
    var password = player.GetVar("Password") || "";

    // Clean learner input
    username = username.trim().toLowerCase();
    password = password.trim();

    // Reset validation before checking the entries
    player.SetVar("EntryValid", false);
    player.SetVar("ValidationMessage", "");

    // Check for empty username
    if (username === "") {
        player.SetVar(
            "ValidationMessage",
            "Please enter the IAM user name."
        );
        return;
    }

    // Check that the username is alex.morgan
    if (username !== "alex.morgan") {
        player.SetVar(
            "ValidationMessage",
            "Incorrect user name. Please enter alex.morgan."
        );
        return;
    }

    // Check for empty password
    if (password === "") {
        player.SetVar(
            "ValidationMessage",
            "Please enter the console password."
        );
        return;
    }

    // Check that the password is correct
    if (password !== "AWSLab@2026!") {
        player.SetVar(
            "ValidationMessage",
            "Incorrect password. Please check the lab instructions and try again."
        );
        return;
    }

    // Prevent duplicate creation during the same lab session
    if (player.GetVar("AlexCreated") === true) {
        player.SetVar(
            "ValidationMessage",
            "alex.morgan has already been created in this lab session."
        );
        return;
    }

    // All validation checks passed
    player.SetVar("CurrentIAMUser", "alex.morgan");
    player.SetVar("EntryValid", true);
    player.SetVar("ValidationMessage", "");

})();
}

window.Script8 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM USERNAME
========================================================

Purpose:
Copies the IAM username to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks the copy icon beside the Username.

Value copied:
alex.morgan

Storyline variables used:
None

Result:
The learner can paste the username directly into the
AWS IAM username field without leaving the simulation.
========================================================
*/

navigator.clipboard.writeText("alex.morgan");
}

window.Script9 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM PASSWORD
========================================================

Purpose:
Copies the IAM training password to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks the copy icon beside the Password.

Value copied:
AWSLab@2026!

Storyline variables used:
None

Result:
The learner can paste the password directly into the
AWS password field without leaving the simulation.

Important:
This is the training password used only for this lab.
If the lab password changes later, update the value
inside this JavaScript.
========================================================
*/

navigator.clipboard.writeText("AWSLab@2026!");
}

window.Script10 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script11 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script12 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script13 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM ROLE ARN TO CLIPBOARD
========================================================

Purpose:
Copies the IAM Role ARN to the learner's clipboard.

Storyline trigger:
Execute JavaScript

When:
User clicks the ARN copy button / hotspot

Object:
Btn_CopyARN

What gets copied:
arn:aws:iam::411902101442:role/S3BucketAccess

After this script runs, the learner can paste the ARN
using Ctrl + V wherever it is needed.
========================================================
*/

navigator.clipboard.writeText(
    "arn:aws:iam::411902101442:role/S3BucketAccess"
);
}

window.Script14 = function()
{
  /*
========================================================
STORYLINE 360 – BLINK LOGOUT GUIDE
========================================================

Purpose:
Makes the Logout guide rectangle blink repeatedly.

Storyline trigger:
Execute JavaScript

When:
User clicks Btn_CopyARN

Storyline variable used:
Blink_Guide_Logout

How it works:
- Checks whether an old logout blink timer is already running.
- Stops the old timer if needed.
- Starts a new timer.
- Every 600 milliseconds, it switches
  Blink_Guide_Logout between True and False.
- Storyline triggers then use that variable to switch
  Guide_Logout between its Normal and Blink states.

Important:
Do NOT run this JavaScript when the layer starts.
Run it only after the learner clicks Btn_CopyARN.
========================================================
*/

var player = GetPlayer();

if (window.logoutBlinkTimer) {
    clearInterval(window.logoutBlinkTimer);
}

window.logoutBlinkTimer = setInterval(function () {
    var current = player.GetVar("Blink_Guide_Logout");
    player.SetVar("Blink_Guide_Logout", !current);
}, 600);
}

window.Script15 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script16 = function()
{
  /*
========================================================
STORYLINE 360 – VALIDATE ALEX.MORGAN LOGIN
========================================================

Purpose:
Checks the learner's IAM username and password and gives
a specific error message depending on what is wrong.

Storyline trigger:
Execute JavaScript

When:
User clicks Button_Sigin

Storyline variables used:
TextEntry          = Username
TextEntry1         = Password
AlexLoginCorrect   = True/False
ValidationMessage  = Message shown on Login_Error layer

Correct username:
alex.morgan

Correct password:
AWSLab@2026!

Possible messages:
- Username is empty
- Username is incorrect
- Password is empty
- Password is incorrect

If both are correct:
AlexLoginCorrect = True
========================================================
*/

var player = GetPlayer();

// Read learner input
var username = player.GetVar("TextEntry") || "";
var password = player.GetVar("TextEntry1") || "";

// Clean the entries
username = username.trim().toLowerCase();
password = password.trim();

// Reset validation
player.SetVar("AlexLoginCorrect", false);
player.SetVar("ValidationMessage", "");

// Username field is empty
if (username === "") {

    player.SetVar(
        "ValidationMessage",
        "Please enter the IAM user name."
    );

// Username is incorrect
} else if (username !== "alex.morgan") {

    player.SetVar(
        "ValidationMessage",
        "Incorrect user name. Please enter alex.morgan."
    );

// Password field is empty
} else if (password === "") {

    player.SetVar(
        "ValidationMessage",
        "Please enter the console password."
    );

// Password is incorrect
} else if (password !== "AWSLab@2026!") {

    player.SetVar(
        "ValidationMessage",
        "Incorrect password. Please check the lab instructions and try again."
    );

// Both username and password are correct
} else {

    player.SetVar("AlexLoginCorrect", true);
    player.SetVar("ValidationMessage", "");
}
}

window.Script17 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM USERNAME
========================================================

Purpose:
Copies the IAM username to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks the copy icon beside the Username.

Value copied:
alex.morgan

Storyline variables used:
None

Result:
The learner can paste the username directly into the
AWS IAM username field without leaving the simulation.
========================================================
*/

navigator.clipboard.writeText("alex.morgan");
}

window.Script18 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM PASSWORD
========================================================

Purpose:
Copies the IAM training password to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks the copy icon beside the Password.

Value copied:
AWSLab@2026!

Storyline variables used:
None

Result:
The learner can paste the password directly into the
AWS password field without leaving the simulation.

Important:
This is the training password used only for this lab.
If the lab password changes later, update the value
inside this JavaScript.
========================================================
*/

navigator.clipboard.writeText("AWSLab@2026!");
}

window.Script19 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script20 = function()
{
  /*
========================================================
STORYLINE 360 – VALIDATE AWS SWITCH ROLE DETAILS
========================================================

Purpose:
Checks the two learner entries on the AWS "Switch Role"
screen before allowing the learner to continue.

Storyline trigger:
Execute JavaScript

When:
User clicks the B_Switch Role button.

Text-entry variables checked:
1. SwitchRole_AccountID
2. SwitchRole_RoleName

Correct values:
Account ID:
411902101442

IAM Role Name:
S3BucketAccess

Variables this script updates:
SwitchRoleValid
    True  = both entries are correct
    False = one or both entries are incorrect

SwitchRoleMessage
    Contains the error message to display to the learner.

Recommended Storyline triggers AFTER this JavaScript:
1. Show the next layer
   IF SwitchRoleValid = True

2. Show the error layer/message
   IF SwitchRoleValid = False

Important:
The JavaScript performs the validation only.
Storyline should control which layer appears afterwards.
========================================================
*/

(function () {

    var player = GetPlayer();

    // Read the learner's entries.
    // If either variable is empty, use an empty string instead.
    var accountID =
        player.GetVar("SwitchRole_AccountID") || "";

    var roleName =
        player.GetVar("SwitchRole_RoleName") || "";

    // Remove accidental spaces before or after the entries.
    accountID = accountID.trim();
    roleName = roleName.trim();

    // Reset the result before performing validation.
    player.SetVar("SwitchRoleValid", false);
    player.SetVar("SwitchRoleMessage", "");

    // Check whether the Account ID field is empty.
    if (accountID === "") {
        player.SetVar(
            "SwitchRoleMessage",
            "Please enter the AWS Account ID."
        );
        return;
    }

    // Check whether the Account ID is correct.
    if (accountID !== "411902101442") {
        player.SetVar(
            "SwitchRoleMessage",
            "Incorrect Account ID. Please check the lab instructions and try again."
        );
        return;
    }

    // Check whether the IAM Role Name field is empty.
    if (roleName === "") {
        player.SetVar(
            "SwitchRoleMessage",
            "Please enter the IAM role name."
        );
        return;
    }

    // Check whether the IAM Role Name is correct.
    if (roleName !== "S3BucketAccess") {
        player.SetVar(
            "SwitchRoleMessage",
            "Incorrect IAM role name. Please check the lab instructions and try again."
        );
        return;
    }

    // Both entries are correct.
    player.SetVar("SwitchRoleValid", true);
    player.SetVar("SwitchRoleMessage", "");

})();
}

window.Script21 = function()
{
  /*
========================================================
STORYLINE 360 – COPY IAM ROLE NAME
========================================================

Purpose:
Copies the IAM role name to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks copy2_shp beside the IAM Role name.

Value copied:
S3BucketAccess

Storyline variables used:
None

Result:
The learner can paste the IAM role name directly into
the Switch Role field without leaving the simulation.
========================================================
*/

navigator.clipboard.writeText("S3BucketAccess");
}

window.Script22 = function()
{
  /*
========================================================
STORYLINE 360 – COPY AWS ACCOUNT ID
========================================================

Purpose:
Copies the AWS Account ID to the learner's clipboard.

Trigger:
Execute JavaScript

When:
User clicks copy1_shp beside the Account ID.

Value copied:
411902101442

Storyline variables used:
None

Result:
The learner can paste the Account ID directly into
the Switch Role Account ID field without leaving
the simulation.
========================================================
*/

navigator.clipboard.writeText("411902101442");
}

window.Script23 = function()
{
  /*
PURPOSE:
Automatically records the learner's certificate completion
date and time in a short format suitable for the certificate.

TRIGGER:
Run when the timeline starts on the Certificate layer.

STORYLINE VARIABLE:
CompletionDateTime - Text variable

EXAMPLE OUTPUT:
19 Sep 2026, 3:20 pm

TIMEZONE:
Australia/Sydney.
*/

var player = GetPlayer();

var currentValue = player.GetVar("CompletionDateTime");

// Record the completion time only once
if (!currentValue || currentValue.trim() === "") {

    var now = new Date();

    var formattedDateTime = new Intl.DateTimeFormat("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Australia/Sydney"
    }).format(now);

    // Remove " at " if the browser inserts it
    formattedDateTime = formattedDateTime.replace(" at ", ", ");

    player.SetVar("CompletionDateTime", formattedDateTime);
}
}

window.Script24 = function()
{
  /*
=====================================================================
AWS IAM CERTIFICATE: PDF DOWNLOAD + STORYLINE NOTIFICATION + EMAIL

PURPOSE:
Create a PDF certificate using the course's certificate background,
download it, show a five-second Storyline notification, and send a
certificate-download request to the instructor's Google Apps Script.

STORYLINE TRIGGER:
Execute JavaScript when learner clicks Btn_Download on Certificate layer.

STORYLINE VARIABLES:
LearnerName (Text), CompletionDateTime (Text),
CertificateDownloaded (True/False; default False).

OTHER STORYLINE TRIGGERS:
- Btn_Download: Show Name_Required if LearnerName is blank.
- Certificate layer: Show Download_Notify when CertificateDownloaded
  changes to True and CertificateDownloaded == True.
- Download_Notify layer: Hide this layer when its 5-second timeline ends.

COURSE RESOURCE:
story_content/external_files/Layout_Certificate_PDF.png

SETUP BEFORE USE:
Replace YOUR_WEB_APP_URL_HERE in Step 11 with your actual Apps Script
Web app URL ending in /exec. Do not put a Gmail password in this code.

LIMITATION:
The email reports that a browser download was initiated, not that a
file was saved or that the learner's identity was independently verified.
=====================================================================
*/
(async function () {
    "use strict";

    var player = GetPlayer();
    var learnerName = String(player.GetVar("LearnerName") || "").trim();
    var completionDate = String(player.GetVar("CompletionDateTime") || "").trim();

    // STEP 1: Check name. The separate Storyline trigger shows Name_Required.
    // No alert here: a browser alert previously interfered with text-entry focus.
    if (!learnerName) {
        return;
    }

    // STEP 2: Load jsPDF only if it is not already present.
    async function loadPDFLibrary() {
        if (window.jspdf && window.jspdf.jsPDF) {
            return;
        }
        await new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/3.0.1/jspdf.umd.min.js";
            script.onload = resolve;
            script.onerror = function () {
                reject(new Error("The PDF library could not be loaded."));
            };
            document.head.appendChild(script);
        });
        if (!window.jspdf || !window.jspdf.jsPDF) {
            throw new Error("The PDF library is unavailable.");
        }
    }

    // STEP 3: Load the PNG packed in the published Storyline Resources.
    async function loadCertificateBackground() {
        var fileName = "Layout_Certificate_PDF.png";
        var frames = [window];
        try {
            if (window.parent !== window) {
                frames.push(window.parent);
            }
            if (window.top !== window.parent) {
                frames.push(window.top);
            }
        } catch (e) {
            // An LMS may block reading parent-frame information.
        }

        var paths = [
            "story_content/external_files/" + fileName,
            "external_files/" + fileName,
            "../external_files/" + fileName,
            "../story_content/external_files/" + fileName,
            "../../story_content/external_files/" + fileName
        ];
        var checked = new Set();

        for (var frame of frames) {
            var baseURL;
            try {
                baseURL = frame.location.href;
            } catch (e) {
                continue;
            }
            for (var path of paths) {
                var url = new URL(path, baseURL).href;
                if (checked.has(url)) {
                    continue;
                }
                checked.add(url);
                try {
                    var response = await fetch(url);
                    if (!response.ok) {
                        continue;
                    }
                    var blob = await response.blob();
                    if (!blob.type.startsWith("image/")) {
                        continue;
                    }
                    return await new Promise(function (resolve, reject) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            resolve(reader.result);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                } catch (e) {
                    // Try the next likely published-resource location.
                }
            }
        }
        throw new Error("Layout_Certificate_PDF.png was not found in course Resources.");
    }

    // STEP 4: Generate the PDF, handling PDF errors separately from email errors.
    try {
        await loadPDFLibrary();
        var certificateImage = await loadCertificateBackground();
        var jsPDF = window.jspdf.jsPDF;
        var pageWidth = 297;
        var pageHeight = 167.2;
        var doc = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: [pageWidth, pageHeight]
        });

        // STEP 5: Place the clean certificate image across the PDF page.
        doc.addImage(certificateImage, "PNG", 0, 0, pageWidth, pageHeight);

        // STEP 6: Put the learner's name inside the name field.
        doc.setFont("helvetica", "bold");
        doc.setTextColor(20, 41, 82);
        var nameFontSize = 20;
        doc.setFontSize(nameFontSize);
        while (doc.getTextWidth(learnerName) > 165 && nameFontSize > 11) {
            nameFontSize--;
            doc.setFontSize(nameFontSize);
        }
        doc.text(learnerName, pageWidth / 2, 65.5, {
            align: "center",
            baseline: "middle",
            maxWidth: 165
        });

        // STEP 7: Put the completion date near the line in your PDF layout.
        // The y-coordinate (132) is copied from your current script.
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(20, 41, 82);
        doc.text(completionDate, 49.5, 132);

        // STEP 8: Make a filename using the learner's name.
        var safeName = learnerName.replace(/[^a-zA-Z0-9_-]/g, "_");
        var fileName = "AWS_IAM_Certificate_" + safeName + ".pdf";

        // STEP 9: Start the browser's PDF download.
        doc.save(fileName);

        // STEP 10: Display Download_Notify for five seconds.
        // Resetting False first allows the variable-change trigger to run
        // for subsequent downloads too. Do not set True twice.
        player.SetVar("CertificateDownloaded", false);
        player.SetVar("CertificateDownloaded", true);

    /*
			==========================================================
			STEP 11: SEND CERTIFICATE DOWNLOAD EMAIL NOTIFICATION
			
			PURPOSE:
			Send the learner's name, course name and completion
			date/time to Google Apps Script.
			
			TRIGGER:
			Runs when the learner clicks Btn_Download on the
			Certificate layer, after PDF generation has started.
			
			STORYLINE VARIABLES:
			LearnerName
			CompletionDateTime
			
			EMAIL RECIPIENT:
			mizan1214@gmail.com
			
			NOTE:
			The email request runs separately and does not block
			the PDF download or Storyline notification.
			==========================================================
			*/
			
			// STEP 11A: Google Apps Script Web App URL
			
			var emailWebAppURL =
			    "https://script.google.com/macros/s/AKfycbxv6zJiaM7y4X-I038gir83TrSlKl6ElFErwPvG9GZqBrT4yZr5H7ZPTNSRXDHVOEV3/exec";
			
			
			// STEP 11B: Prepare the learner's completion information
			
			var emailData = new URLSearchParams({
			
			    learnerName: learnerName,
			
			    completionDate: completionDate,
			
			    courseName:
			        "Module 2B: AWS Identity & Access Management (IAM) and Amazon Athena"
			
			});
			
			
			// STEP 11C: Send the information to Google Apps Script
			
			fetch(emailWebAppURL, {
			
			    method: "POST",
			
			    mode: "no-cors",
			
			    keepalive: true,
			
			    body: emailData
			
			}).catch(function (emailError) {
			
			    // Record any network error in the browser console.
			    console.error(
			        "STEP 11: Email notification request failed:",
			        emailError
			    );
			
			});
			     
    
    
    
    } catch (pdfError) {
        // STEP 12: Handle PDF generation/download errors.
        // This handler is separate from the email request's .catch(...).
        console.error("STEP 12: Certificate PDF error:", pdfError);
        alert("The certificate could not be generated. " + pdfError.message);
    }
})();

}

window.Script25 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script26 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script27 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

window.Script28 = function()
{
  /*
========================================================
STORYLINE 360 – GENERAL GUIDE BLINK TIMER
========================================================

Purpose:
Creates a reusable blinking effect for guide objects
such as rectangles, arrows, fingers, or highlights.

Storyline trigger:
Execute JavaScript

When:
Usually when the relevant slide/layer starts,
or when you want the general guide blinking to begin.

Storyline variable used:
GuideBlink

How it works:
- Gets the Storyline player.
- Checks whether a previous guide blink timer is running.
- Stops the old timer to prevent duplicate timers.
- Starts a new timer.
- Every 600 milliseconds, GuideBlink switches
  between True and False.

Storyline setup:
Use variable triggers such as:

If GuideBlink = True
→ change guide object to Blink state

If GuideBlink = False
→ change guide object to Normal state

Important:
Any object listening to GuideBlink will start reacting
as soon as this timer is running.

Use a separate variable/timer if one particular guide
must start blinking only after a specific learner action.
========================================================
*/

var player = GetPlayer();

// Stop any previous general guide blinking timer
if (window.guideBlinkTimer) {
    clearInterval(window.guideBlinkTimer);
}

// Toggle GuideBlink every 600 milliseconds
window.guideBlinkTimer = setInterval(function () {
    var current = player.GetVar("GuideBlink");
    player.SetVar("GuideBlink", !current);
}, 600);
}

};
