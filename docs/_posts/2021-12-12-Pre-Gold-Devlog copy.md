---
layout: post
title: Pre-Gold&colon; Panic! At The Deadlines
---

## My Tasks

1. My first priority was to finish the Spreadshot that I had started in the previous sprint.
2. My next priority was to assign myself bugs from the list of known bugs and fix them.

Unfortunately, due to a series of large assignments and the looming threat of finals, I was unable to participate in WolverineSoft as much as I would have liked to this sprint.

## Explicit Hours Breakdown

<table style="width:100% !important;">
    <tbody>
        <tr>
            <th width="1%">Date</th>
            <th width="1%">Time</th>
            <th>Progress</th>
        </tr>
        <tr>
            <td>11/29</td>
            <td>5.5 hr.</td>
            <td>Finished the Spreadshot:
            <ul>
                <li>Unity editor kept crashing when I entered play mode, stopped doing that when I commented out Spreadshot bracket coroutines.</li>
                <li>Looked into the <code>ParticleSystem.SetParticles()</code> function for a bit in case I wanted to set per-particle attributes such as size.</li>
                <li>Looked into custom particle data for a while, added the proper code to <code>AttackEvents.EmitCharged()</code> and <code>AttackEvents.DealAttackDamage()</code>, then realized that there was no way to get the actual particle from Unity's <code>OnParticleCollision()</code> event function (which we use to get bullet collisions for dealing damage), so using custom data wouldn't work.</li>
                <li>Decided to cheat and simply emit multiple overlapping particles.</li>
                <li>Spent a while messing around with the Unity Animator, eventually got the brackets to move.</li>
                <li>They teleport back to their original position when the weapon fires but it doesn't look that bad.</li>
                <li>Did some baseline tuning of the crosshair animation and the Spreadshot's charging parameters.</li>
                <li>Ran a bunch of tests to make sure the Spreadshot was working.</li>
                <li>Added the Spreadshot to the Player prefab, created ammo and weapon pickup prefabs</li>
            </ul>
            </td>
        </tr>
        <tr>
            <td>12/01</td>
            <td>1 hr.</td>
            <td>Attended playtest. The playtester focused a lot on audio issues, but I thought his insights were interesting regardless. The biggest issue that I noticed was that the Triple-Shot was overpowered, which was resolved when the Triple-Shot was replaced with the Spreadshot.</td>
        </tr>
        <tr>
            <td>12/05</td>
            <td>1.5 hr.</td>
            <td>Studio-wide meeting. One of the studio members fully played through both of the studios' games, and it was really cool to see everything that had been added since the previous week's playthrough. The game was really transforming, and it looked like a lot of fun to play. The programming team talked about the remaining bugs that needed fixing, and once that was over, I joined the art team in choosing the concept for the flying enemy's sprite.</td>
        </tr>
        <tr>
            <td>12/10</td>
            <td>4 hr.</td>
            <td>EECS 494 Showcase! Watched playthroughs of the finalized WolverineSoft games, plus a bunch of the games developed by EECS 494 students. Even though the final game had a lot of bugs, it was still really fun to see all of the features that we had been implementing over the course of the semester come together.</td>
        </tr>
        <tr>
            <td colspan="2"><b>Total time:</b></td><td><b>12 hr.</b></td>
        </tr>
    </tbody>
</table>