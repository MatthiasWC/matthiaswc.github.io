---
layout: post
title: Pre-Beta II&colon; More Like Spread-Not
---

## My Tasks

This sprint was somewhat reduced due to Thanksgiving break, so I only had one task, which was to implement the Tri-Shot weapon that I had designed. The task that I hadn't completed in the last sprint ended up getting cancelled because the leads decided that they didn't actually want that mechanic in the game, so I guess I'm glad that I hadn't started it.

## Explicit Hours Breakdown

<table style="width:100% !important;">
    <tbody>
        <tr>
            <th width="1%">Date</th>
            <th width="1%">Time</th>
            <th>Progress</th>
        </tr>
        <tr>
            <td>11/21</td>
            <td>1 hr.</td>
            <td>First studio-wide meeting. Nothing of note really happened, especially since I had hardly been able to start my tasks for the week.</td>
        </tr>
        <tr>
            <td>11/27</td>
            <td>11.5 hr.</td>
            <td>
            Began implementing the Tri-Shot weapon. The first step was deciding what parameters the Tri-Shot would require, which was sort of a design task on its own. If you recall from my previous devlog in which I designed the Tri-Shot, it is meant to shoot 3 projectiles in a constant spread pattern by default; however, if the player holds the left mouse button for a certain amount of time before releasing, the weapon 'charges' by narrowing the projectile spread and potentially boosting the weapon's base stats (projectile speed and damage). My first thought when setting out to implement the weapon was to simply start with a wide spread and progressively tighten that spread as the weapon charges; that way, the projectiles consolidate into one extra-powerful projectile naturally without having to write any additional code to change its stats. The issue with this implementation is that all the projectiles originate from a single point directly in front of the player, so if the player were close enough to an enemy, all shots would make contact. If this were the case, the player could achieve maximum damage output without having to charge, which would render the charging mechanic useless and the weapon overpowered. Thus, I had to increase the weapon's damage output as it charged. This led me to add the following parameters to the <code>Weapon</code> class:
            <pre><code>[Header("Weapon Charging")]
[Tooltip("Whether or not the weapon uses charging.")]
public bool usesCharging = false;
[Tooltip("Damage multiplier vs. charge time.")]
public AnimationCurve chargeDamageMult;
[Tooltip("Projectile speed multiplier vs. charge time.")]
public AnimationCurve chargeSpeedMult;
[Tooltip("Projectile spread vs. charge time.")]
public AnimationCurve chargeSpread;
[Tooltip("Number of projectiles vs. charge time.")]
public AnimationCurve chargeShotNum;
[Tooltip("Projectile size multiplier vs. charge time.")]
public AnimationCurve chargeSizeMult;</code></pre>
            You might be wondering what the purpose of <code>chargeShotNum</code> and <code>chargeSizeMult</code> is. That's another throwback to an old devlog&mdash;back when I tried implementing damage falloff, I discovered the rather inconvenient fact that our health and damage systems are entirely integer-valued, meaning that it's impossible to apply a continuous damage multiplier to a projectile. Thus, if the number of projectiles were to remain constant as the weapon charged, the damage output of the weapon would have to increase in increments of the number of projectiles, which is far too high of an increase (for example, if we were to begin with 3 projectiles, then we would have to increase the damage output in increments of 3 points, which would put it at a damage output equivalent to that of the Ultra-Shot after the first increase). My solution was to consolidate the projectiles into fewer, larger (hence the <code>chargeSizeMult</code> parameter), more powerful projectiles as the weapon charged. This also had the advantage of allowing us to play with the base number of projectiles, leading me to re-name the weapon as the Spreadshot. The <code>AnimationCurve</code> data types would allow designers to define step functions for <code>chargeDamageMult</code> and <code>chargeShotNum</code>, while keeping continuous methods for the rest of the parameters.<br/>
            <br/>
            I then set out, once again, to figure out our weapon system. This was my first time using the player input system, and some comments on the <code>OnFire()</code> method which indicated that it was only called upon release of the fire button put me on a wild goose chase for a while as I tried to figure out how the existing weapons could fire before releasing said button. I eventually realized that these comments were simply incorrect. The <code>WeaponController</code> class had undergone some major refactoring since I had last seen it, so it took me a moment to find my bearings again. I don't know why I expected anything better, but instead of using a base class with specialized subclasses to handle the different overheating, reloading, and firing mechanics for each of our weapons, we just have a single <code>WeaponController</code> chalk-full of if-statements to check for the current weapon's properties and behave accordingly. I pondered creating my own class or series of classes to handle the Spreadshot's charging mechanic, but decided that it would be impossible for me to do so effectively without re-writing the <code>WeaponController</code> class.<br/>
            <br/>
            In order to weave weapon charging into the tangle of if-statements in the <code>WeaponController</code> class, I had to add two variables to the nested <code>WeaponData</code> class to track the weapon's charge state and time, then throw a couple additional if statements into the primary loop that handles weapon firing to ensure that the Spreadshot fired on button press rather than button release. I wrote a new coroutine to increment the weapon's charge timer, but realized that I wouldn't be use the charge timer in the existing framework because the <code>ParticleSystem.Emit()</code> method that executed weapon firing was called from a <code>UnityEvent</code> that didn't accept any parameters; thus, I had to create a new float-valued <code>UnityEvent</code> that would be invoked if the current weapon used charging and an accompanying <code>AttackEvents.EmitCharged()</code> method that would change the weapon stats before firing based on the <code>chargeTime</code> parameter.<br/>
            <br/>
            Eager to see the Spreadshot in action, I created a quick test scene and tried my new weapon out. As was to be expected, its failure was almost comedic:<br/>
            <br/>
            <video style="width:100% !important;" controls><source src="/resources/devlog_4_failed_charge_test.mp4" type="video/mp4"></video><br/>
            <br/>
            It took me a while to figure out the source of this bizarre bug, but after much searching I discovered that it was due to known issues with the <code>ParticleSystem.MainModule.startSpeedMultiplier</code> and <code>ParticleSystem.MainModule.startSizeMultiplier</code> attributes. I therefore had to apply multipliers manually to the <code>ParticleSystem.MainModule.startSpeed</code> and <code>ParticleSystem.MainModule.startSize</code> attributes, which added the additional complication of overwriting their original values, which applied those multipliers to all future particles and caused them to compound. The only place that we set the start size of the particles was in the <code>ParticleSystem</code> inspector interface, which wrote to the same <code>ParticleSystem.main</code> attribute that was being overwritten, so in order to change a given particle's <code>startSize</code> without having to store its default <code>startSize</code> in the <code>Weapon</code> class I modified the <code>EmitParams.startSize</code> parameter that could be optionally passed into the <code>ParticleSystem.Emit()</code> method. The <code>EmitParams</code> type doesn't contain an analagous attribute for <code>startSpeed</code>, but since we store the projectile's <code>startSpeed</code> in the <code>Weapon</code> class, I simply set <code>main.startSpeed = spellWeapon.speed * spellWeapon.chargeSpeedMult.Evaluate(chargeTime)</code>. After re-testing and tweaking the <code>ParticleSystem.shape</code> parameter to account for variable spread, this seemed to work:<br/>
            <br/>
            <video style="width:100% !important;" controls><source src="/resources/devlog_4_successful_charge_test.mp4" type="video/mp4"></video><br/>
            <br/>
            But I wasn't done yet. There had to be some sort of visual indicator of how much the weapon had charged. My plan had been to make the outer crosshair brackets shrink inward to indicate that the spread was tightening (and ideally add some sort of shake animation to the staff that intensified as the charge increased, but that would come later), so I went about creating a new crosshair animation to accomplish just that. I quickly realized that I have very little understanding of how the Unity <code>Animator</code> system works&mdash;my only experience with it had been replicating the original reticle fire animation back when I was implementing scriptable crosshairs, and that only involved scaling the images in-place. The issue was that, as far as I was aware, Unity animations could only set absolute position, which meant that each animation had to have an unchanging starting and stopping position. This meant that I couldn't smoothly move the brackets from any point on the screen back to their starting position.<br/>
            <br/>
            Now, is it actually impossible to change relative position with Unity animations? Definitely not. In fact, based on my research, it looks like all you have to do is enable Root Motion on the <code>Animator</code> component and then tweak a few options; however, every tutorial I've seen on this seems to access these options through a menu that I <u><i>could not access for the life of me</i></u>. I tried for an embarrassing amount of time to get this working, and eventually gave up because the menu simply was not appearing for me (it didn't appear to be a version issue; several of the tutorials were on similar versions before or after mine). I then wrote a couple coroutines to move the brackets manually from the <code>CrosshairUIManager</code> class, but was unable to modify their transform positions during runtime for some reason.<br/>
            <br/>
            Looking for a change of pace, I decided to re-work the charge parameters in the <code>Weapon</code> class a little. After messing with the <code>AnimationCurve</code> parameters quite a bit during testing, I had realized that they were somewhat annoying to work with. If ever I wanted to change the timing of an increase in damage or decrease in number of shots (I'll be referring to these increases/decreases as 'charge events'), I had to go through and change every curve so that they aligned properly, which was made especially tedious by Unity's sub-par <code>AnimationCurve</code> editor. My solution was to create a list of structs that represented each of the charge events:
            <pre><code>[System.Serializable]
public struct chargeEvent
{
    [Tooltip("Amount of time that elapses before this event occurs.")]
    public float waitTime;
    [Tooltip("Damage multiplier.")]
    public int damageMult;
    [Tooltip("Projectile size multiplier.")]
    public float sizeMult;
    [Tooltip("Number of projectiles.")]
    public int numProjectiles;
}
[Tooltip("List of charge events. Each event applies stats to the weapon.")]
public chargeEvent[] chargeEvents;</code></pre>
            That way, all the discrete changes that occurred during a given charge event could be easily entered as values in a list, rather than having to edit the vertices of a bunch of step functions individually. I then had to change the existing charging code to accept an additional <code>chargeState</code> integer parameter, which served as an index into the <code>chargeEvent</code> list.<br/>
            <br/>
            Aside from the static crosshairs, the <code>AttackEvents.EmitCharged()</code> method was still missing one vital functionality: changing particle damage based on charge time. I had been putting this feature off because, frankly, I wasn't sure how to do it. I didn't want to modify the Spreadshot's damage attribute, since that would mean that a fully-charged shot would be reduced to base damage if an un-charged shot was fired while the former was still in the air. This almost certainly wouldn't ever happen, since the lifetime of the Spreadshot's particles is shorter than the Spreadshot's reload time, but if somebody were to implement a potion that gave the player instantaneous reload time or change the Spreadshot's stats this workaround would fail. Thus, I needed to track the unique damage value of each individual particle. It seems to be possible to do this using the <code>ParticleSystem.SetCustomParticleData()</code> and <code>ParticleSystem.GetCustomParticleData()</code> methods, but I ran out of time before I could get a chance to try it out.
            </td>
        </tr>
        <tr></tr>
        <tr>
            <td>11/28</td>
            <td>45 min.</td>
            <td>Second studio-wide meeting. Since we were virtual, the leads ran through quick playtests of each studio's game instead of grouping us off into pair-playtesting pods. The progress we've made on Bloom is starting to become very noticeable! Let's see how much we can cram into these last two weeks.</td>
        </tr>
        <tr>
            <td colspan="2"><b>Total time:</b></td><td><b>13 hr. 15 min.</b></td>
        </tr>
    </tbody>
</table>