---
layout: post
title: Pre-Alpha I&colon; The Desecration of my Sleep Schedule
---

## The Tasks

#### Programming

I had three programming tasks this sprint.

1. **Damage and Range Tools:** The idea of this task was to create tools that designers could easily manipulate within the Unity editor to edit the range and damage falloff for a given weapon. At least, that was supposed to be the idea. More on that later.
2. **Scriptable Crosshairs:** This was another task meant to make life easier for our non-programmers. Currently, Bloom only has one crosshair sprite/animation that is used for every weapon; however, as design improves upon the existing weapons, there becomes a need to add unique crosshairs for each different weapon. My task was to implement the functionality of switching between crosshairs and create a simple interface that artists could use to easily switch out the crosshair sprites and animations for a given weapon.
3. **Code Commenting - VFX/Visuals:** This task was left over from the previous (informal) sprint. I was supposed to go through all the code in the VFX and Visuals folders and write comments/tooltips explaining everything thoroughly so that programmers wouldn't have to spend too much time figuring it all out several times over in the future; however, I found that most of the code was pretty well-commented already. For any code that wasn't commented so well, it tended to be unclear as to how it was actually used within Unity, and there's a good chance that a lot of it isn't used at all, as this codebase contains a lot of legacy code that is completely unused. Due to this uncertainty, I decided not to mark the task as completed until I had a better understanding of all of the scripts and their relationships.

#### Design

Mercifully, I was only assigned one design task.

1. **Tri-Shot Redesign:** I was to re-work the existing Tri-Shot weapon (it is what it sounds like) to better fit the new direction of the game. That's really all there is to it.

## The Progress

#### Day 1: A Glimpse Into Madness

<u>10/09/2021 8:25 PM - 10/10/2021 1:00 AM</u>

*8:25 PM - 9:00 PM*

My first thought was that I needed to finish the *Code Commenting* task from the previous week. The entirety of the VFX folder is already exquisitely commented, so I started by taking a look through the Visuals folder. Most of these files have a brief description at the top and maybe some sparse comments/tooltips throughout. I read through all of these scripts, but eventually realized that the existing comments explain enough that I wouldn't really be helping anybody by adding more. There were two scripts without any comments, but I wasn't sure if these were actually used anywhere in Unity. I looked around for a while to try to find references, but I was unsuccessful. I ultimately decided to move on to the next task, since I wasn't sure whether to add comments or delete the scripts altogether.

*9:00 PM - 1:00 AM*

Began my *Damage and Range Tools* task. It took me a while to read through and gain a working understanding of the weapons codebase, but after a good amount of searching (in my soul as well as the code), I found that every attack in the game&mdash;icluding both player spells and enemy attacks&mdash;is represented as an instance of the Weapon class, which is a ScriptableObject that contains all the basic data for each weapon (damage, ammo icon, etc.). This seemed like the perfect place to add parameters for damage falloff and range, so I started by adding an AnimationCurve parameter to represent falloff and a float to represent range. I chose an AnimationCurve so that designers could easily implement a nonlinear falloff, in case they wanted damage to be relatively constant for a few seconds and then rapidly decrease or something.

![damage-falloff-curve](/resources/devlog_1_damage_falloff_curve.png "Damage falloff curve")

I then multiplied attack damage by the value of the damage falloff curve at the amount of time since the attack was cast. This meant that the damage falloff curve represented the percentage of the given weapon's damage parameter that would be applied to an enemy at any point past its firing.

Unfortunately, this came with its own set of issues. I quickly discovered that health and damage were represented internally as integers, so in order to properly implement damage falloff, I would have to change this internal representation to floats. I deliberated over this point for a while, pondering the risks of changing something so deeply ingrained into the codebase, but eventually decided to go ahead and make the changes because my task was to implement falloff and there really wasn't much way to do so otherwise. After chasing a trail of syntax errors, I finally ended up with some code that seemed to work, and I called it a night. (I didn't get around to implementing a visual indication of the damage falloff, so I don't have any visuals for this one.)

#### Day 2: A Shocking Truth

<u>10/10/2021 11:00 AM - 1:00 PM</u>

*11:00 AM - 11:30 AM*

WolverineSoft Studio general meeting, some pair playtesting. I got to play the other studio's game, and I got to see some feedback from a first-time Bloom player (although they had to play it with a trackpad, which doesn't really work for a first-person shooter).

*11:30 AM - 1:00 PM*

Had a very lengthy conversation with the programming and design teams about the internal representation of health. On the one hand, floats would allow us the freedom to deal contininously varying damage based on time since cast, distance, etc. On the other hand, health is already internally represented as integers, and changing it this late into the game could cause a lot of things to break in unexpected places. Ultimately, we decided to stick with an integer representation of health.

Now, my highly-invested reader, you must be wondering: what does this mean for the damage falloff system that you so lovingly constructed? Well, after another long conversation with design, we decided that damage falloff isn't really something we want to pursue anyway. I have to say, even though I'm upset that my work went to waste, I have to agree. The only real purpose of damage falloff is to incentivize risky close-quarters combat, but the vast majority of our weapons shoot projectiles, which means that long-range combat is hardly feasible anyway. I think that if somebody has the skill to make a long-distance shot with a (relatively) slow-moving projectile, we shouldn't be punishing them for it. I only wish that this had been discussed *before* the task had been assigned to me.

#### Day 3: A Glimmer of Hope

<u>10/15/2021 4:10 PM - 7:15 PM</u>

*4:10 PM - 4:25 PM*

After a riveting week of midterms, I slunk back into my little cave and returned to the work I had been neglecting. The first thing I had to do was revert my changes to the health system, so I spent a little while trying to figure out the right Git command to pull a specified file from development, then realized that my version of Git doesn't support that command, then considered upgrading Git to correct this and realized that I had fallen down a rabbit hole and needed to climb out (an essential ADHD survival skill). I reverted the code manually, which ended up being something like 11 line changes, all in all.

*4:25 PM - 7:15 PM*

Spent an embarrassingly long amount of time poring over the weapons codebase, trying to understand every script and connection, only to realize that several of the scripts I was looking at were legacy code that never ended up being used in the final project, but for some reason were never deleted.

It turns out that the spells cast by players aren't controlled by scripts at all, but instead a particle system that simply emits a spell particle when the OnCastEvent is invoked. Once I figured that out, I was able to implement the range functionality without too much difficulty. All I had to do was get the ParticleSystem component of the player weapon's parent GameObject and set its startLifetime attribute to the particle's range / its speed. This was not without its hang-ups, however; the startLifetime attribute of the ParticleSystem object is deprecated and didn't really work upon playtesting, so I had to use the ParticleSystem's MainModule's startLifetime attribute, which is get-only. Fortunately, the StackOverflow gods took mercy on my soul and gave me a bizarre workaround that I don't quite fully understand: I had to create an implicitly-typed variable, set it equal to the ParticleSystem's MainModule, then set that variable's startLifetime. I guess that this way creates a reference to the MainModule rather than a copy of it, but I'm not exactly sure why. I'll chalk it up to C# wizardry.

![error-message](/resources/devlog_1_error_message.png "Error message")

It also wasn't working for a while because I had been using GetComponent instead of GetComponentInChildren, which I'm not proud to say took me more than a few minutes to figure out. Anyway, this is what it ended up looking like:

{% highlight c# %}
particles = this.GetComponentInChildren<ParticleSystem>();
// Set the lifespan of the particle according to the spellWeapon's range
var psmain = particles.main;
psmain.startLifetime = spellWeapon.range / psmain.startSpeed.constant;
{% endhighlight %}

![range-demonstration](/resources/devlog_1_range_demonstration.gif "Demonstration of limited range")
<div style="font-size:85%;margin-top:-10px;"><i>A demonstration of limited range on the default weapon. Notice that shots explode when hitting the nearby trees but disappear before they can make contact with the farther trees.</i></div>

#### Day 4: Into Darkness

<u>10/16/2021 7:55 PM - 10/17/2021 5:35 AM</u>

*7:55 PM - 1:10 AM*

Now came time to start my *Scriptable Crosshairs* task. The task, as explicitly written, instructed me to create a new ScriptableObject that would allow artists to easily add their own crosshair sprites to each weapon. I spent a while thinking about the best way to go about this, and ultimately decided that it would make more sense to simply add a crosshair icon Sprite to the existing Weapon ScriptableObject. I then found the code that handled weapon switching and mirrored the code that changed the ammo icon. Naively, I thought that I was nearly done (and in record time, too!).

Upon creating a new crosshair sprite to test my new code, I immediately noticed that the existing crosshair was much more complicated than I had thought. It was made up of not one Sprite, but three, all joined together by a parent Animator. Since crosshairs could be made up of three Sprites, they could be made up of any number of Sprites. I thought about a few different ways of handling this, and eventually settled on replacing the Sprite attribute I had added to the Weapon ScriptableObject with an Animator attribute. Since the Sprites that composed the crosshair were all children of the Animator object, I would switch crosshairs by iterating through the Animator's children and disabling the SpriteRenderer for each one, then replacing the Animator with the new Animator and enabling the SpriteRenderers of its children. It took a while to arrive at this solution, but getting it coded out was relatively quick. I then spent a short while creating a test crosshair with three different Sprites (similar to the existing crosshair) and then replicating the existing crosshair Animator with the new sprites. 

I then discovered that GameObjects in the Scene Hierarchy can't be inserted into ScriptableObjects. This meant that I couldn't input the existing Animators into the Weapon ScriptableObject. That wasn't the end of the world, however; all I had to do was create Prefabs out of the Animators and then input those into the Weapon ScriptableObjects, which took all of ten seconds. Finally, it was time to test my code.

The crosshair disappeared.

I have no idea why. I commented out all of the additions that I had made to the existing code just to get the old crosshair to appear, and it still refused to show up in the Game view, the Scene view, or the game preview itself. After commenting out all of my changes, the only thing that had actually changed about the crosshair Animator is that I had made it into a Prefab. *The code and the Animator itself were both completely unchanged, yet the original crosshair stopped working entirely.* It was at this point that I chose to move on to my design task.

*1:10 AM - 5:30 AM*

My final task of the night (morning?) was to re-design the Tri-Shot weapon. Since Bloom is a case study, it's supposed to be heavily inspired by retro FPS games, so instead of trying to come up with a totally new game from scratch, my job as a designer is to decide what aspects of those retro FPS games would serve us best. This meant that most of my design work entailed watching gameplay footage and reading about various weapon stats from titles such as *Heretic*, *Hexen*, *Ziggurat*, and *Apocryph*. Although it's not very exciting, I eventually landed on a pretty standard design that doesn't stray too far from our original conception of the weapon. As one of the core weapons of the game, I think it's best to have an immediately intuitive weapon that performs a basic function in an obvious way. That way, it's easier to tune the weapon's parameters and to build additional systems around it, without worrying about mechanical complications.

The following table offers an overview of the re-designed Tri-Shot weapon, although I discuss my decisions in further depth on the design document.

![tri-shot-redesign](/resources/devlog_1_trishot_redesign.png "Tri-Shot redesign")

<u>10/16/2021 11:00 AM - 12:30 PM</u>

WolverineSoft Studio-wide meeting. The programming leads had to move my *Scriptable Crosshairs* assignment into the next sprint, since I wasn't able to finish. Aside from that, it was fairly un-eventful.

#### Total Hours

Adding all of these little adventures together, I committed a grand total of 19 hours and 20 minutes to WolverineSoft Studio this sprint.