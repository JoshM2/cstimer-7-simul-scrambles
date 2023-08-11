Note: this does not work with cstimer+.

This extention converts CSTimer scrambles into 7-Simul scrambles, like this: EC EL AH CB CL LE HG U -- GI GL KD IJ IL LG DE
Everything before the two dashes is the scramble, everything after the two dashes is the memo (in case you want to practice execution)
Technically this works with any pin set as long as you use the same one for scrambling and solving, but the draw scramble will only work if you use dl R DR \ UL L ur

To install this extension on chrome:
1) go to chrome://extensions/
2) turn on developer mode
3) click load unpacked
4) select the folder where you downloaded this

If you need any help with this let me know!


If you don't use A-L for 1-12 and want to change the notation:
Go to line 50 and edit the "const l" variable with what you use instead of each letter

If you never train excecution and want to get rid of the memo:
Delete line 63