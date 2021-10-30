---
layout: post
title: Pre-Alpha II&colon; Journey of a Thousand Lifetimes
---

## My Tasks

#### Programming

I had 3 programming tasks this sprint:

- Finish commenting the Visuals/VFX scripts
- Finish adding easily replacable crosshairs to the Weapon ScriptableObject so that artists could add new crosshairs to the game with a couple clicks
- Implement an option that allows every weapon to be easily toggleable between hitscan and projectile modes

#### Design

I didn't have any formal design tasks at the beginning of this sprint, but as I will discuss, many informal tasks were quickly piled on. Toward the end of the sprint, a formal design task was added, which was:

- Design the game's first hitscan enemy

## Explicit Hours Breakdown

<table>
    <tbody>
        <tr>
            <th width="1%">Date</th>
            <th width="11%">Time</th>
            <th>Progress</th>
        </tr>
        <tr>
            <td rowspan="3">10/19</td>
            <td>10 min.</td>
            <td>The design lead asked me to look over his re-design of the single-shot weapon, so I took some time to thoroughly digest it. My re-design of the tri-shot weapon had been minimal, so when I saw that he had come up with a complex, dual-mode weapon that added a burst-fire hitscan component, I immediately knew that we weren't on the same page. We set up a call for later that night to go over it.</td>
        </tr>
        <tr></tr>
        <tr>
            <td>3 hr. 20 min.</td>
            <td>I kicked off the meeting by asking the design lead to explain the reasoning behind his design choices. I was skeptical at first, since the re-designed weapon didn't seem to fit with the existing game mechanics, but I quickly realized that was the point. The design lead wasn't re-designing the single shot for the game that we *had*, but for the game that he *wanted* to play. While this may sound obvious, I had been operating under the assumption that we weren't going to make any major changes to the existing mechanics of the game; rather, I thought that we were going to keep what was already there and simply add more. It quickly became apparent that the studio was suffering from a lack of direction, and we spiraled into a grand conversation about the goals of the studio and how exactly we wanted to achieve them. We wrote down all of our ideas and planned to introduce them at the next leads' meeting, which was being held for the very purpose of defining a direction for the game.</td>
        </tr>
        <tr>
            <td>10/20</td>
            <td>2 hr. 40 min.</td>
            <td>Now that I had a better idea of what we wanted to accomplish with our weapon re-designs, I radically overhauled my existing re-design of the tri-shot weapon. Instead of a simple, traditional weapon, the tri-shot was now in essence two weapons: a hitscan shotgun-style weapon with wide spread and low damage per bullet, and a projectile weapon with lower spread and higher damage for the center bullet(s). You should be able to see my re-re-design of the tri-shot <a href="https://studio.eecs.umich.edu/confluence/display/PB/Triple-Shot+Redesign" target="_blank">here</a>.</td>
        </tr>
        <tr>
            <td>10/21</td>
            <td>2 hr. 30 min.</td>
            <td>Now it was time for the aforementioned leads' meeting, at which we planned to agree upon an unambiguous set of goals for the studio as a whole and create an action plan to accomplish them. I ended up being one of the most vocal members of what turned out to be a long, passionate, and incredibly fruitful conversation. We successfully united behind a singular vision, addressed some of the snags in our workflow that had been causing delays, and documented a detailed manifesto defining our game. I would link the document, but access is restricted.</td>
        </tr>
        <tr>
            <td rowspan="3">10/22</td>
            <td>5 hr. 40 min.</td>
            <td>Decided to work on programming tasks. Started by looking over the two scripts in the Visuals folder that lacked good comments. To determine whether or not the scripts were actually used anywhere in the game, I searched Visual Studio and Unity for references. One of the scripts was used frequently in Unity, so I spent some time reading through it and left a few explanatory comments, but the other script did not appear to be used anywhere. Out of an abundance of caution, I left a comment at the top marking it as unused legacy code insted of deleting the script altogether. I created a pull request and moved on to my next task.<br/>
            <br/>
            If you recall from my previous devlog, I had been unable to complete my scriptable crosshairs task due to an unexpected bug: the default crosshair sprites had disappeared from the screen altogher. After scouring the internet for similar problems and finding nothing, I went back to comparing the default crosshair prefab with the temporary crosshair prefab that I had created for testing purposes. Eventually, I spotted a difference: the test crosshair's (x, y) coordinates were set to (0, 0), whereas the default crosshair's were set to some random value in the 1200's. How this could have happened is beyond me; the only change that I ever made to the default crosshair was turning it into a prefab. Regardless, I changed its coordinates to (0, 0), and it returned to its rightful place in the center of the screen.<br/>
            <br/>
            As I had written it, the crosshair sprites were always in the center of the screen, and my code simply enabled/disabled them upon switching weapons. I tried to get this to work for a while, but eventually realized that it was impossible. GameObjects in Unity's Scene Hierarchy cannot be added as attributes to ScriptableObjects, and my solution had been to convert the crosshair GameObjects int prefabs and then add those prefabs to their respective Weapon ScriptableObject. This meant that, when I tried to modify attributes of a given Weapon's crosshair within the script, I was modifying attributes of a prefab that had not been instantiated, rather than the existing crosshair within the Scene Hierarchy. My solution was to remove the existing crosshair GameObjects from the Scene Hierarchy and add/remove them from the Scene during runtime using <tt>Instantiate()</tt> and <tt>Destroy()</tt>. This still didn't seem to work. I eventually figured out that, when I was calling <tt>Destroy()</tt> on the root GameObject of the crosshair prefab, its children (the Sprites that compose the crosshair) were getting orphaned and remaining on the screen (despite some guy on StackOverflow confidently stating that this would not happen). I fixed this by iterating through the Sprites and destroying each of them in turn before eventually destroying the prefab's root.<br/>
            <br/>
            Now that the crosshair was showing up on the screen, changing when the player switched weapons, and animating properly, there was only one last bug to fix: the crosshair displayed over top of menu items when the player paused the game. I figured that I could fix this by changing the Z coordinates of the crosshair prefabs, but this didn't end up doing anything. Instead, I figured out how the event system worked, destroyed the crosshair on pause, and instantiated it again on resume. This, however, was not a comprehensive solution. The first level opens by fading in from black, but the default crosshair initialized immediately and seemed to ignore the fade-in. I spent a while trying to find the script that handled the fade-in, but eventually broke down and asked the studio lead (who I happened to be in a meeting with at the time). He informed me that the screen faded in by slowly decreasing the opacity on a black UI object that covered the screen. Knowing this, I decided to figure out how to actually change the crosshair's order in the UI Canvas. The solution ended up being one simple line of code:<br/>
            <br/>
            <tt>CrosshairAnim.transform.SetAsFirstSibling();</tt><br/>
            <br/>
            I then moved all of my code to a new, dedicated script (it had previously been living in the AmmoUIManager script), cleaned up the code, and submitted another pull request.</td>
        </tr>
        <tr></tr>
        <tr>
            <td>1 hr. 35 min.</td>
            <td>One of the action items that we decided on during the leads' meeting was to come up with a list of basic features that we knew we wanted to try out and create a backlog of tasks for each one (even if we weren't fully sure about how they would be incorporated into the final game yet). To follow through on this, myself and a couple other leads met and hashed out the details, coming up with a sizeable list of tasks that you can read <a href="https://studio.eecs.umich.edu/confluence/display/PB/Concept+Tasks" target="_blank">here</a>.</td>
        </tr>
        <tr>
            <td>10/24</td>
            <td>1 hr. 10 min.</td>
            <td>Studio meeting. I arrived half an hour late because buses were avoiding the CCTC to make way for a marathon. I was asked to choose between taking on the design of the game's first flying enemy or its first hitscan enemy. I chose the hitscan enemy, since I've been pretty invested in the addition of hitscan attacks and I want to make sure that they're incorporated smoothly without breaking the combat system.</td>
        </tr>
        <tr>
            <td>10/29</td>
            <td>1 hr.</td>
            <td>Met briefly with the rest of design (minus our level designer, which was particularly unfortunate) to discuss level design. We decided on a list of constraints for our first level re-design (i.e. which weapons, enemies, and level features to use). We also talked about the workflow that we want to introduce for level design, which is composed of a step for rough sketches, a blockout step, and a playtesting step. You can read our constraints and process outline for the first level <a href="https://studio.eecs.umich.edu/confluence/display/PB/Level+Blockout" target="_blank">here</a>.</td>
        </tr>
        <tr>
            <td><b>Total:</b></td>
            <td colspan="2"><b>18 hr. 5 min.</b></td>
        </tr>
    </tbody>
</table>