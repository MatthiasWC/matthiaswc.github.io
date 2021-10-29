---
layout: post
title: Pre-Alpha II&colon; Journey of a Thousand Lifetimes
---

## My Tasks

#### Programming

I had 3 programming tasks this sprint:

- Finish commenting the Visuals/VFX scripts
- Finish adding easily replacable crosshairs to the Weapon Scriptable Object
- Implement an option that allows every weapon to be easily toggleable between hitscan and projectile modes

#### Design

I didn't have any formal design tasks at the beginning of this sprint, but as I will discuss, many informal tasks were quickly piled on. Toward the end of the sprint, a formal design task was added, which was:

- Design the game's first hitscan enemy

## Explicit Hours Breakdown


10/19/2021, 11:30 PM - 11:40 PM
Looked over the single-shot redesign, messaged Brandon
12:00 AM - 3:20 AM
Started by talking about Brandon's redesign of the single-shot weapon, launched off into a huge conversation about how we want to implement the weapons, the enemies, and the levels around the feeling of the combat
Basically designed the remaining weapons, spitballed a ton of enemies, talked at length about how we want to design levels
Settled on an overarching direction for the game
Wrote up a document with all of our ideas

10/20/2021 1:00 PM - 2:40 PM
Re-designed the Spreadshot weapon as per Brandon's and my conversation the previous night

10/21/2021 9:30 PM - 12:00 AM
Attended leads meeting, helped define official direction of the game

10/22/2021 3:25 PM - 8:25 PM
Looked at the 2 scripts in Visuals that weren't well-commented, looked for references in Scripts and the Unity editor
Commented one of the scripts that seemed to be used in the Unity editor, commented on the other one that it didn't seem to be used anywhere
Submitted pull request for VFX/Visuals Code Commenting
Started working on scriptable crosshairs again
Figured out that the transform of the crosshair changed somehow, set it to 0 and it showed up again
Realized that enabling/disabling the sprites is a bad way of doing things, Instantiated/Destroyed the prefabs instead
Decided to create a separate CrosshairUIManager script instead of doing this in the AmmoUIManager script
Only destroying the parent Animator didn't work, had to destroy the children separately
Crosshair went in front of menu, fixed it by making the crosshair disappear on pause and resume
Realized that the crosshair appeared before the level faded in, spent a while trying to find out where the level faded in
Eventually asked George and he told me that there was a black sprite overlaying the scene and it just changed opacity
Spent a while messing with the Z values of the crosshairs but it didn't seem to do anything, eventually did some more googling and found an alternate method (GameObject.transform.SetFirstSibling or something like that)
10/22/2021 8:25 PM - 10:00 PM
Created a bunch of tasks for each department with George and Brandon
10/22/2021 10:00 PM - 10:40 PM
Cleaned up the code a little bit (removed commented-out code, unnecessary code, print statments, etc.)
Finalized crosshair scripts, added crosshair prefabs to each weapon
Submitted pull request for Scriptable Crosshairs

10/24/2021 11:30 AM - 12:40 PM
Studio meeting
Went over new programming tasks, talked briefly with Brandon about new enemy tasks