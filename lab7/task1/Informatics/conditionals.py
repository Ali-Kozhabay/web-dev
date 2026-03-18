#A
a = int(input())
b = int(input())
if a > b:
    print(a)
else:
    print(b)

#B
n = int(input())
if n%4==0 and n%100!=0 or n%400==0:
    print("YES")
else:
    print("NO")

#C
a = int(input())
b = int(input())

if (a == 1 and b == 1) or (a != 1 and b != 1):
    print("YES")
else:
    print("NO")

#D
x = int(input())

if x > 0:
    print(1)
elif x < 0:
    print(-1)
else:
    print(0)

#E
a = int(input())
b = int(input())
if a > b:
    print(1)
else if b > a:
    print(2)
else:
    print(0)