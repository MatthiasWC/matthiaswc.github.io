---
layout: post
title: Pre-Beta I&colon; The DoT Stacking Paradox
---

## My Tasks

#### Programming

1. Make weapons easily toggleable between projectile and hitscan modes.
2. Implement damage over time (DoT). DoT is an effect that deals a small amount of damage to some target at regular intervals for a duration of time. We plan to implement this in the form of environmental hazards that can poison the player (and possibly elsewhere).
3. Add our existing enemy slowing effect to weapon projectiles so that shooting enemies with those weapons causes them to slow down.

#### Design

1. Design the game's first hitscan enemy.

## Explicit Hours Breakdown

<table style="width:100% !important;">
    <tbody>
        <tr>
            <th width="1%">Date</th>
            <th width="1%">Time</th>
            <th>Progress</th>
        </tr>
        <tr>
            <td rowspan="3">11/05</td>
            <td>4.5 hr.</td>
            <td>Now that we were implementing hitscan attacks, we needed an enemy that could take advantage of the new system. We wanted the first hitscan enemy to be a generic, general-purpose enemy that functions as a regular 'soldier,' similar to our existing flower enemy and our planned projectile enemy.<br/>
            <br/>
            I had chosen to take on this task because it's easy to design a hitscan enemy that feels unfair (nobody likes being cross-map sniped by a computer program with perfect aim), and I wanted to make sure that we avoided that. During my research into the generic hitscan enemies in our reference games, I noticed that they tended to be pretty weak in comparison to the other enemies, having some of the lowest health and damage output. After looking at fan wiki pages, gameplay footage, and forums for a while, I had an idea of what I wanted to do with it.<br/>
            <br/>
            One of the biggest issues with hitscan enemies is that they can deal instantaneous damage to the player from a distance before the player has a chance to notice them or react. In order to counter this, the hitscan enemy will have short range, low accuracy, and extremely low damage per bullet. To give the player a chance to react, they will shoot fairly long low-accuracy bursts and adjust their aim slowly. This will allow the player to escape the line of fire after getting hit a single time, and ensures that they typically won't take the full damage of a given burst.<br/>
            <br/>
            The vast majority of existing enemies within the game have very simple movement behavior that consists of simply running toward the player, which gets stale very quickly. To make this enemy more interesting, I decided that it should run to a position within a certain radius of the player, pause for a moment, open fire, and repeat. Not only does this make its movement more interesting, but it ensures that all shots from a given burst would come from a single point near the player, which allows them to make a decision about where they want to go to take cover or escape. I also gave the enemy retreat behavior so that it would remain at a more optimal distance for ranged combat. The following diagram serves as a more formal definition for the enemy's behavior:<br/>
            <br/>
            <img style="width:100% !important;" src="/resources/devlog_3_hitscan_enemy_behavior.png" alt="Hitscan enemy behavior diagram"/><br/>
            You can see the above diagram in context in the hitscan enemy's design document <a href="https://studio.eecs.umich.edu/confluence/display/PB/Generic+Hitscan+Enemy" target="_blank">here</a>.
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td>1 hr.</td>
            <td>After finalizing the hitscan enemy design and meeting with the design and studio leads to make sure that it fit well with the planned addition of a ranged enemy, I moved on to my first programming task. I started by adding a firing mode parameter to the Weapon ScriptableObject, and had no idea where to go from there. It took me a while to read through the hitscan weapon code and figure out how I might go about making firing mode toggleable before realizing that it wasn't really possible with our current weapon system. I left the following comment on the Jira task:<br/>
            <br/>
            Currently, a given weapon fires by invoking an <code>OnCastEvent</code> from the AttackEvents script attached to the weapon's prefab. This <code>OnCastEvent</code> then calls whatever functions are listed under it in the Unity editor. Each weapon prefab calls a unique function to execute its firing behavior&mdash;the single shot calls <code>ParticleSystem.emit(1)</code>, the triple shot calls <code>ParticleSystem.emit(3)</code>, the hitscan weapon calls <code>HitscanEvents.Hitscan()</code>, etc. In order to add an option to toggle between projectile and hitscan firing modes on the Weapon ScriptableObject, we would have to do two things:<br/>
            <br/>
            1. <b>Make firing behavior programmatic.</b> Instead of creating the entire functionality for each weapon within the Unity editor, we would need each weapon to have a dedicated script controlling its behavior. We could then call the current weapon's <code>Shoot()</code> function rather than invoking its <code>OnCastEvent</code>.<br/>
            2. <b>Abstract firing behavior.</b> Unless we wanted to handle toggling between hitscan/projectile firing modes case-by-case within each weapon's dedicated script, we would need to have a generic <code>ShootSingleBullet()</code> function that takes in the given weapon as a parameter and either emits a single particle or executes a raycast, depending on the weapon's firing mode.<br/>
            <br/>
            To be clear, I think that both of these changes would be beneficial. The current system is very impractical when it comes to adding any kind of new functionality and makes figuring out the relationships between the various combat scripts and the in-game behavior that they are meant to control far more difficult than it needs to be. However, I don't feel comfortable overhauling the entire weapon system in order to add a single toggle option.</td>
        </tr>
        <tr>
            <td>11/07</td>
            <td>2 hr.</td>
            <td>Studio-wide meeting. I brought up my weapon toggling conundrum during the programming meeting, and we agreed that it would be nice to have a better-organized weapon system, but that the time commitment and potential bugs made it infeasible. We also decided that the use case for a firing mode toggle option was slim enough that it wasn't a huge sacrifice to scrap the idea&mdash;if we didn't already know whether a weapon was going to be hitscan or projectile before implementing it, then something had to have gone seriously wrong during the design process.<br/>
            <br/>
            Design team also met briefly to talk about enemies and level design. The studio lead presented some of the levels that he had been working on, and we provided feedback. Overall, it looks like things are heading in a positive direction.</td>
        </tr>
        <tr>
            <td>11/12</td>
            <td>7 hr.</td>
            <td>Began my damage over time (DoT) task. I started by looking through the existing timed effect and buff scripts, since it seemed like those would be useful. As tends to be the case with this codebase, I eventually realized that most of these scripts were unused legacy code, and the other ones didn't apply to DoT. My implementation would have to be entirely original, which was a bit of a relief. I would much rather write my own code from scratch than work with the existing codebase.<br/>
            <br/>
            In order to make the DoT system easily understandable and implementable by programmers and designers, I decided to mimic the implementation of regular attack damage. Attack damage is applied to a target GameObject from the <code>OnCollision</code> event that occurs when projectiles make contact with the target by calling <code>DealAttackDamage()</code> in AttackEvents.cs, which then calls <code>DealDamage()</code> in Damage.cs, which then calls the target GameObject's Health.cs component's <code>ApplyDamage()</code> function. The amount of damage dealt is determined by a parameter in the Weapon instance associated with the projectile. I started by thinking about the parameters required for DoT and adding them to the Weapon ScriptableObject:<br/>
            <pre style="width:100% !important;"><code>[Tooltip("Number of damage events that occur after DoT is applied.")]
public int dotEventCount = 0;
[Tooltip("Amount of time (in seconds) that transpires between DoT events.")]
public float dotEventWaitTime = 1.0f;
[Tooltip("Amount of damage dealt per DoT event.")]
public int dotEventDamage = 1;</code></pre>
            I then added <code>DealDamageOverTime()</code> functions to AttackEvents.cs and Damage.cs and a <code>ApplyDamageOverTime()</code> function to Health.cs. Similarly to the <code>DealAttackDamage()</code> and <code>DealDamage()</code> functions, the <code>DealDamageOverTime()</code> functions did little more than call other functions&mdash;the meat of the implementation took place in Health.cs. My first rough prototype of <code>ApplyDamageOverTime</code> took in each of the DoT parameters enumerated above and called a coroutine to deal <code>dotEventDamage</code> points of damage every <code>dotEventWaitTime</code> seconds <code>dotEventCount</code> times. With the fundamental code written, I needed to make sure that it worked.<br/>
            <br/>
            I first tried creating a new test scene, throwing in some existing environmental features and enemies, and giving both the player and the enemies DoT-enabled weapons. For whatever reason, when I entered the game preview, both the enemies and the player character seemed unable to move, elements of the UI were broken, the player's weapon could only shoot once, etc. Fortunately, I was able to hit an enemy with my one shot, and I could see that the DoT was working properly on them. Unfortunately, the DoT was not working properly on the player. I wasn't sure if this was due to a bad implementation or a bad test scene, so I deleted that test scene, copied somebody else's test scene, and tried using that instead. Entering the game preview in this test scene presented the same issues to me. I entered a build scene to make sure that I hadn't broken the game entirely, and it seemed to work fine, so I deleted my 2nd test scene, copied the build scene, and modified it to my liking. This worked like a charm&mdash;no bugs appeared to be present, and the DoT effect worked on the player as well as the enemies.<br/>
            <br/>
            There was still a problem with my implementation, however: every time a target GameObject was hit with a DoT-enabled weapon, a new DoT coroutine started and stacked on top of any other DoT effects already active. This seemed non-ideal, but I wasn't sure what the ideal solution would be, so I decided to implement it so that designers could choose any method of stacking that they wanted. I separated DoT stacking into two categories: self-stacking and other-stacking. Self-stacking is when multiple of the same effect can stack on top of each other (e.g. two of the same poison effects are active at once), and other-stacking is when multiple different effects stack on top of each other (e.g. a poison effect and a fire effect are both active at once). In order to allow for maximum design potential, I created options for each combination of these two boolean values.<br/>
            <br/>
            This turned out to be more complicated than I thought. To keep track of the active effects, I had to create a <code>&lt;string, int&gt;</code> hash map to map effect names to their remaining durations. I then had to modify my coroutine to determine how many more DoT events remained for a given DoT effect based on their duration in the hash map, instead of passing in a static duration as a parameter. A given effect's duration in the hash map would be updated whenever <code>ApplyDamageOverTime()</code> was called, which would either keep any active coroutines for that effect going or create a new coroutine for the effect. Whether or not an effect remained in the hash map when a new one was added depended on the stacking type of both effects, and I had to write a long, ugly if statement to handle each stacking type separately.<br/>
            <br/>
            I eventually realized that the different stacking modes brought up questions of priority that I didn't have good answers to. For example, what happens if an effect that doesn't other-stack is already active when an effect that does other-stack gets applied? Does the non-stacking effect disappear to make way for the stacking effect? Does the stacking effect simply not apply? Does the stacking effect stack on top of the non-stacking effect?<br/>
            <br/>
            My conclusion was that we would likely only ever want one of the four stacking modes: other-stacking with no self-stacking. This essentially means that the player could be both poisoned and on fire at the same time, but they cannot be doubly poisoned or doubly on fire. With this simple implemenation in mind, I deleted the existing code in the <code>ApplyDamageOverTime()</code> function and was able to replace it with the new implementation relatively quickly. To give you an idea of how painful this was to do, I screenshotted the function before and after making this change. You don't have to read the code; the difference in length should be enough to convey my suffering!<br/>
            <br/>
            <div style="width:48% !important; display:inline-block !important; margin:0 !important;"><code>ApplyDamageOverTime()</code> before being rewritten:<br/><img style="width:100% !important;" src="/resources/devlog_3_dot_stacking_code_before_deletion.png" alt="ApplyDamageOverTime() before being rewritten"/></div>
            <div style="width:48% !important; display:inline-block !important; margin:0 !important;"><code>ApplyDamageOverTime()</code> after being rewritten:<br/><img style="width:100% !important;" src="/resources/devlog_3_dot_code_final.png" alt="ApplyDamageOverTime() after being rewritten"/></div><br/>
            After creating another test weapon to test other-stacking and fixing a couple minor bugs, everything seemed to work as intended. I recorded a brief test for your viewing pleasure:<br/>
            <br/>
            <video style="width:100% !important;" controls><source src="/resources/devlog_3_damage_over_time_demonstration.mp4" type="video/mp4"></video>
            </td>
        </tr>
        <tr>
            <td>11/13</td>
            <td>1 hr.</td>
            <td>Studio-wide meeting. Discussed programming progress and remaining programming tasks, desired game elements that hadn't been designed yet, and art tasks for the next sprint. I talked briefly with the art team about the behavior of the flying enemy, since we plan on porting its behavior from the Phoenix enemy in Caduceus (one of our previous games), and I had been the one who designed that enemy.</td>
        </tr>
        <tr>
            <td colspan="2"><b>Total time:</b></td><td><b>15.5 hr.</b></td>
        </tr>
    </tbody>
</table>