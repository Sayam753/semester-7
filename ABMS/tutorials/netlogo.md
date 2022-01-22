first class
```None
# Turtles
create-turtles 2
ask turtle 1 [ setxy 10 10 ]
ask turtle 1 [ setxy random-xcor random-ycor ]
ask turtle 1 [ fd 1 ]
ask turtle 1 [ rt 1 ]
ask turtle 1 [show patch-here]
ask turtle 1 [ ask patch-here [ set pcolor green ] ]
ask turtles [ die ]
crt 10 [ setxy random-xcor random-ycor ]

# Patches
ask patch 8 0 [ set pcolor pink ]
```

second class -
- with button we write commands
- tick is one moment in netlogo
- turtles are updated sequentially, at random
- can be updated, at priority (ex - position of x and y)
```None
show count turtles
```

third class -
- input/output
- monitor to report (count cows)
- slider (create variables)