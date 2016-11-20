import turtle

alex = turtle.Turtle()
wn = turtle.Screen()


for i in range(360):
    alex.forward(1)
    alex.left(1)

wn.exitonclick()
